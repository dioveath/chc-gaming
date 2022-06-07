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

      const playerId = httpRequest.params.playerId;

      if (tourney.registrations.find(m => m.registrant_id === playerId)) {
        throw new Error("Player is already registered!");
      }

      const userData = await UserAccess.findUserById(playerId);
      const registrationId = rand.generate();

      const updatedTourney = await tourneyAccess.updateTourney(
        httpRequest.params.id,
        {
          registrations: [
            ...tourney.registrations,
            {
              registrant_id: playerId,
              registration_id: registrationId,
              name: userData.gaming_name,
              status: 'pending',
              registered_date: new Date(),
              fee_paid: false,
              type: 'solo'
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
