const buildMakeClip = require('./clip');
const clipSchema = require('./clip-schema').clipSchema;
const clipUpdateSchema = require('./clip-schema').clipUpdateSchema;
const clipValidator = require('../validator/')(clipSchema);
const clipUpdateValidator = require('../validator/')(clipUpdateSchema);

const makeClip = buildMakeClip(clipValidator);
const makeUpdateClip = buildMakeClip(clipUpdateValidator);

module.exports =  {
  makeClip,
  makeUpdateClip
};
