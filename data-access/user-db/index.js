
// other controllers and drivers that rely on this API (findUser, listUsers, addUser)
// FIXME: Gateway | Interactor  -- 

const { listUsers,
        findUserBy,
        findUserById,
        addUser,
        updateUser,
        deleteUser,
        dropUsers
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listUsers,
  findUserBy,
  findUserById, 
  addUser,
  updateUser,
  deleteUser, 
  dropUsers,
};
