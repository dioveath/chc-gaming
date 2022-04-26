module.exports = function makeListUsers(userAccess){
  
  return async function listUsers(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const users = await userAccess.listUsers();
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          users
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
