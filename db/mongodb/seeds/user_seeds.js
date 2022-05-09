const mongoose = require('../connection');
const User = require('../models/user');

var seedDatabase = async () => {

  var user1 = {
    first_name: "Khatra",
    last_name: "Bahadur",
    gaming_name: "bahaduriskhatra",
    password: "thisiskhatrabahadur",
    email: "khatraishere@gmail.com",
    phone_number: "9812345678",
    address: "khatra sahar",
    dob: "2-13-1999",
    phone_verified: false,
    email_verified: false
  };

  var user2 = {
    first_name: "Himal",
    last_name: "Sarkar",
    gaming_name: "himalsarkar",
    password: "sarkarisdope",
    email: "himalisdope@gmail.com",
    phone_number: "9842012345",
    address: "sagarmatha",
    dob: "4-18-1995",
    phone_verified: false,
    email_verified: false
  };

  var user3 = {
    first_name: "Summer",
    last_name: "Winter",
    gaming_name: "summeriswinter",
    password: "contradiction",
    email: "summerflower@gamil.com",
    phone_number: "9999911111",
    address: "sagaraha",
    dob: "12-24-1996",
    phone_verified: false,
    email_verified: false    
  };

  await User.create(user1);
  await User.create(user2);
  await User.create(user3);
  
};

async function resetSeedDatabase(){

  var result = await User.findOne();
  if(result)
    mongoose.connection.collections.users.drop();    

  await seedDatabase();
}

module.exports = resetSeedDatabase;
