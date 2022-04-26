

const Match = require('../../../db/mongodb/models/match');
const serialize = require('./serializer');
const makeMatch = require('../../../models/match/index').makeMatch;
const makeUpdateMatch = require('../../../models/match/index').makeUpdateMatch;
const errorFormatter = require('./errorFormatter');


function listMatches(){
  return Match.find({}).then(serialize).catch(errorFormatter);
}


function findMatchBy(prop, val){
  if(prop == 'id') prop = '_id';
  return Match.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}


function findMatchById(id){
  return Match.findById(id).then(serialize).catch(errorFormatter);
}


function addMatch(matchInfo){
  var match = makeMatch(matchInfo);
  var newMatch = {
    summary: match.getSummary(),
    home_player: match.getHomePlayer(),
    away_player: match.getAwayPlayer(),
    home_goals: match.getHomeGoals(),
    away_goals: match.getAwayGoals(),
    in_extraTime: match.inExtraTime(),
    in_penalty: match.inPenalty(),
    match_date: match.getMatchDate()
  };

  return Match.create(newMatch).then(serialize).catch(errorFormatter);
}


async function updateMatch(id, updateMatchInfo){
  if(!id)
    throw new Error("You must supply id!");

  const validUpdateMatchInfo = await makeUpdateMatch(updateMatchInfo);
  
  return Match.findByIdAndUpdate(id, updateMatchInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteMatch(id){
  return Match.findByIdAndDelete(id).then(res => {
      if(!res) {
        throw {
          name: 'Error',
          code: 11011,
          _id: id, 
        };
      }
      return {
        id: res._id.toString()
      };
    }).catch(errorFormatter);
}


function dropMatches(){
  return Match.deleteMany().catch(errorFormatter);
}


module.exports = {
  listMatches,
  findMatchBy,
  findMatchById,
  addMatch,
  updateMatch,
  deleteMatch,
  dropMatches
};
