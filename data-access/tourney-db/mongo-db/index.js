const Tourney = require('../../../db/mongodb/models/tourney');
const serialize = require('./serializer');
const makeTourney = require('../../../models/tourney/index').makeTourney;
const makeUpdateTourney = require('../../../models/tourney/index').makeUpdateTourney;
const errorFormatter = require('./errorFormatter');


function listTourneys(httpQuery){
  const { pageQuery, ...query} = httpQuery;
  return Tourney.find(query).then(serialize).catch(errorFormatter);
}


function findTourneyBy(prop, val){
  if(prop == 'id') prop = '_id';
  return Tourney.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}


function findTourneyById(id){
  return Tourney.findById(id).then(serialize).catch(errorFormatter);
}

function addTourney(tourneyInfo){
  tourneyInfo.description = tourneyInfo?.description || 'Your description goes here.';
  tourneyInfo.rules = tourneyInfo?.rules || 'Your rules goes here!';  
  tourneyInfo.status = 'pending';
  tourneyInfo.hypes = [];

  tourneyInfo.medias = tourneyInfo?.medias || [];
  tourneyInfo.streams = tourneyInfo?.streams || [];
  tourneyInfo.registrations = [];
  tourneyInfo.participants = [];

  tourneyInfo.sponserships = tourneyInfo?.sponserships || [];
  tourneyInfo.prizes = tourneyInfo?.prizes || [];
  tourneyInfo.tourney_data = {};
  tourneyInfo.final_standings = [];


  let tourney = makeTourney(tourneyInfo);
  let newTourney = {
    title: tourney.getTitle(),
    description: tourney.getDescription(),
    rules: tourney.getRules(),
    status: tourney.getStatus(),
    hypes: tourney.getHypes(),
    game: tourney.getGame(),
    max_players: tourney.getMaxPlayers(),
    location: tourney.getLocation(),
    platforms: tourney.getPlatforms(),

    registration_fee: tourney.getRegistrationFee(),
    registration_open_date: tourney.getRegistrationOpenDate(),
    registration_end_date: tourney.getRegistrationEndDate(),
    start_date: tourney.getStartDate(),
    end_date: tourney.getEndDate(),

    medias: tourney.getMedias(),
    streams: tourney.getStreams(),
    registrations: tourney.getRegistrations(),
    participants: tourney.getParticipants(),
    managers: tourney.getManagers(),
    sponserships: tourney.getSponserships(),
    prizes: tourney.getPrizes(),
    tourney_data: tourney.getTourneyData(),
    final_standings: tourney.getFinalStandings()

  };
  return Tourney.create(newTourney).then(serialize).catch(errorFormatter);
}



async function updateTourney(id, updateTourneyInfo){
  if(!id)
    throw new Error("You must supply id!");

  // NOTE: Freeze Object but We don't need this, we just need to validate
  const validUpdateTourneyData = await makeUpdateTourney(updateTourneyInfo); 

  // if error is not thrown, then we can update with updateUserInfo in database
  return Tourney.findByIdAndUpdate(id, updateTourneyInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteTourney(id){
  return Tourney.findByIdAndDelete(id)
    .then(res => {
      if(!res) {
        throw {
          name: 'Error',
          code: 11011,
          _id: id
        };
      }
      return {
        id: res._id.toString()
      };
    }).catch(errorFormatter);
}


function dropTourneys(){
  return Tourney.deleteAny().catch(errorFormatter);
}


module.exports = {
  listTourneys,
  findTourneyBy,
  findTourneyById,
  addTourney,
  updateTourney,
  deleteTourney,
  dropTourneys
};
