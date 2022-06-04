// tests ??

const seedUsers = require('../db/mongodb/seeds/user_seeds');
const { listUsers, dropUsers, deleteUser, updateUser, findUser } = require('../data-access/user-db');

module.exports = {
  seedUsers,
  listUsers,
  dropUsers,
  findUser,
  updateUser,
  deleteUser,
};
