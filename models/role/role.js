
var buildMakeRole = function(roleValidator){
  
  return ({
    role_name,
    permissions
  } = {}) => {

    roleValidator({
      role_name,
      permissions
    });

    return Object.freeze({
      getRoleName: () => role_name,
      getPermissions: () => permissions
    });
    
  };

};


module.exports = buildMakeRole;
