

function RoomSelect() {

	const [gameApp,setGameApp] = React.useState({waitingRooms:[]})

	React.useEffect(() => {
		const socket = io();
		socket.emit("askForRoomList")
		socket.on("roomList", data => {
			setGameApp(data);
		});
	  }, []);

	
	const roomList = gameApp.waitingRooms.map(waitingRoom => {
		if(waitingRoom.isAvailable) {
			return(
				  <tr>
					<td>Room {waitingRoom.roomid} </td>
					<td>Players: {Object.keys(waitingRoom.players).length} / {waitingRoom.minPlayers} - {waitingRoom.maxPlayers} </td>
					<td>
						<form method="post" action ="/selectRoom">
						<input type="text" name="roomnumber" hidden={true} value={waitingRoom.roomID} readOnly={true}/>
						<input type="submit" value="Join" />
					  </form>
					</td>
				  </tr>
				)
			}
			else{
				return null
			}
	})
	
    return (
      <div className="chart">
        <p> ADKJAS </p>
		<table>
			<tbody>
				{roomList}
			</tbody>
		</table>

		<hr/>
		
		<p>Create a room:</p>
		<form method="post" action ="/createRoom" autoComplete="off">
		  <input type="text" name="minPlayers" /> Minimum players (game can be started manually at this number) <br/>
		  <input type="text" name="maxPlayers" /> Maximum players  <br/>
		  <input type="submit" value="Submit"/>
		</form>

      </div>
    );
  }


// ========================================

	// var gameApp = {
	// 	waitingRooms:[{
	// 		roomid:"roomid",
	// 		playerIds:["playerid1","playerid2"],
	// 		maxPlayers: 3,
	// 		minPlayers: 2,
	// 		isAvailable: true,
	// 	}]
	// }



ReactDOM.render(

	<div>
	  <RoomSelect/>  
	</div>,

  document.getElementById('reactRoomSelection')
);