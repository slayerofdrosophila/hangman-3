export class PlayerWord {

  word: string;
  underscoresString: string;
  wordList: string[];
  underscoresList: string[];

  constructor (){
    this.word = ''
    this.underscoresString = ''
    this.wordList = []
    this.underscoresList = []
  }

  makeWord(input:string) {
    this.word = input
    this.wordList = this.word.split('')

    this.underscoresList = []
    for (var c in this.wordList) {
      this.underscoresList.push('-')
    }
  }


  guessLetter(guess:string){
    var corrects = 0
    for (let i in this.wordList) {
      if (this.wordList[i] == guess){
        this.underscoresList[i] = guess
        console.log('Correctly guessed ' + guess)
        corrects++
      }
    }
    this.getDashes()
    // if the letter was guessed right
    // this return gets passed into takeDamage
    if (corrects > 0){
      return 0
    }
    // letter was guessed wrong
    else{
      return 1
    }
  }

  getWord(){
    return this.word
  }

  getDashes(){
    this.underscoresString = this.underscoresList.join('')
    return this.underscoresString
  }
}
