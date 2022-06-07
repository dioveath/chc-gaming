var buildMakeTourney = function (tourneyValidator) {
  return ({
    title,
    description,
    rules,
    status,
    hypes,
    game,
    max_players,
    location,
    platforms,

    registration_fee,
    registration_open_date,
    registration_end_date,
    start_date,
    end_date,

    medias,
    streams,
    registrations,
    participants,
    managers,
    sponserships,
    prizes,
    tourney_data,
    final_standings,
  } = {}) => {
    var error = tourneyValidator({
      title,
      description,
      rules,
      status,
      hypes,
      game,
      max_players,
      location,
      platforms,

      registration_fee,
      registration_open_date,
      registration_end_date,
      start_date,
      end_date,

      medias,
      streams,
      registrations,
      participants,
      managers,
      sponserships,
      prizes,
      tourney_data,
      final_standings,
    });

    if (error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getRules: () => rules,
      getStatus: () => status,
      getHypes: () => hypes,
      getGame: () => game,
      getMaxPlayers: () => max_players,
      getLocation: () => location,
      getPlatforms: () => platforms,

      getRegistrationFee: () => registration_fee,
      getRegistrationOpenDate: () => registration_open_date,
      getRegistrationEndDate: () => registration_end_date,
      getStartDate: () => start_date,
      getEndDate: () => end_date,

      getMedias: () => medias,
      getStreams: () => streams,
      getRegistrations: () => registrations,
      getParticipants: () => participants,
      getManagers: () => managers,
      getSponserships: () => sponserships,
      getPrizes: () => prizes,
      getTourneyData: () => tourney_data,
      getFinalStandings: () => final_standings,
    });
  };
};

module.exports = buildMakeTourney;
