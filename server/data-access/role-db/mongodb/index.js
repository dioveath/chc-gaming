
const Role = require('../../../db/mongodb/models/role');
const serialize = require('./serializer');
const makeRole = require('../../../models/role/index').makeRole;
const makeUpdateRole = require('../../../models/role/index').makeUpdateRole;
const errorFormatter = require('./errorFormatter');


function listRoles(){
  return Role.find({}).then(serialize).catch(errorFormatter);
}


function findRoleBy(prop, val){
  if(prop == 'id') prop = '_id';
  return Role.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findRoleById(id){
  return Role.findById(id).then(serialize).catch(errorFormatter);
}

function addRole(roleInfo){
  var role = makeRole(roleInfo);

  var newRole = {
    role_name: role.getRoleName(),
    permissions: role.getPermissions()
  };

  return Role.create(newRole).then(serialize).catch(errorFormatter);
}

async function updateRole(id, updateRoleInfo){
  if(!id)
    throw new Error("You must supply id!");

  const validUpdateRoleData = await makeUpdateRole(updateRoleInfo);

  // if error is not thrown, then we can update with updateRoleInfo in database
  return Role.findByIdAndUpdate(id, updateRoleInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteRole(id){
  return Role.findByIdAndDelete(id).then(res => {
    if(!res) {
      throw {
        name: 'Error',
        code: 11011, // custom error code
        _id: id,
      };
    }
    return {
      id: res._id.toString()
    };
  }).catch(errorFormatter);
}


function dropRoles(){
  return Role.deleteMany().catch(errorFormatter);
}


module.exports = {
  listRoles,
  findRoleBy,
  findRoleById,
  addRole,
  updateRole,
  deleteRole,
  dropRoles
};
