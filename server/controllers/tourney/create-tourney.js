

module.exports = function makeCreateTourney(tourneyAccess){
  
  return async function createTourney(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const newTourney = await tourneyAccess.addTourney(httpRequest.body);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          newTourney
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
