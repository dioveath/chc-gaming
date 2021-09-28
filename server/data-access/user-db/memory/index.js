// memory implementation of findUser, listUsers, dropAll, etc.

var USERS = require('../../../db/memory');


function addUser(user){
  user.id = USERS.length;
  USERS.push(user);
  return findUser(user.id);
}


function findUser(id){
  for(var i = 0; i < USERS.length; i++)
    if(id == USERS[i].id) return USERS[i];
  return null;
}

function listUsers(){
  return USERS;
}


function dropAll(){
  USERS = [];
  return USERS;
}


module.exports = {
  addUser,
  findUser,
  listUsers,
  dropAll
};
