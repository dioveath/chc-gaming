const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var RoleSchema = new Schema({

  role_name: { type: String, unique: true },
  permissions: { type: Array }

}, { timestamps: true });

RoleSchema.plugin(uniqueValidator);
var Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
