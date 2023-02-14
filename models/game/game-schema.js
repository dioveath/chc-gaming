const Joi = require('joi-oid');

// Platform
// 0 - Unknown
// 1 - Android
// 2 - IOS
// 3 - Browser
// 4 - Other

// NOTE: Lots of todos here
// This will be created after game integration
// How can we integrate a game? Need to answer this

const gameSchema = Joi.object().keys({
  name: Joi.string().min(3).max(64).required(),
  handle: Joi.string().alphanum().min(3).max(32).required(),
  platform: Joi.number().min(0).max(4),
});
