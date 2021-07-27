/*
  app.js -- This creates an Express webserver
*/

// import {PlayerWord} from './PlayerWord'
// import {Player} from './Player'


// First we load in all of the packages we need for the server...
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");
var debug = require("debug")("personalapp:server");




// tadasbe
const mongoose = require( 'mongoose' );
// mongoose.connect( 'mongodb://localhost/authDemo');

// this is for mongodb cloud 
// mongoose.connect( `mongodb+srv://${auth.atlasAuth.username}:${auth.atlasAuth.password}@cluster0-yjamu.mongodb.net/authdemo?retryWrites=true&w=majority`);
const mongoDB_URI = process.env.MONGODB_URI || 'mongodb://localhost/authDemo'
mongoose.connect(mongoDB_URI)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!!!")
});

// google authentication blah
const authRouter = require('./routes/authentication');
const isLoggedIn = authRouter.isLoggedIn;
const loggingRouter = require('./routes/logging');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// Now we create the server
const app = express();




// Here we specify that we will be using EJS as our view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Here we process the requests so they are easy to handle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Here we specify that static files will be in the public folder
app.use(express.static(path.join(__dirname, "public")));

// Here we enable session handling ..
app.use(
  session({
    secret: "zzbbya789fds89snana789sdfa",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

// This is an example of middleware
// where we look at a request and process it!
app.use(function(req, res, next) {
  //console.log("about to look for routes!!! "+new Date())
  console.log(`${req.method} ${req.url}`);
  //console.dir(req.headers)
  next();
});

app.use(authRouter)
app.use(loggingRouter);
// app.use('/', indexRouter);
app.use('/users', usersRouter);

console.log("I am running!")




import {WordGameApp} from './WordGameApp';
const gameApp = new WordGameApp();


// here we start handling routes
app.get("/", isLoggedIn, (req, res) => {
  res.locals.gameApp = gameApp
  if ( req.user.username == null || req.user.username == ''){
    res.locals.user = req.user
    res.render('newUserOnboard')
  } 
  res.render("roomSelection");
});








// Below is WAITING ROOM logic
// joining room
app.post("/selectRoom", isLoggedIn, (req, res) => {
  res.locals.gameApp = gameApp
  res.locals.roomid = req.body.roomnumber

  if (req.body.roomnumber >= gameApp.waitingRooms.length){
    res.render("roomSelection");
    return 
  }

  gameApp.joinWaitingRoom(req.body.roomnumber,req.user)
  // refreshPage(req.body.roomnumber)
  updateRoomList()
  updateRoomData(req.body.roomnumber)
  res.redirect("/waitingRoom")
});

app.get("/waitingRoom", isLoggedIn, (req, res) => {
  res.locals.gameApp = gameApp
  res.locals.roomid = gameApp.roomLookup(req.user._id)
  res.locals.googleid = req.user._id
  
  const playerRoom = gameApp.waitingRooms[gameApp.roomLookup(req.user._id)];
  if (playerRoom.isAvailable) {
    res.render("waitingRoom");
  } else {
    res.locals.currentUserId = req.user._id
    res.render("gameScreen");
  }
});


// This is coming from the waiting room
app.post("/submitWord", isLoggedIn, (req, res) => {

  // gameApp.submitWord(req.body.word,req.user._id)
  // res.locals.gameApp = gameApp
  // res.locals.roomid = gameApp.roomLookup(req.user._id)
  //
  // const submittingRoom = gameApp.waitingRooms[gameApp.roomLookup(req.user._id)];
  //
  // // if this is the final word put in, start game
  // // isAvailable is turned to false when the room decides it's ready, through whatever means
  // if (!submittingRoom.isAvailable){
  //   gameApp.createGameRoom(submittingRoom.roomID)
  //   refreshPage(submittingRoom.roomID)
  //   res.redirect('/waitingRoom')
  //   return
  // }
  // console.log(submittingRoom.roomID)
  // updateRoomData(submittingRoom.roomID)
  // res.redirect("/waitingRoom");
});


app.post("/startRoom", isLoggedIn, (req, res) => {

  res.locals.gameApp = gameApp
  res.locals.roomid = gameApp.roomLookup(req.user._id)

  // Start sequence from submitWord route
  const submittingRoom = gameApp.waitingRooms[gameApp.roomLookup(req.user._id)];
  submittingRoom.isAvailable = false
  gameApp.createGameRoom(submittingRoom.roomID)
  refreshPage(submittingRoom.roomID)
  updateRoomList()
  updateRoomData(submittingRoom.roomID)
  res.redirect('/waitingRoom')
});







// This is for GAME routes


app.post('/guessLetter',(req,res) => {
  res.locals.guess = req.body.guess 
  res.locals.targetGoogleId = req.body.targetGoogleId
  res.locals.gameApp = gameApp

  const gameRoomId = gameApp.guessLetter(req.user, req.body.targetGoogleId, req.body.guess);
  refreshPage(gameRoomId)

  res.redirect('/waitingRoom')
})






// this is .. everything else routes
app.post("/adminDeleteRoom", isLoggedIn, (req, res) => {
  if (process.env.ADMIN_PASSWORD == req.body.password){
    gameApp.resetRoom(req.body.roomnumber)
  }
  res.redirect("/");
});

app.get("/admin", isLoggedIn, (req, res) => {
  res.render("adminPanel");
});


// this just brings u to the page to submit the form
app.get("/createRoom", isLoggedIn, (req, res) => {
  res.render("createRoom");
});

// this is FROM the form
app.post("/createRoom", isLoggedIn, (req, res) => {

  var roomNo = gameApp.createWaitingRoom(req.body.minPlayers,req.body.maxPlayers)
  gameApp.joinWaitingRoom(roomNo.toString(),req.user)

  updateRoomList()

  res.redirect("/waitingRoom");

});

app.get("/joinGameMenuBar", isLoggedIn, (req, res) => {
  res.locals.gameApp = gameApp
  res.locals.user = req.user
  res.render("roomSelection");
});

app.get("/joinGame", isLoggedIn, (req, res) => {
  res.locals.gameApp = gameApp
  res.render("roomSelection");
});

app.get('/loginScreen', (req,res) => {
  res.render('loginScreen')
})

app.get("/help", isLoggedIn, (req, res) => {
  res.render("help");
});





app.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});


app.post('/editProfile',
    isLoggedIn,
    async (req,res,next) => {
      try {
        let username = req.body.username
        let bio = req.body.bio
        if (username !== ''){
          req.user.username = username
        }
        if (bio !== ''){
          req.user.bio = bio
        }
        await req.user.save()
        if (req.body.new == "true"){
          res.render('newUserOnboard')
        }
        res.redirect('/profile')
      } catch (error) {
        next(error)
      }
})







// Don't change anything below here ...

// here we catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// this processes any errors generated by the previous routes
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render("error");
});

//Here we set the port to use
const port = process.env.PORT || "5000";
app.set("port", port);

// and now we startup the server listening on that port
const http = require("http");
const server = http.createServer(app);








// socket io!! =====================================================================================================
const { Server } = require("socket.io");
const io = new Server(server);

const socketIdRoomMap: {[socketId: string]: number} = {}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete socketIdRoomMap[socket.id];
  });

  socket.on('roomid', (arg) => {
    socketIdRoomMap[socket.id] = arg
  });

  socket.on('askForRoomList', () => {
    socket.emit("roomList",gameApp)
    // socketIdRoomMap[socket.id] = null
  });

  socket.on('setCategory', (args) => {
    console.log(args)
    gameApp.setRoomCategory(args.category, parseInt(args.roomid))
    updateRoomData(args.roomid)
  });

  socket.on('wordSubmit', (args) => {
    gameApp.submitWord(args.word,args._id)

    const submittingRoom = gameApp.waitingRooms[gameApp.roomLookup(args._id)];

    // if this is the final word put in, start game
    // isAvailable is turned to false when the room decides it's ready, through whatever means
    if (!submittingRoom.isAvailable){
      gameApp.createGameRoom(submittingRoom.roomID)
      refreshPage(submittingRoom.roomID)
      // res.redirect('/waitingRoom')
      return
    }
    console.log(submittingRoom.roomID)
    updateRoomData(submittingRoom.roomID)
  });

  socket.on('askForRoomData', (roomid) => {

    let room = gameApp.waitingRooms[roomid]

    // let renderingData = {
    //   maxPlayers: room.maxPlayers,
    //   minPlayers: room.minPlayers,
    //   roomName: "4",
    //   players: {"googleid1":{
    //       word: "placeholder",
    //       displayName: "player1",
    //       isHost: true
    //     },
    //     "googleid2":{
    //       word: "word2",
    //       displayName: "player2",
    //       isHost: false
    //     }
    //   },
    //   firstPlayer: "googleid1",
    //   readyPlayers: ["googleid2"]
    // }

    socket.emit("roomData",room)
    // socketIdRoomMap[socket.id] = null
  });

});



// run on wordsubmit, refreshes
function refreshPage(room: number){
  for (let socketId in socketIdRoomMap){
    if (socketIdRoomMap[socketId] == room){
      io.to(socketId).emit("refresh");
    }
  }
}

function updateRoomList(){
  for (let socketId in socketIdRoomMap){
    if (socketIdRoomMap[socketId] == null){
      io.to(socketId).emit("roomList",gameApp);
      console.log("emitted room list")
    }
    else{
      console.log("socket had a room")
    }
  }
}

function updateRoomData(roomNumber){
  let room = gameApp.waitingRooms[roomNumber]

  console.log("socketIdRoomMap", socketIdRoomMap)

  for (let socketId in socketIdRoomMap){
    if (socketIdRoomMap[socketId] == roomNumber){

      io.to(socketId).emit("roomData",room);

      console.log("emitted room data")
    }
    else{
      console.log("socket was not in a room (how)")
    }
  }
}

server.listen(port);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on("error", onError);

server.on("listening", onListening);

module.exports = app;
