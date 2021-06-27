import {Player} from './Player'

export class waitingRoom{

  readyPlayerCount: number
  playerCount: number
  players: {[id:string]: Player}

  constructor(){
    this.readyPlayerCount = 0
    this.playerCount = 0
    this.players = {}
  }

  join(userid:string){ // <marquee> UserID not escaped B) </marquee>
    this.playerCount++
    this.players[userid] = new Player('')
  }

  submitWord(word:string, id:string){
    this.readyPlayerCount++
    this.players[id].makeWord(word)
  }


  getPlayerCount(){
    return this.playerCount
  }

  getReadyPlayerCount(){
    return this.readyPlayerCount
  }

  
}
