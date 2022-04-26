const tourneyAccess = require('../../data-access/tourney-db/index');
const makeGetTourney = require('./get-tourney');
const makeCreateTourney = require('./create-tourney');
const makeDeleteTourney = require('./delete-tourney');
const makeListTourneys = require('./list-tourneys');
const makeUpdateTourney = require('./update-tourney');


const getTourney = makeGetTourney(tourneyAccess);
const createTourney = makeCreateTourney(tourneyAccess);
const deleteTourney = makeDeleteTourney(tourneyAccess);
const listTourneys = makeListTourneys(tourneyAccess);
const updateTourney = makeUpdateTourney(tourneyAccess);


const tourneyController = {
  getTourney,
  createTourney,
  deleteTourney,
  listTourneys,
  updateTourney
};

module.exports = tourneyController;
