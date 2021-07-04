import {WaitingRoom} from './waitingRoom'
import {GameRoom} from './gameStuff'

export class WordGameApp{

  // this means that is a member
  waitingRooms: WaitingRoom[] = []
  googleIdRoomMap: {[googleid: string]: WaitingRoom} = {}

  gameRooms: GameRoom[] = []

  constructor(){
    for (let i = 0; i<4; i++){
      this.waitingRooms.push(new WaitingRoom(i,i+1))
    }
  }

  resetRoom(number){
    this.waitingRooms[number].resetRoom()
    this.gameRooms[number]
  }

  createGameRoom(roomid: number){
    this.gameRooms[roomid] = (new GameRoom(this.waitingRooms[roomid].players, roomid))
  }

  createWaitingRoom(maxplayers: number){
    this.waitingRooms.push(new WaitingRoom(this.waitingRooms.length,maxplayers))
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
