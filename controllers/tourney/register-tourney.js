const rand = require("random-key");

module.exports = function makeRegisterPlayerTourney(tourneyAccess) {
  return async function registerPlayerTourney(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {

      const tourney = await tourneyAccess.findTourneyById(
        httpRequest.params.id
      );

      if (tourney == null) {
        throw new Error("No Tourney with id: " + httpRequest.params.id);
      }

      const { sub: playerId } = httpRequest.user;

      if (tourney.members.find(m => m.member_id === playerId)) {
        throw new Error("Player is already registered!");
      }

      const updatedTourney = await tourneyAccess.updateTourney(
        httpRequest.params.id,
        {
          members: [
            ...tourney.members,
            {
              member_id: playerId,
              reg_id: rand.generate(),
              status: 'pending'
            },
          ],
        }
      );

      return {
        headers,
        statusCode: 200,
        body: {
          status: "success",
          updatedTourney,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        headers,
        statusCode: 400,
        body: {
          status: "fail",
          errorList: error.message.split(","),
        },
      };
    }
  };
};
