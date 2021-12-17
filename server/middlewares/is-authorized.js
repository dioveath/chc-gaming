const axios = require('axios') ;


module.exports = function isAuthorized(){
  return async (req, res, next) => {

    var permissions = [];

    for(var i = 0; i < req.user.roles.length; i++){
      try {
        var rolePayload = await axios.get(`http://localhost:5555/api/v1/roles/${req.user.roles[i]}`);
        if(rolePayload.data != undefined){
          permissions = permissions.concat(rolePayload.data.role.permissions);
        }
      } catch (error){
        console.log(error);
      }
    }

    if(isPermissionGranted(req, permissions)){
      return next();
    } else {
      return res.status(401).json({
        status: 'fail',
        errorList: [
          'Unauthorized: Permissions not granted!'
        ]
      });
    }

  };
};



function isPermissionGranted(req, permissions){
  console.log("method: " + req.method);
  console.log("baseUrl: " + req.baseUrl);
  console.log("paramsId: " + req.params.id);
  console.log("req.url: " + req.url);
  console.log("permissions: " + permissions);

  var pathSplitted = req.baseUrl.split('/');
  const resourceType = pathSplitted[pathSplitted.length-1];
  const resourceId = req.url.replace('/', '');

  console.log("resourceId: " + resourceId);
  console.log(req.method);

  switch(req.method){
  case 'GET':

    for(var i = 0;i < permissions.length; i++){
      var symbols = permissions[i].split(':');
      if(symbols[0] != 'read') continue;
      if(symbols[1] != resourceType) continue;

      console.log("symbols[2]: " + symbols[2]);

      if(resourceId !== undefined && symbols[2] == resourceId){
        console.log("returning true params.id");        
        return true;
      }

      if(symbols[2] == "all") {
        console.log("returning true with all");
        return true;
      }

    }
    
    break;
  case 'POST':

    for(var i = 0;i < permissions.length; i++){
      var symbols = permissions[i].split(':');

      if(symbols[0] != 'update' && symbols[0] != 'create') {
        console.log('it was neither update nor create');
        continue;
      }
      if(symbols[1] != resourceType) continue;

      console.log("symbols[2]: " + symbols[2]);

      if(resourceId !== undefined && symbols[2] == resourceId) {
        console.log("returning true params.id");                
        return true;
      }

      if(symbols[2] == "all"){
        console.log("returning true with all");
        return true;
      }
    }    

    break;
  case 'DELETE':

    for(var i = 0;i < permissions.length; i++){
      var symbols = permissions[i].split(':');
      if(symbols[0] != 'delete') continue;
      if(symbols[1] != resourceType) continue;

      if(resourceId !== undefined && symbols[2] == resourceId){
        console.log("returning true params.id");        
        return true;
      }

      if(symbols[2] == "all") {
        console.log("returning true with all");
        return true;
      }      

    }  
    
    break;
  default:
    console.log("Unknown method!");
    return false;
  }

  return false;
}


