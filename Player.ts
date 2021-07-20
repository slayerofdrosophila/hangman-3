
import { AnyNsRecord } from 'dns'
import {PlayerWord} from './PlayerWord'

export class Player{

  googleId: string
  displayName: string
  word: PlayerWord
  user: any

  guessedLetters: string[] = []

  // output:string
  // id:number
  health:number
  // healthString:string

  constructor(user){  
    this.word = new PlayerWord()
    this.word.makeWord('placeholder')
    this.googleId = user._id

    this.user = user

    this.displayName = user.username
    // this.id = input
    this.health = 6
    // this.healthString = ''
  }

  makeWord(input){
    this.word.makeWord(input.toUpperCase())
    this.word.getDashes()
  }

  checkGuessed(){
    let dashes = 0

    if (this.word.getDashes().indexOf('-') == -1){ // if there are no more dashes left
      console.log('checkGuesseed think they ded')
      console.log(this.word.getDashes())
      return true
    }
    else{
      console.log('checkGuesseed thinks they not ded')
      console.log(this.word.getDashes())
      return false
    }
  }
  
  guessLetter(input){
    input = input.toUpperCase()
    var result = this.word.guessLetter(input) // returns 0 if correct, 1 if incorrect

    if (this.guessedLetters.indexOf(input) > -1){
      return
    }

    if (result == 1){
      this.guessedLetters.push(input)
    }
    return result
  }

  takeDamage(input){
    this.health -= input
  }

}
