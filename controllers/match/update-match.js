

module.exports = function makeUpdateMatch(matchAccess) {

  return async function updateMatch(httpRequest){

    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const updatedMatch = await matchAccess.updateMatch(httpRequest.params.id, httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: {
          status:  'success',
          updatedMatch
        }
      };

    } catch (error){
      
      return {
        headers,
        statusCod: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };

    }

  };

};
