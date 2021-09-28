// Entity - Match

var buildMakeMatch = function(matchValidator){
  
  return ({
    summary,
    home_player,
    away_player,
    home_goals,
    away_goals,
    in_extraTime,
    in_penalty,
    match_date,
  } = {}) => {

    var error = matchValidator({
    summary,
    home_player,
    away_player,
    home_goals,
    away_goals,
    in_extraTime,
    in_penalty,
    match_date
    });
    
    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getSummary: () => summary,
      getHomePlayer: () => home_player, 
      getAwayPlayer: () => away_player,
      getHomeGoals: () => home_goals,
      getAwayGoals: () => away_goals,
      inExtraTime: () => in_extraTime,
      inPenalty: () => in_penalty,
      getMatchDate: () => match_date
    });

  };

};


module.exports = buildMakeMatch;

