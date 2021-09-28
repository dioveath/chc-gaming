

module.exports = function makeListMatches(matchAccess){
  
  return async function listMatches(httpRequest){

    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const matches = await matchAccess.listMatches();

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          matches
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
