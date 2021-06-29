
import {PlayerWord} from './PlayerWord'

export class Player{

  googleid: string
  word: PlayerWord
  // output:string
  // id:number
  // health:number
  // healthString:string

  constructor(id){
    this.word = new PlayerWord()
    this.word.makeWord('placeholder')
    this.googleid = id
    // this.id = input
    // this.health = 6
    // this.healthString = ''
  }

  makeWord(input){
    this.word.makeWord(input)
    this.word.getDashes()
  }

  // assume player 0 all the time for now
  guessLetter(input){
    return this.word.guessLetter(input)
  }

  // takeDamage(input){
  //   this.health -= input
  // }

  // display(){

  //   this.healthString = ''

  //   for (var i = 0; i < this.health; i++){
  //     this.healthString += "<3 "
  //   }

  //   var output = ""

  //   output += "<h1>" + this.word.getWord() + "</h1>" + "<h1>" + this.word.getDashes() + "</h1>"
  //   + "<h3>" + this.healthString + "</h3>"
  //   +`<form method="post" action ="/submitWord">
  //       <input type="text" name="word" size="60"/> set word <br>
  //       <input type="submit" value="Submit"/>
  //       <input type="text" name="number" size="60" value="` + this.number +`" hidden='true'/>
  //     </form>

  //     <form method="post" action ="/guessWord">
  //       <input type="text" name="guess" size="60"/> Guess letter <br/>
  //       <input type="submit" value="Submit"/>
  //       <input type="text" name="number" size="60" value="` + this.number +`" hidden='true'/>
  //     </form> <hr>`

  //   return output
  // }
}
