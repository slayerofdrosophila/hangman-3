
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

//var userSchema = mongoose.Schema( {any:{}})

var userSchema = Schema( {
  googleid: String,
  googletoken: String,
  
  username:String,
  age:Number,
  imageURL: String,
  wins: Number,
  bio: String,
} );

module.exports = mongoose.model( 'HangmanUser', userSchema );
