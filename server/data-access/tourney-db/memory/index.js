
var tourneys = [];
var makeTourney = require('../../../models/tourney/index').makeTourney;


function listTourneys(){
  return tourneys;
}

function findTourneyById(id){
  for(var i = 0; i < tourneys.length; i++)
    if(tourneys[i].id == id) return tourneys[i];
}

function addTourney(tourneyInfo){
  var tourney = makeTourney(tourneyInfo);
  var newTourney = {
    title: tourney.getTitle(),
    description: tourney.getDescription(),
    members: tourney.getMembers(),
    managers: tourney.getManagers(),
    sponserships: tourney.getSponserships(),
    prizes: tourney.getPrizes(),
    start_date: tourney.getStartDate(),
    end_date: tourney.getEndDate(),
    matches: tourney.getMatches(),
    registration_fee: tourney.getRegistrationFee()
  };
  tourneys.push(newTourney);
  return newTourney;
}

function deleteTourney(id){
  for(var i = 0; i < tourneys.length; i++){
    if(tourneys[i].id == id){
      tourneys.splice(i, 1);
      return id;
    }
  }
  return -1; // not founnd
}


module.exports = {
  listTourneys,
  // findTourneyBy,
  findTourneyById,
  addTourney,
  // updateTourney,
  deleteTourney,
  // dropTourneys
};
