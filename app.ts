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
//const bodyParser = require("body-parser");
// const axios = require("axios");
var debug = require("debug")("personalapp:server");




// tadasbe
// const mongoose = require( 'mongoose' );
// mongoose.connect( 'mongodb://localhost/authDemo');

//mongoose.connect( `mongodb+srv://${auth.atlasAuth.username}:${auth.atlasAuth.password}@cluster0-yjamu.mongodb.net/authdemo?retryWrites=true&w=majority`);
//const mongoDB_URI = process.env.MONGODB_URI
//mongoose.connect(mongoDB_URI)

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("we are connected!!!")
// });

// const authRouter = require('./routes/authentication');
// const isLoggedIn = authRouter.isLoggedIn;
// const loggingRouter = require('./routes/logging');
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');


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

//app.use(bodyParser.urlencoded({ extended: false }));

// This is an example of middleware
// where we look at a request and process it!
app.use(function(req, res, next) {
  //console.log("about to look for routes!!! "+new Date())
  console.log(`${req.method} ${req.url}`);
  //console.dir(req.headers)
  next();
});



// app.use(authRouter)
// app.use(loggingRouter);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.use('/todo',toDoRouter);
// app.use('/todoAjax',toDoAjaxRouter);





console.log("I am running!")
// var players: Player[] = [new Player(0),new Player(1)]

import {WordGameApp} from './WordGameApp';
const gameApp = new WordGameApp();


// here we start handling routes
app.get("/", (req, res) => {
  res.locals.gameApp = gameApp
  console.log(gameApp.waitingRoom.getPlayerCount())
  res.render("waitingRoom");
});

app.post("/room/20/id/:userid/submitWord", (req, res) => {
  gameApp.waitingRoom.submitWord(req.body.word,req.params.userid)
  res.locals.gameApp = gameApp
  res.locals.userid = req.params.userid
  res.render("waitingRoom");
});

app.get("/id/:userid", (req, res) => {
  res.locals.gameApp = gameApp
  console.log(gameApp.waitingRoom.getPlayerCount())
  gameApp.waitingRoom.join(req.params.userid)
  res.locals.userid = req.params.userid
  res.render("waitingRoom");
});



// if not logged in, it shows the login thingy
// app.get('/word', isLoggedIn, (req,res) => {
//     async (req,res,next) => {
//       try {
//         res.locals.extrastuff = ''
//         for (var player of players){
//           res.locals.extrastuff += player.display()
//         }
//         res.render('gameScreen')
//       }
//       catch(error){
//         next(error)
//       }
//     }
// })

app.get('/loginScreen', (req,res) => {
  res.render('loginScreen')
})


// app.post('/changeWord',(req,res) => {
//   players[req.body.number].makeWord(req.body.word)
//   res.locals.extrastuff = players.map(x => x.display())
//   res.render('gameScreen')
// })
//
// app.post('/guessWord',(req,res) => {
//   const guess = req.body.guess
//
//   players[0].takeDamage(players[req.body.number].guessLetter(guess))
//   res.locals.extrastuff = players.map(x => x.display())
//   res.render('gameScreen')
// })


// app.get("/json", isLoggedIn, (req, res) => {
//   res.render("json");
// });
//
// app.get("/profile", isLoggedIn, (req, res) => {
//   res.render("profile");
// });
//
// app.post('/editProfile',
//     isLoggedIn,
//     async (req,res,next) => {
//       try {
//         let username = req.body.username
//         let bio = req.body.bio
//         req.user.username = username
//         req.user.bio = bio
//         await req.user.save()
//         res.redirect('/profile')
//       } catch (error) {
//         next(error)
//       }
// })
//
// app.post("/jsonResult",
//   async (req,res,next) => {
//     try {
//       const url = req.body.url
//       const key = req.body.key
//
//       const result = await axios.get("https://abusiveexperiencereport.googleapis.com/v1/sites/" + url + "?key=" + key)
//
//       res.locals.abusiveStatus = result.data.abusiveStatus
//       res.locals.url = req.body.url
//       res.locals.key = req.body.key
//
//       console.log(result.data)
//       res.render('jsonResult')
//     } catch(error){
//       next(error)
//     }
// })

// ============================================================================================================================
// this is for handling waiting room routes

//
// app.get("/room/:roomID/submitWord/", (req, res) => {
//
//   var word = req.body.word
//
//   // playerInfo[req.user.googleid] = req.body.word
//   res.locals.playerInfo = req.body.playerInfo
//   res.render("waitingRoom");
// });


// class waitingRoom{
//   playerInfo: Player[];
//
//   constructor(input){
//     var id = input
//   }
//
//   updatePlayer(word){
//     console.log(word)
//   }
// }
//
//   var rooms = []
//
//   function createRoom(roomID: number) {
//     rooms.push(new waitingRoom(roomID))
//   }
//
//   createRoom(20)
//
// // class Player{
// //   word: string
// //   googleID: user.googleID
// // }
//





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
  res.render("error");
});

//Here we set the port to use
const port = "5000";
app.set("port", port);

// and now we startup the server listening on that port
const http = require("http");
const server = http.createServer(app);

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
