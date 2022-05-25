const clipAccess = require('../../data-access/clip-db/index');
const makeGetClip = require('./get-clip');
const makeCreateClip = require('./create-clip');
const makeDeleteClip = require('./delete-clip');
const makeListClips = require('./list-clips');
const makeUpdateClip = require('./update-clip');

const getClip = makeGetClip(clipAccess);
const createClip = makeCreateClip(clipAccess);
const deleteClip = makeDeleteClip(clipAccess);
const listClips = makeListClips(clipAccess);
const updateClip = makeUpdateClip(clipAccess);

const clipController = {
  getClip,
  createClip,
  updateClip, 
  deleteClip,
  listClips,
};

module.exports = clipController;
