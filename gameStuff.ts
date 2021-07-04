import {Player} from './Player'

export class GameRoom{

    playercount: number = -1
    players: {[googleid:string]: Player} = {}
    roomid: number = -1
    playerIds: string[] = []
    turnPlayer: number = 0 // the index of playerIds whose tiuirn it sis
    winner: Player = null

    constructor(players: {[googleid:string]: Player}, roomid: number){
        this.players = players
        this.roomid = roomid

        // order is ???
        let self = this
        Object.values(players).forEach(function(player){
            self.playerIds.push(player.googleId)
        })
    }

    
    passTurn(){
        this.turnPlayer++
        if (this.turnPlayer >= this.playerIds.length){
            this.turnPlayer = 0
        }
    }

    checkDeath(targetPlayer: Player){ // wait this doesnt check death, it kills
        if (this.players[this.playerIds[this.turnPlayer]].health <= 0){
            console.log("SPLICING GUESSER!!")
            this.playerIds.splice(this.turnPlayer,1)
        }
        if (targetPlayer.checkGuessed() == true){
            // go thru playerIds
            // find the matching one

            for (let i = 0; i < this.playerIds.length ; i++) {
                if (JSON.stringify(this.playerIds[i]) == JSON.stringify(targetPlayer.googleId)){
                    console.log("SPLICING TARGET!! THE TARGET IS", targetPlayer.displayName)
                    this.playerIds.splice(this.playerIds.indexOf(targetPlayer.googleId),1)
                }
            }       
        }
    }

    checkGameOver(){
        // declares the winner, also adds win to profile
        if (this.playerIds.length == 1){
            this.winner = this.players[this.playerIds[0]]
            
            if (this.winner.user.wins == null){
                this.winner.user.wins = 1
            }else{
                this.winner.user.wins += 1
            }
            this.winner.user.save()
            return true
        }
        else{
            return false
        }
    }
}