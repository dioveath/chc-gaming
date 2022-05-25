// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (clip) => {
  return {
    "id": clip._id,
    "title": clip.title,
    "author": clip.author,
    "privacy": clip.privacy,
    "video_url": clip.video_url,
    "video_meta": clip.video_meta,
    "likes": clip.likes,
    "comments": clip.comments
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
