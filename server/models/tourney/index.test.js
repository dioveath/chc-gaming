
const chai = require('chai');
const expect = chai.expect;
const { makeTourney } = require('./index');


describe('makeTourney', () => {

  it('tests makeTourney makes a valid tournament/league', () => {

    var validTourneyInfoPayload = {
      title: "Charicha Fifa League Season 3",
      description: "A league system where members play their match on weekly basis combining points to rise to top and win prizes",
      members: [
        {
          member_id: "6133aad49e749d0ac4c95564",
          reg_id: "6133aad49e749d0ac4c95564",
          matches_played: []
        }
      ],
      managers: [
        "6133aad49e749d0ac4c95571"
      ],
      sponserships: [],
      prizes: {
        first: "100000 Cash"
      },

      matches: [
        {
          match_id: "6134edfc0ab4471e68819e3c",
          week: 1,
          game: 1,
          match_played: false,
        },
        {
          match_id: "6134ee0ae394a5121c6ab506",
          week: 1,
          game: 1,
          match_played: false,
        }
      ],
      registration_fee: 1000,
      start_date: "2021-09-05T17:16:43.415Z",
      end_date: "2021-10-05T17:16:43.415Z",      
    };

    var input = makeTourney(validTourneyInfoPayload);

    expect(input).to.have.keys([
      "getTitle",
      "getDescription",
      "getMembers",
      "getManagers",
      "getSponserships",
      "getPrizes",
      "getStartDate",
      "getEndDate",
      "getMatches",
      "getRegistrationFee"
    ]);

    expect(input.getDescription()).to.equal("A league system where members play their match on weekly basis combining points to rise to top and win prizes");
    expect(input.getMembers()).to.deep.include({
      member_id: "6133aad49e749d0ac4c95564",
      reg_id: "6133aad49e749d0ac4c95564",
      matches_played: []
    });

  });

  

});
