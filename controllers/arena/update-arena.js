module.exports = function makeUpdateUsser(arenaAccess){
  
  return async function updateArena(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedArena = await arenaAccess.updateArena(httpRequest.params.id, httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedArena
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
          errorList: error.message.split('\n')
        }
      };
    }

  };

};
