import {Player} from './Player'

export class waitingRoom{

  readyPlayerCount: number
  playerCount: number
  players: {[googleid:string]: Player}
  roomID: number

  constructor(id: number){
    this.readyPlayerCount = 0
    this.playerCount = 0
    this.players = {}
    this.roomID = id
  }

  // when a new player joins. creates a Player object for them
  join(googleid:string){ // <marquee> UserID not escaped B) </marquee>
    this.playerCount++
    this.players[googleid] = new Player(googleid)
  }

  submitWord(word:string, id:string){
    this.readyPlayerCount++
    this.players[id].makeWord(word)

    if (this.readyPlayerCount == this.playerCount && this.playerCount > 1){
      // game.start()
      // send the players away
      // destroy the roomk
    }
  }


  getPlayerCount(){
    return this.playerCount
  }

  getReadyPlayerCount(){
    return this.readyPlayerCount
  }

  
}
