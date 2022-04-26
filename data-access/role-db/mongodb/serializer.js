

// serializes db role to business model
// for, e.g: _id to id

const _serializeSingle = (role) => {

  return {
    "id": role._id,
    "role_name": role.role_name,
    "permissions": role.permissions
  };

};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data); 
}


module.exports = serializer;
