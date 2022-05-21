module.exports = function makeDeletePlayerTourney(tourneyAccess) {
  return async function deletePlayerTourney(httpRequest) {
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

      if (!(tourney.members.find(m => m.member_id === httpRequest.params.playerId))) {
        throw new Error("Player is not registered!");
      }

      const updatedTourney = await tourneyAccess.updateTourney(
        httpRequest.params.id,
        {
          members: [
            ...(tourney.members.filter((m) => m.member_id !== httpRequest.params.playerId))
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
