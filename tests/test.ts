import {Player} from '../Player'
import {WordGameApp} from '../WordGameApp'

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

  describe('ready players', function() {
    it('test 2', function() {

      gameApp.joinWaitingRoom("0",user)
      gameApp.joinWaitingRoom("0",user)
      gameApp.joinWaitingRoom("0",user)

      assert.equal(gameApp.waitingRooms[0].playerIds.length, 1)
      console.log(testWR.playerCount)

      gameApp.setRoomCategory("testcat", 0)

      assert.equal(gameApp.waitingRooms[0].category, "testcat")
    });

    it('test 3 - duplic8 guess', function() {

      gameApp.joinWaitingRoom("0",user)
      gameApp.joinWaitingRoom("0",user2)

      gameApp.submitWord("test","id")
      gameApp.submitWord("test","id2")

      gameApp.createGameRoom(0)

      gameApp.guessLetter(user,"id2","a")
      gameApp.guessLetter(user2,"id","kjfdh")
      gameApp.guessLetter(user,"id2","a")

      assert.equal(gameApp.gameRooms[0].turnPlayer,0)

      console.log(testWR.playerCount)
    });
    
  });

});

const user = {_id:'id'}
const user2  = {_id:'id2'}
const player = new Player(user)
const player2 = new Player(user2)
const gameApp = new WordGameApp
const testWR = gameApp.waitingRooms[0]
