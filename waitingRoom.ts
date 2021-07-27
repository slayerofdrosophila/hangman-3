import {Player} from './Player'

export class WaitingRoom{

  roomID: number = -1
  minPlayers: number = -1
  maxPlayers: number = -1

  playerCount: number = 0
  players: {[googleid:string]: Player} = {}
  playerIds: string[] = []
  firstPlayer: string = null

  readyPlayerCount: number = 0
  readyPlayerIds: string[] = []

  category: string = ""
  
  // Time for the players to press the buttons?
  isReadyToStart: boolean = false
  // Time for the players to get kicked to the next room?
  isAvailable: boolean = true
  

  constructor(id: number,minplayers: number,maxplayers:number){
    this.roomID = id
    this.minPlayers = minplayers
    this.maxPlayers = maxplayers
  }

  // when a new player joins. creates a Player object for them
  join(user:any){ 
    this.playerCount++
    console.log("PERSON JOIN")

    this.players[user._id] = new Player(user)

    if (this.playerIds.indexOf(user._id) == -1){
      this.playerIds.push(user._id)
      console.log(user._id)
    }

    if (this.firstPlayer == null){
      this.firstPlayer = user._id
    }
  }

  submitWord(word:string, id:string){
    this.players[id].makeWord(word)

    // only puts them in if theyre not in there
    if (this.readyPlayerIds.indexOf(id) == -1){
      this.readyPlayerIds.push(id)
    }

    // max capacity
    if (this.readyPlayerIds.length == this.maxPlayers){
      console.log("waitingRoom",this.roomID,"is ready to start")
      this.isAvailable = false
      this.isReadyToStart = true
    }
  }


  resetRoom(){
    this.readyPlayerCount = 0
    this.playerCount = 0
    this.players = {}
    this.isAvailable = true
    this.readyPlayerIds = []
    this.isReadyToStart = false
    this.firstPlayer = null
    
    this.playerIds = []
  }


  getPlayerCount(){
    return this.playerCount
  }

 

  
}
