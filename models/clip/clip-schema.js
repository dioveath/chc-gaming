const Joi = require('joi-oid');

const clipUpdateSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30),
  author: Joi.objectId(),
  privacy: Joi.string().valid('public', 'followers', 'private'),
  video_url: Joi.string().max(2048),
  video_meta: Joi.object().keys({
    type: Joi.string().valid('video/mp4', 'video/webm'),
    length: Joi.number().max(120000), // milliseconds
    size: Joi.number().max(100000000), // bytes
    width: Joi.number().max(2160),
    height: Joi.number().max(3840)
  }),
  likes: Joi.array().items(Joi.objectId()),
  comments: Joi.array().items(Joi.string())
}).min(1);

const clipSchema = clipUpdateSchema.options({ presence: 'required'});

module.exports = {
  clipSchema,
  clipUpdateSchema
};
