const { listClips,
        findClipBy,
        findClipById,
        addClip,
        updateClip,
        deleteClip,
        dropClips
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listClips,
  findClipBy,
  findClipById, 
  addClip,
  updateClip,
  deleteClip, 
  dropClips,
};
