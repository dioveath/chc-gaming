

const _serializeSingle = (tourney) => {
  return {
    "id": tourney.id,
    "title": tourney.title,
    "description": tourney.description,
    "members": tourney.members,
    "managers": tourney.managers,
    "sponserships": tourney.sponserships,
    "prizes": tourney.prizes,
    "matches": tourney.matches,
    "game": tourney.game,
    "max_players": tourney.max_players,
    "location": tourney.location,
    "start_date": tourney.start_date,
    "end_date": tourney.end_date,
    "registration_fee": tourney.registration_fee
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}


module.exports = serializer;
