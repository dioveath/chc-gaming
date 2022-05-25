const tourneyAccess = require('../../data-access/tourney-db/index');
const makeGetTourney = require('./get-tourney');
const makeCreateTourney = require('./create-tourney');
const makeDeleteTourney = require('./delete-tourney');
const makeListTourneys = require('./list-tourneys');
const makeUpdateTourney = require('./update-tourney');
const makeRegisterPlayerToTourney = require('./register-player-tourney');
const makeDeletePlayerFromTourney = require('./delete-player-tourney');
const makeRegisterTourney = require('./register-tourney');

const getTourney = makeGetTourney(tourneyAccess);
const createTourney = makeCreateTourney(tourneyAccess);
const deleteTourney = makeDeleteTourney(tourneyAccess);
const listTourneys = makeListTourneys(tourneyAccess);
const updateTourney = makeUpdateTourney(tourneyAccess);

const registerTourney = makeRegisterTourney(tourneyAccess);
const registerPlayerToTourney = makeRegisterPlayerToTourney(tourneyAccess);
const deletePlayerFromTourney = makeDeletePlayerFromTourney(tourneyAccess);


const tourneyController = {
  getTourney,
  createTourney,
  deleteTourney,
  listTourneys,
  updateTourney,

  registerTourney,
  registerPlayerToTourney,
  deletePlayerFromTourney
};

module.exports = tourneyController;
