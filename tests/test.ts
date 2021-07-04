import {Player} from '../Player'

var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      const user = {id:'id'}
      const player = new Player(user)
      player.makeWord("placeholder")
      const o = player.guessLetter('a')
      assert.equal(o,0);
    });
  });
  
  describe('hello', function() {
    it('test 2', function() {
      const user = {id:'id'}
      const player = new Player(user)
      player.makeWord("cheese stick")
      // thisk is for upeprcase

      const o = player.word.getDashes()

      assert.equal(o,"------ -----")
    });
  });
});

class Hello {
  addone(x: number){
    return x+1
  }
}

