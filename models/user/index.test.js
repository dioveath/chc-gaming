// tests makeUser

const chai = require('chai');
const expect = chai.expect;
const { makeUser } = require('./index');


describe('makeUser', ()=> {
  
  it('tests makeUser makes a valid user', async () => {
    
    var validUserInfoPayload = {
      first_name: "Khatra",
      last_name: "Bahadur",
      gaming_name: "bahaduriskhatra",
      password: "thisiskhatrabahadur",
      email: "khatrabahadur@gmail.com",
      address: "khatra sahar",
      phone_number: "9812345678",
      dob: "11-2-2000",  // MM-DD-YYYY
      roles: ['614b6844e28ef411e800368d']     // gamer role      
    };

    var input = await makeUser(validUserInfoPayload);


    expect(input).to.have.keys([
      "getFirstName",
      "getLastName",
      "getGamingName",
      "getPassword",
      "getEmail",
      "getPhoneNumber",
      "getAddress",
      "getDOB",
      "getRoles"
    ]);

  });

  it('tests makeUser throws error for user with phone_number not 10 digits', async () => {
    
    var invalidUserInfoPayload = {
      first_name: "Summer",
      last_name: "Winter",
      gaming_name: "summeriswinter",
      password: "contradiction",
      email: "summerwinter@gmail.com", 
      address: "sagaraha",
      phone_number: "9999",
      dob: "12-21-2000", // MM-DD-YYYY
      roles: ['614b6844e28ef411e800368d']     // gamer role            
    };

    var expectedValue = {
      message: '"phone_number" length must be 10 characters long',
    };

    try {
      await makeUser(invalidUserInfoPayload);
    } catch (error){
      expect(error).to.have.property('message');
      expect(error.message).to.equal(expectedValue.message);
    }
    

  });

});
