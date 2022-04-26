// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (user) => {
  return {
    "id": user._id,
    "first_name": user.first_name,
    "last_name": user.last_name,
    "password": user.password,
    "salt": user.salt,
    "gaming_name": user.gaming_name,
    "email": user.email,
    "phone_number": user.phone_number,
    "address": user.address,
    "dob": user.dob,
    "phone_verified": user.phone_verified,
    "email_verified": user.email_verified,
    "roles": user.roles,
    "createdAt": user.createdAt,
    "updatedAt": user.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
