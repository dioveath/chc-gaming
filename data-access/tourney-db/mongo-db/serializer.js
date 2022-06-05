const _serializeSingle = (tourney) => {
  return {
    "id": tourney.id,
    "title": tourney.title,
    "status": tourney.status,
    "medias": tourney.medias,
    "description": tourney.description,
    "members": tourney.members,
    "managers": tourney.managers,
    "sponserships": tourney.sponserships,
    "prizes": tourney.prizes,
    "matches": tourney.matches,
    "hypes": tourney.hypes,
    "game": tourney.game,
    "max_players": tourney.max_players,
    "location": tourney.location,
    "live_link": tourney.live_link,
    "registration_end_date": tourney.registration_end_date,
    "start_date": tourney.start_date,
    "end_date": tourney.end_date,
    "registration_fee": tourney.registration_fee,
    "createdAt": tourney.createdAt,
    "updatedAt": tourney.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}


module.exports = serializer;
