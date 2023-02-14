const buildMakeArena = require('./arena');
const arenaSchema = require('./arena-schema').arenaSchema;
const arenaUpdateSchema = require('./arena-schema').arenaUpdateSchema;
const arenaValidator = require('../validator/')(arenaSchema);
const arenaUpdateValidator = require('../validator/')(arenaUpdateSchema);

const makeArena = buildMakeArena(arenaValidator);
const makeUpdateArena = buildMakeArena(arenaUpdateValidator);

module.exports =  {
  makeArena,
  makeUpdateArena
};
