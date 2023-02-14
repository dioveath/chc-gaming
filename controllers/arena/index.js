const arenaAccess = require('../../data-access/arena-db/index');
const makeGetArena = require('./get-arena');
const makeCreateArena = require('./create-arena');
const makeDeleteArena = require('./delete-arena');
const makeListArenas = require('./list-arenas');
const makeUpdateArena = require('./update-arena');

const getArena = makeGetArena(arenaAccess);
const createArena = makeCreateArena(arenaAccess);
const deleteArena = makeDeleteArena(arenaAccess);
const listArenas = makeListArenas(arenaAccess);
const updateArena = makeUpdateArena(arenaAccess);

const arenaController = {
  getArena,
  createArena,
  updateArena, 
  deleteArena,
  listArenas,
};

module.exports = arenaController;
