
module.exports = function makeDeleteTourey(tourneyAccess){
  
  return async function deleteTourney(httpRequest){
    
    const headers = {
      'Content-Type': 'applicaton/json'
    };

    try {

      const deleteResult = await tourneyAccess.deleteTourney(httpRequest.params.id);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          deleted: deleteResult
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
