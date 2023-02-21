
export function generateRound(playersList, tourneyDate){

  // sort in descending
  playersList.sort((a, b) =>  new Date(b.registered_date).getTime() - new Date(a.registered_date).getTime());


  let allMatches = [];

  for(let i = playersList.length - 1; i >= 0; i -= 2){
    allMatches.push(generateMatch(playersList[i].member_id, (i-1) < 0 ? undefined : playersList[i-1].member_id, tourneyDate));
  }

  // returns list of matches
  return allMatches;
}


export function generateMatch(playerA, playerB, tourneyDate){
  return {
    summary: "Tourney Match",
    status: 'ready',
    is_neutral: true,
    home_player: playerA,
    away_player: playerB,
    home_goals: [],
    away_goals: [],
    in_extraTime: false,
    in_penalty: false,
    match_date: tourneyDate
  };
}
