// uses mongoose implementation of findClip, listClips, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Clip = require('../../../db/mongodb/models/clip');
const serialize = require('./serializer');
const makeClip = require('../../../models/clip/index').makeClip;
const makeUpdateClip = require('../../../models/clip/index').makeUpdateClip;
const errorFormatter = require('./errorFormatter');


function listClips(){
  return Clip.find({}).then(serialize).catch(errorFormatter);
}

function findClipBy(prop, val){
  if(prop === 'id') prop = '_id';
  return Clip.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findClipById(id){
  return Clip.findById(id).then(serialize).catch(errorFormatter);
}

async function addClip(clipInfo){
  // defaults
  var clip = await makeClip(clipInfo);

  var newClip = {
    title: clip.getTitle(),
    author: clip.getAuthor(),
    privacy: clip.getPrivacy(),
    video_url: clip.getVideoUrl(),
    meta_data: clip.getVideoMeta(),
    likes: clip.getLikes(),
    comments: clip.getComments()
  };

  return Clip.create(newClip).then(serialize).catch(errorFormatter);
}


async function updateClip(id, updateClipInfo){
  if(!id) 
    throw new Error("You must supply id!");

  var clipData = await Clip.findById(id);  
  if(clipData === null) throw new Error("No Clip with id: " + id);

  // validate the update info 
  await makeUpdateClip(updateClipInfo);

  // if error is not thrown, then we can update with updateClipInfo in database
  return Clip.findByIdAndUpdate(id, updateClipInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteClip(id){
  return Clip.findByIdAndDelete(id)
    .then(res => {
      if(!res)
        throw {
          name: 'Error',
          code: 11011, // custom error code
          _id: id, 
        };
      return {
        id: res._id.toString(),
      };
    }).catch(errorFormatter);
}


function dropClips(){
  return Clip.deleteMany().catch(errorFormatter);
}


module.exports = {
  listClips,
  findClipBy,
  findClipById, 
  addClip,
  updateClip, 
  deleteClip, 
  dropClips
};
