

module.exports = function makeListTourneys(tourneyAccess){
  
  return async function listTourneys(httpRequest){

    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const tourneys = await tourneyAccess.listTourneys(httpRequest.query);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          tourneys
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
