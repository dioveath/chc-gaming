module.exports = function makeUpdateUsser(clipAccess){
  
  return async function updateClip(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedClip = await clipAccess.updateClip(httpRequest.params.id, httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedClip
        }
      };

    } catch(error){
      // TODO: Error logging
      // console.log(error);

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

}
