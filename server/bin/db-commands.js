// tests ??

const seedUsers = require('../db/mongodb/seeds/user_seeds');
const { listUsers, dropUsers, deleteUser, findUser } = require('../data-access/user-db');

module.exports = {
  seedUsers,
  listUsers,
  dropUsers,
  findUser,
  deleteUser,
};
