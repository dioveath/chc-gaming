
module.exports = function makeDeleteMatch(matchAccess){
  
  return async function deleteMatch(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const deleteResult = await matchAccess.deleteMatch(httpRequest.params.id);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          deleted: deleteResult
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
