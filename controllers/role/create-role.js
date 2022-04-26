
module.exports = function makeCreateRole(roleAccess){
  
  return async function createRole(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const newRole = await roleAccess.addRole(httpRequest.body);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          newRole
        }
      };

    } catch (error){
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
