module.exports = function makeListArenas(arenaAccess){
  
  return async function listArenas(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const arenas = await arenaAccess.listArenas(httpRequest.query);
      
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          arenas
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

};
