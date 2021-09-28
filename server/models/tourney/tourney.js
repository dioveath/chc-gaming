

var buildMakeTourney = function(tourneyValidator){
  
  return ({
    title,
    description,
    members,
    managers,
    sponserships,
    prizes,
    start_date,
    end_date,
    matches,
    registration_fee
  } = {}) => {

    var error = tourneyValidator({
      title,
      description,
      members,
      managers,
      sponserships,
      prizes,
      start_date,
      end_date,
      matches,
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
      getStartDate: () => start_date,
      getEndDate: () => end_date,
      getMatches: () => matches,
      getRegistrationFee: () => registration_fee
    });

  };


};

module.exports = buildMakeTourney;
