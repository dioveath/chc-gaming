const userAccess = require('../../data-access/user-db/index');
const makeGetUser = require('./get-user');
const makeCreateUser = require('./create-user');
const makeDeleteUser = require('./delete-user');
const makeListUsers = require('./list-users');
const makeUpdateUser = require('./update-user');

const getUser = makeGetUser(userAccess);
const createUser = makeCreateUser(userAccess);
const deleteUser = makeDeleteUser(userAccess);
const listUsers = makeListUsers(userAccess);
const updateUser = makeUpdateUser(userAccess);

const userController = {
  getUser,
  createUser,
  updateUser, 
  deleteUser,
  listUsers,
};

module.exports = userController;
