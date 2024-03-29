// Entity - Match

var buildMakeMatch = function (matchValidator) {
  return ({
    summary,
    status,
    is_neutral,
    home_player,
    away_player,
    home_goals,
    away_goals,
    in_extraTime,
    in_penalty,
    match_date,
  } = {}) => {

    matchValidator({
      summary,
      status,
      is_neutral,
      home_player,
      away_player,
      home_goals,
      away_goals,
      in_extraTime,
      in_penalty,
      match_date,
    });

    return Object.freeze({
      getSummary: () => summary,
      getStatus: () => status,
      getIsNeutral: () => is_neutral,
      getHomePlayer: () => home_player,
      getAwayPlayer: () => away_player,
      getHomeGoals: () => home_goals,
      getAwayGoals: () => away_goals,
      inExtraTime: () => in_extraTime,
      inPenalty: () => in_penalty,
      getMatchDate: () => match_date,
    });
  };
};

module.exports = buildMakeMatch;
