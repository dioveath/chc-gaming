
// serializes db match model to business model
// for, e.g.- _id to id

const _serializeSingle = (match) => {

  return {
    "id": match._id,
    "summary": match.summary,
    "home_player": match.home_player,
    "away_player": match.away_player,
    "home_goals": match.home_goals,
    "away_goals": match.away_goals,
    "in_extraTime": match.in_extraTime,
    "in_penalty": match.in_penalty,
    "match_date": match.match_date
  };

};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}


module.exports = serializer;
