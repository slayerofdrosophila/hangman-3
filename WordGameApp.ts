import {WaitingRoom} from './waitingRoom'
import {GameRoom} from './gameStuff'

export class WordGameApp{

  // this means that is a member
  waitingRooms: WaitingRoom[] = []
  googleIdRoomMap: {[googleid: string]: WaitingRoom} = {}

  gameRooms: GameRoom[] = []

  constructor(){
    for (let i = 0; i<1; i++){

      // (ID, minplayers, maxplayers)
      this.waitingRooms.push(new WaitingRoom(i,2,9))
    }
  }

  guessLetter(user: any, targetGoogleId: any, guess: any) {
    const gameRoomId = this.roomLookup(user._id);
    var guessingPlayer = this.gameRooms[gameRoomId].players[user._id];
    var targetPlayer = this.gameRooms[gameRoomId].players[targetGoogleId];
    
    guessingPlayer.takeDamage(targetPlayer.guessLetter(guess));
  
    this.gameRooms[gameRoomId].checkDeath(targetPlayer);
    if (this.gameRooms[gameRoomId].checkGameOver()) {
      // this.resetRoom(gameRoomId);
    }
  
    this.gameRooms[gameRoomId].passTurn();
    return gameRoomId;
  }

  resetRoom(number){
    this.waitingRooms[number].resetRoom()
    // gameRoom will get replaced and original one gets destroyed
  }

  createGameRoom(roomid: number){
    this.gameRooms[roomid] = (new GameRoom(this.waitingRooms[roomid].players, roomid))
  }

  createWaitingRoom(minplayers: number,maxplayers: number){
    this.waitingRooms.push(new WaitingRoom(this.waitingRooms.length,minplayers,maxplayers))
    return this.waitingRooms.length - 1
  }

  joinWaitingRoom(roomid: string, user: any){
    this.googleIdRoomMap[user._id] = this.waitingRooms[roomid]
    this.waitingRooms[roomid].join(user)
  }

  submitWord(word: string, userid: string){
    this.googleIdRoomMap[userid].submitWord(word,userid)
  }

  roomLookup(userid:string){
    return this.googleIdRoomMap[userid].roomID
  }


}
