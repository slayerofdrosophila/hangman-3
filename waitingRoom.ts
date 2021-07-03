import {Player} from './Player'

export class WaitingRoom{

  readyPlayerCount: number
  playerCount: number
  players: {[googleid:string]: Player}
  roomID: number
  maxPlayers: number

  isAvailable: boolean

  constructor(id: number,maxplayers:number){
    this.readyPlayerCount = 0
    this.playerCount = 0
    this.players = {}
    this.roomID = id
    this.maxPlayers = maxplayers
    this.isAvailable = true
  }

  // when a new player joins. creates a Player object for them
  join(user:any){ // <marquee> UserID not escaped B) </marquee>
    this.playerCount++
    console.log("PERSON JOIN")
    this.players[user._id] = new Player(user)
  }

  submitWord(word:string, id:string){
    this.readyPlayerCount++
    this.players[id].makeWord(word)

    if (this.readyPlayerCount >= this.playerCount && this.playerCount > 1){
      console.log("waitingROom thinks it time to start game")
      this.isAvailable = false
    }
  }


  getPlayerCount(){
    return this.playerCount
  }

  getReadyPlayerCount(){
    return this.readyPlayerCount
  }

  
}
