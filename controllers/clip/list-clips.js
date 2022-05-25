module.exports = function makeListClips(clipAccess){
  
  return async function listClips(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const clips = await clipAccess.listClips(httpRequest.query);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          clips
        }
      };
    } catch (error){
      // Error logging
      console.log(error);
      return {
        headers,
        statusCode: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };

    };

  };

}
