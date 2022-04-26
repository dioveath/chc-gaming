// 


const buildMakeRole = require('./role');
const roleSchema = require('./role-schema').roleSchema;
const roleUpdateSchema = require('./role-schema').roleUpdateSchema;
const roleValidator = require('../validator/')(roleSchema);
const roleUpdateValidator = require('../validator/')(roleUpdateSchema);

const makeRole = buildMakeRole(roleValidator);
const makeUpdateRole = buildMakeRole(roleUpdateValidator);

module.exports = {
  makeRole,
  makeUpdateRole
};
