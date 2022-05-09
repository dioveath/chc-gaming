/**
 *
 * File: index.spec.js
 * Author: Saroj Rai @CharichaSoftwares
 * Created On: Tuesday, 24 August 2021.
 *
 * Summary: This is test file for userValidator.
 *
 * Copyright(c) 2021 All Rights Reserved for CharichaSoftwares
 */
const chai = require('chai');
const expect = chai.expect;
const validator = require('./index');
const userSchema = require('../user/user-schema.js').userSchema;
const matchSchema = require('../match/match-schema.js').matchSchema;
const userValidator = validator(userSchema);
const matchValidator = validator(matchSchema);



describe("validators", () => {

  describe("userValidator", () => {

    it('validates first_name:string:required, last_name:string:required, gaming_name:string:required, password:string:required, address:string:required phone_number:number:required', ()=> {

      var validPayload = {
	first_name: "Khatra",
	last_name: "Bahadur",
	gaming_name: "bahaduriskhatra",
	password: "thisiskhatrabahadur",
        email: "bahaduriskhatra@gmail.com",
	address: "khatra sahar",
	phone_number: "9812345678",
        dob: "03-21-1990",
        roles: ['614b6844e28ef411e800368d']     // gamer role
      };


      var input = userValidator(validPayload);
      var actual = true;

      expect(input).to.equal(actual);

    });

    it('validates the address field to be required, results in error object with property of errorList array, containing "address" required message.', () => {

      var invalidPayload = {
    	first_name: "Himal",
    	last_name: "Sarkar",
    	gaming_name: "himalsarkar",
    	password: "sarkarisdope",
    	phone_number: "9842012345"
      };

      var input = userValidator(invalidPayload);
      var actualValue = {
        errorList: [
          '"address" is required'
        ]
      };

      expect(input).to.not.equal(true);
      expect(input).to.have.property('errorList');
      expect(input.errorList).to.include.members(actualValue.errorList);

    });

    it('validates the phone_number is 10 digit, results in error object with property of errorList, containing "phone_number" length must be 10 characters long', () => {

      var invalidPayload = {
    	first_name: "Summer",
    	last_name: "Winter",
    	gaming_name: "summeriswinter",
    	password: "contradiction",
    	address: "sagaraha",
    	phone_number: "99999"
      };

      var input = userValidator(invalidPayload);
      var actualValue = {
        errorList: [
          '"phone_number" length must be 10 characters long'
        ]
      };

      expect(input).to.not.equal(true);
      expect(input).to.have.property('errorList');
      expect(input.errorList).to.include.members(actualValue.errorList);

    });
    

  });


  describe("matchValidator", () => {

    describe("validates ", () => {
      
    });

  });


});
