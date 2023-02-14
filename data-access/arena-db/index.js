const { listArenas,
        findArenaBy,
        findArenaById,
        addArena,
        updateArena,
        deleteArena,
        dropArenas
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listArenas,
  findArenaBy,
  findArenaById, 
  addArena,
  updateArena,
  deleteArena, 
  dropArenas,
};
