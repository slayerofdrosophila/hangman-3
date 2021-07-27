function HostControls(props){
    console.log("hostontrol")

    const category = React.createRef()

    const handleCategorySubmit = event => {
        event.preventDefault();
        console.log("Button 2 worked!!")
        socket.emit("setCategory",{category:category.current.value,roomid:window.roomid})
        category.current.value = ''
    }


    if (props.gameApp.firstPlayer == window.googleid){
        return(
            <div>
                <form onSubmit={handleCategorySubmit} autoComplete="off">
                <input type="text" name="category" ref={category} /> choose room category <br/>
                <input type="submit" value="Submit"/>
                </form> <hr></hr>
                <StartEarlyButton gameApp={props.gameApp}/>
            </div>
        )
    }
    else{
        return (
            <div>

            </div>
        )
    }
}

function StartEarlyButton(props){
    const currentRoom = props.gameApp;
    if (currentRoom.readyPlayerIds.length >= currentRoom.minPlayers && currentRoom.firstPlayer == window.googleid){
        return(
            <div>
                <form method="post" action ="/startRoom" autoComplete="off">
                <input type="submit" value="Start Game Early"/>
                </form> <hr/>
            </div>
        )
    }
    else{
        return (null)
    }
}
const socket = io();
function WaitingRoom(props){

    const word = React.createRef()

    const [room,setRoom] = React.useState({
            roomID: 4,
            maxPlayers: 3,
            minPlayers: 1,
            roomName: "4",
            players: {"googleid1":{
                    word: "placeholder",
                    displayName: "player1",
                    isHost: true
                },
            },
            firstPlayer: "googleid1",
            readyPlayerIds: ["googleid2"]
        })
    const userId = ""

    React.useEffect(() => {
        console.log("useeffect")


		socket.emit("askForRoomData", window.roomid)

		socket.on("roomData", data => {
			setRoom(data);
			window.mydata = data
            socket.emit("roomid", data.roomID)
		});

	  }, []);

    // const roomid = gameApp.roomLookup()


    const handleWordSubmit = event => {
        event.preventDefault();
        console.log("Button worked!!")
        socket.emit("wordSubmit",{word:word.current.value,_id:googleid})
        console.log(word)
        word.current.value = ''
    }
   
    return(
        <div>        
            <h4>Room {room.roomID} </h4>

            <div>
                <p>
                    There are  {room.readyPlayerIds.length}
                    {room.minPlayers} - {room.maxPlayers} players ready.
                </p>
            <br/>
                <p>
                    There are {Object.keys(room.players).length} players in this room. <br/>
                </p>
            </div>
            <br/>

            <h4>This room's category is:  {room.category} </h4>

            <HostControls gameApp={room} />

            <form onSubmit={handleWordSubmit} autoComplete="off">
                <input type="text" name="word" ref={word}/> write your word <br/>
                <input type="submit" value="Submit"/>
            </form>

            <br/>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <td>Connected players:</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    <PlayerTable room={room}/>
                </tbody>
            </table>
        </div>
    )
}

function PlayerTable(props){

    const room = props.room

    var tableContents = Object.keys(room.players).map(googleid => {

        var isHost = ""

        if (room.firstPlayer == googleid){
            isHost = "[Host] "
        }

        var isReady = ""

        console.log(room.readyPlayerIds)

        if (room.readyPlayerIds.indexOf(googleid) != -1){
            isReady = "[Ready]"
        }

        return(
            <tr>
                <td>
                    {isHost}
                    {room.players[googleid].displayName}
                </td>
                <td>
                    {isReady}
                </td>
            </tr>
        )
    })

    return tableContents
}

//
// const gameApp = {
//     waitingRoom:{
//         playerIds: ["playerid1","playerid2"],
//         maxPlayers: 3,
//         minPlayers: 1,
//         isAvailable: true,
//         players: {"googleid":{}},
//         readyPlayers: ["playerid2"],
//         firstPlayer: "playerid1"
//     }
// }
//
// const renderingData = {
//     maxPlayers: 3,
//     minPlayers: 1,
//     roomName: "4",
//     players: {"googleid1":{
//             word: "placeholder",
//             displayName: "player1",
//             isHost: true
//         },
//         "googleid2":{
//             word: "word2",
//             displayName: "player2",
//             isHost: false
//         }
//     },
//     firstPlayer: "googleid1",
//     readyPlayers: ["googleid2"]
// }


// wat data to need to render?

ReactDOM.render(

	<div>
	  <WaitingRoom/>
	</div>,

  document.getElementById('reactWaitingRoom')
);