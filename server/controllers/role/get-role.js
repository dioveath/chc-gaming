

module.exports = function makeGetRole(roleAccess){
  
  return async function getRole(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const role = await roleAccess.findRoleById(httpRequest.params.id);

      if(role == null) {
        throw new Error("No Role with id: " + httpRequest.params.id);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          role
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
