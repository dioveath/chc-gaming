

var buildMakeTourney = function(tourneyValidator){
  
  return ({
    title,
    description,
    status,
    medias,
    members,
    managers,
    sponserships,
    prizes,
    matches,
    hypes,
    game,
    max_players,
    location,
    live_link,
    registration_end_date,
    start_date,
    end_date,
    registration_fee
  } = {}) => {

    var error = tourneyValidator({
      title,
      description,
      status,
      medias,
      members,
      managers,
      sponserships,
      prizes,
      matches,
      hypes,
      game,
      max_players,
      location,
      live_link,
      registration_end_date,
      start_date,
      end_date,
      registration_fee
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getStatus: () => status,
      getMedias: () => medias,
      getMembers: () => members,
      getManagers: () => managers,
      getSponserships: () => sponserships,
      getPrizes: () => prizes,
      getMatches: () => matches,
      getHypes: () => hypes,
      getGame: () => game,
      getMaxPlayers: () => max_players,
      getLocation: () => location,
      getLiveLink: () => live_link,
      getRegistrationEndDate: () => registration_end_date,
      getStartDate: () => start_date,
      getEndDate: () => end_date,      
      getRegistrationFee: () => registration_fee
    });

  };


};

module.exports = buildMakeTourney;
