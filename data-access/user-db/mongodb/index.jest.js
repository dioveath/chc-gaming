// Test all data-access of user


const chai = require('chai');
const expect = chai.expect;

const seedUsers = require('../../../db/mongodb/seeds/user_seeds');
const userAccess = require('./index');

// TODO: implement test case later.. if needed..!!


describe('User Data Access with Mongoose', () => {

  before(async () => {
    await seedUsers();
  }); 

  it('tests addUser', async () => {

    var userInfo = {
      first_name: "testAdd",
      last_name: "user",
      gaming_name: "testadd_user",
      password: "checkpass",
      address: "himaachhal",
      phone_number: "1234567890"
    };      

    var addedUser = await addUser(userInfo);

    expect(addedUser).to.have.property('_id');

  });

});

