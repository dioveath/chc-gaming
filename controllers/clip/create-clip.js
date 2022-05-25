module.exports = function makeCreateClip(clipAccess){

    return async function createClip(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          const newClip = await clipAccess.addClip(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newClip
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

}
