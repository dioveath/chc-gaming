// tests makeUser

const chai = require('chai');
const expect = chai.expect;
const { makeUser } = require('./index');


describe('makeUser', ()=> {
  
  it('tests makeUser makes a valid user', () => {
    
    var validUserInfoPayload = {
      first_name: "Khatra",
      last_name: "Bahadur",
      gaming_name: "bahaduriskhatra",
      password: "thisiskhatrabahadur",
      email: "khatrabahadur@gmail.com",
      address: "khatra sahar",
      phone_number: "9812345678",
      dob: "11-2-2000"  // MM-DD-YYYY
    };

    var input = makeUser(validUserInfoPayload);
    expect(input).to.have.keys(["getFirstName",
                                "getLastName",
                                "getGamingName",
                                "getPassword",
                                "getEmail",
                                "getPhoneNumber",
                                "getAddress",
                                "getDOB"
                               ]);

  });

  it('tests makeUser throws error for user with phone_number not 10 digits', (done) => {
    
    var invalidUserInfoPayload = {
      first_name: "Summer",
      last_name: "Winter",
      gaming_name: "summeriswinter",
      password: "contradiction",
      email: "summerwinter@gmail.com", 
      address: "sagaraha",
      phone_number: "999991111",
      dob: "12-21-2000", // MM-DD-YYYY
    };

    var expectedValue = {
      message: '"phone_number" length must be 10 characters long',
    };

    try {
      makeUser(invalidUserInfoPayload);
      expect(makeUser.bind(this, invalidUserInfoPayload)).to.throw();
    } catch (error){
      expect(error).to.have.property('message');
      expect(error.message).to.equal(expectedValue.message);

      done();
    }
    

  });

});
