const matchAccess = require('../../data-access/match-db/index');
const makeGetMatch = require('./get-match');
const makeCreateMatch = require('./create-match');
const makeDeleteMatch = require('./delete-match');
const makeListMatches = require('./list-matches');
const makeUpdateMatch = require('./update-match');


const getMatch = makeGetMatch(matchAccess);
const createMatch = makeCreateMatch(matchAccess);
const deleteMatch = makeDeleteMatch(matchAccess);
const listMatches = makeListMatches(matchAccess);
const updateMatch = makeUpdateMatch(matchAccess);

const matchController = {
  
  getMatch,
  createMatch, 
  deleteMatch,
  listMatches,
  updateMatch

};


module.exports = matchController;
