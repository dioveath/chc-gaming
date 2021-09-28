



const buildMakeTourney = require('./tourney');
const tourneySchema =  require('./tourney-schema').tourneySchema;
const tourneyUpdateSchema = require('./tourney-schema').tourneyUpdateSchema;
const tourneyValidator = require('../validator')(tourneySchema);
const tourneyUpdateValidator = require('../validator')(tourneyUpdateSchema);

const makeTourney = buildMakeTourney(tourneyValidator);
const makeUpdateTourney = buildMakeTourney(tourneyUpdateValidator);

module.exports = {
  makeTourney,
  makeUpdateTourney
};
