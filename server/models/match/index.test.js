
// tests makeMatch

const chai = require('chai');
const expect = chai.expect;
const { makeMatch } = require('./index');



describe('makeMatch', () => {


  it('tests makeMatch makes a valid match', () => {

    var validMatchInfoPayload = {
      summary: "This was the match between jayraj and nugkha at Fifa S3 Week 3 Match 1", 
      home_player: "someidinstringjayrajobjid",
      away_player: "someidinstringnugkhaobjid",
      home_goals: [9, 30, 90],
      away_goals: [45, 68, 71],
      in_extraTime: false,
      in_penalty: false,
      match_date: "9-9-2021", // MM-DD-YYYY
    };

    var input = makeMatch(validMatchInfoPayload);
    expect(input).to.have.keys(["getSummary",
                                "getHomePlayer",
                                "getAwayPlayer",
                                "getHomeGoals",
                                "getAwayGoals",
                                "inExtraTime",
                                "inPenalty",
                                "getMatchDate"
                               ]);

  });

  it('tests makeMatch throws error for home_goals not array', () => {

    var invalidHomeGoalsPayload = {
      summary: "This was the match between jayraj and nugkha at Fifa S3 Week 3 Match 1", 
      home_player: "someidinstringjayrajobjid",
      away_player: "someidinstringnugkhaobjid",
      home_goals: 1, 
      away_goals: [45, 68, 71],
      in_extraTime: false,
      in_penalty: false,
      match_date: "9-9-2021", // MM-DD-YYYY
    };



    expect(() => makeMatch(invalidHomeGoalsPayload)).to.throw();

  });


});

