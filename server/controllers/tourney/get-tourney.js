
module.exports = function makeGetTourney(tourneyAccess){
  
  return async function getTourney(httpRequest){

    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const tourney = await tourneyAccess.findTourneyById(httpRequest.params.id); 

      if(tourney == null){
        throw new Error("No Tourney with id: " + httpRequest.params.id);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          tourney
        }
      };

    } catch(error){
      return {
        headers,
        statusCode: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };
    }

  };

};
