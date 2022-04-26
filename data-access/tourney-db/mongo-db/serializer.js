

const _serializeSingle = (tourney) => {
  return tourney;
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}


module.exports = serializer;
