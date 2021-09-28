const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  gaming_name: { type: String, unique: true },  
  password: String,
  email: { type: String, unique: true }, 
  address: String,
  phone_number: { type: String, unique: true },
  dob: Date,
  roles: Array, 
  phone_verified: Boolean,
  email_verified: Boolean,
  // last_login: Date, NOTE: // add later, don't want to complicate things now 
  // login_count: Number NOTE: // add later
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);
var User = mongoose.model('User', UserSchema);

module.exports = User;
