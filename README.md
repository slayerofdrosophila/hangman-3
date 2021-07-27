# Welcome

A multiplayer Hangman game. How to play is inside
/views/help.ejs

This version will run both offline and online, however,
you must have the database credentials inside your
environment variables (for now).

Has only been deployed to Heroku for now.


---

# hwo it works

M E R N

M is unimportant

E is for Express    
it is the server    
it takes and emites socket magic

object class files "business logic"
(player +word watitingroom gamestuff wordgameapp)

view files (all the ejs and jsx)

server (app.ts)
* random express setup
* routes that serve ejs things
* socket emitting and receiving (for the jsx)


major objects
* gameapp
    * room objects
        * player objects
* server
* database
    * user data

use case: logging in
they are shown a page
maybe update the database if first time

use case: create (and join) a room
gameapp makes new room object and puts it into array    
joining makes the room update itself with the new player (and host)  
server has to give page
-->
server gets a post  
server handles the thing and redirects at end of post
room creates new player obj and stores it
browser requests the redirect page
server gives redirect page
client code connects to server
client code emits msg to server asking for data
server emits data back
client re-renders changed elements in page (almost everything)


case: second player also joins the same room    
server gets a post      
server handles the thing and redirects at end of post   
room creates new player obj and stores it   
server runs function that emits the new room data to both browsers      
<same sequence>


a function that u call whenever a room changes
which emits the updated room to sockets in the right room