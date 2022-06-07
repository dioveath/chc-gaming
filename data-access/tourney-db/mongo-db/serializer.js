const _serializeSingle = (tourney) => {

  return {
    "id": tourney.id,
    "title": tourney.title,
    "description": tourney.description,
    "rules": tourney.rules,
    "status": tourney.status,
    "hypes": tourney.hypes,
    "game": tourney.game,
    "max_players": tourney.max_players,
    "location": tourney.location,
    "platforms": tourney.platforms,

    "registration_fee": tourney.registration_fee,
    "registration_open_date": tourney.registration_open_date,
    "registration_end_date": tourney.registration_end_date,
    "start_date": tourney.start_date,
    "end_date": tourney.end_date,

    "medias": tourney.medias,
    "streams": tourney.streams,
    "registrations": tourney.registrations,
    "participants": tourney.participants,
    "managers": tourney.managers,
    "sponserships": tourney.sponserships,
    "prizes": tourney.prizes,
    "tourney_data": tourney.tourney_data,
    "final_standings": tourney.final_standings,

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
