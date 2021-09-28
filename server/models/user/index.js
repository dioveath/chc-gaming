// Dependency Inject
// - Schema 
// - validation library


const buildMakeUser = require('./user');
const userSchema = require('./user-schema').userSchema;
const userUpdateSchema = require('./user-schema').userUpdateSchema;
const userValidator = require('../validator/')(userSchema);
const userUpdateValidator = require('../validator/')(userUpdateSchema);
const bcrypt = require('bcrypt');

const makeUser = buildMakeUser(userValidator, bcrypt);
const makeUpdateUser = buildMakeUser(userUpdateValidator, bcrypt);

module.exports =  {
  makeUser,
  makeUpdateUser
};
