var express = require('express');
var router = express.Router();


app.get('/word', (req,res) => {
  res.locals.extrastuff = ''
  for (var player of players){
    res.locals.extrastuff += player.display()
  }
  res.render('wordSubmit')
})

module.exports=router;
