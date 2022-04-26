const roleAccess = require('../../data-access/role-db/index');
const makeGetMatch = require('./get-role');
const makeCreateMatch = require('./create-role');
const makeDeleteMatch = require('./delete-role');
const makeListMatches = require('./list-roles');
const makeUpdateMatch = require('./update-role');


const getRole = makeGetMatch(roleAccess);
const createRole = makeCreateMatch(roleAccess);
const deleteRole = makeDeleteMatch(roleAccess);
const listRoles = makeListMatches(roleAccess);
const updateRole = makeUpdateMatch(roleAccess);

const roleController = {
  
  getRole,
  createRole, 
  deleteRole,
  listRoles,
  updateRole

};


module.exports = roleController;
