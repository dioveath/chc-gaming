

var buildMakeTourney = function(tourneyValidator){
  
  return ({
    title,
    description,
    members,
    managers,
    sponserships,
    prizes,
    matches,
    game,
    max_players,
    location,
    start_date,
    end_date,
    registration_fee
  } = {}) => {

    var error = tourneyValidator({
      title,
      description,
      members,
      managers,
      sponserships,
      prizes,
      matches,
      game,
      max_players,
      location,
      start_date,
      end_date,
      registration_fee
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getMembers: () => members,
      getManagers: () => managers,
      getSponserships: () => sponserships,
      getPrizes: () => prizes,
      getMatches: () => matches,
      getStartDate: () => start_date,
      getEndDate: () => end_date,
      getGame: () => game,
      getMaxPlayers: () => max_players,
      getLocation: () => location,
      getRegistrationFee: () => registration_fee
    });

  };


};

module.exports = buildMakeTourney;
