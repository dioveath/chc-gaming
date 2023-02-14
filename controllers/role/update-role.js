
module.exports = function makeUpdateRole(roleAccess){
  
  return async function updateRole(httpRequest){

    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const updatedRole = await roleAccess.updateRole(httpRequest.params.id, httpRequest.body);

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedRole
        }
      };

    } catch(error){
      console.log(error);

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
