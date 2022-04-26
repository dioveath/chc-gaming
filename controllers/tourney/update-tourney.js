

module.exports = function makeUpdateTourney(tourneyAccess){
  
  return async function updateTourney(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const updatedTourney = await tourneyAccess.updateTourney(httpRequest.params.id, httpRequest.body);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedTourney
        }
      };

    } catch (error){
      console.log(error);
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
