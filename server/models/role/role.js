
var buildMakeRole = function(roleValidator){
  
  return ({
    role_name,
    permissions
  } = {}) => {

    var error = roleValidator({
      role_name,
      permissions
    });

    if(error instanceof Object) throw new Error(error.errorList);

    // TODO: permission syntax check

    return Object.freeze({
      getRoleName: () => role_name,
      getPermissions: () => permissions
    });
    
  };

};


module.exports = buildMakeRole;
