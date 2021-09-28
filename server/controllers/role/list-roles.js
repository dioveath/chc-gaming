

module.exports = function makeListRoles(roleAccess){
  
  return async function listRoles(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {

      const roles = await roleAccess.listRoles();

      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          roles
        }
      };

    } catch (error){

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
