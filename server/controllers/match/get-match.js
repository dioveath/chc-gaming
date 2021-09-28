
module.exports = function makeGetMatch(matchAccess){
  
  return async function getMatch(httpRequest){
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const match = await matchAccess.findMatchById(httpRequest.params.id);

      if(match == null) {
        throw new Error("No Match with id: " + httpRequest.params.id);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          match
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
