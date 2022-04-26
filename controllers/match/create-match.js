
module.exports = function makeCreateMatch(matchAccess){
  
  return async function createMatch(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const newMatch = await matchAccess.addMatch(httpRequest.body);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          newMatch
        }
      };

    } catch (error){
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
