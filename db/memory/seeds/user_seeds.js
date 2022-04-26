
const USERS = require('../');

function seedDatabase () {
  var user1 = {
    first_name: "Khatra",
    last_name: "Bahadur",
    gaming_name: "bahaduriskhatra",
    password: "thisiskhatrabahadur",
    address: "khatra sahar",
    phone_number: "9812345678"
  };

  var user2 = {
    first_name: "Himal",
    last_name: "Sarkar",
    gaming_name: "himalsarkar",
    password: "sarkarisdope",
    address: "sagarmatha",
    phone_number: "9842012345"
  };

  var user3 = {
    first_name: "Summer",
    last_name: "Winter",
    gaming_name: "summeriswinter",
    password: "contradiction",
    address: "sagaraha",
    phone_number: "9999911111"
  };

  USERS.push(user1);
  USERS.push(user2);
  USERS.push(user3);

};


function resetSeedDatabase(){
  console.log("resetting..!");
  // USERS = []; // FIXME: ?? USERS === undefined ?? why ?? 
  seedDatabase();
}

module.exports = resetSeedDatabase;
