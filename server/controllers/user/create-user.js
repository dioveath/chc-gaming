module.exports = function makeCreateUser(userAccess){

    return async function createUser(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          const newUser = await userAccess.addUser(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newUser
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
