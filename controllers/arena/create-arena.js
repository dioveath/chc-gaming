module.exports = function makeCreateArena(arenaAccess){

    return async function createArena(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          const newArena = await arenaAccess.addArena(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newArena
            }
          };
        } catch(error){
          // TODO: Error Logging
          console.log(error);

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
