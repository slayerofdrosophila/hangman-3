import {waitingRoom} from './waitingRoom'

export class WordGameApp{

  // this means that is a member
  waitingRooms: waitingRoom[] = []
  roomMap: {[googleid: string]: waitingRoom} = {}

  constructor(){
    for (let i = 0; i<3; i++){
      this.waitingRooms.push(new waitingRoom(i))
    }
  }


  joinRoom(roomid: string, userid: string){
    this.roomMap[userid] = this.waitingRooms[roomid]
    this.waitingRooms[roomid].join(userid)
  }

  submitWord(word: string, userid: string){
    this.roomMap[userid].submitWord(word,userid)
  }

  roomLookup(userid:string){
    return this.roomMap[userid].roomID
  }


}
