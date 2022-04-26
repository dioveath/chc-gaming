
const Joi = require('joi-oid');


const tourneyUpdateSchema = Joi.object().keys({
  title: Joi.string().min(4).max(40),
  description: Joi.string().min(16).max(1024),
  members: Joi.array().items(Joi.object().keys({
    member_id: Joi.objectId().required(),
    reg_id: Joi.string().min(6).required(),
    matches_played: Joi.array().items(Joi.objectId()).required(),
  })),
  managers: Joi.array().items(Joi.objectId()),
  sponserships: Joi.array(),
  prizes: Joi.object(),
  matches: Joi.array().items(Joi.object().keys({
    match_id: Joi.objectId().required(),
    week: Joi.number().required(),
    game: Joi.number().required(),
    match_played: Joi.boolean().required(),
  })),
  registration_fee: Joi.number(),
  start_date: Joi.date().min('9-1-2021'),
  end_date: Joi.date().greater(Joi.ref('start_date')),  

}).min(1);

const tourneySchema = tourneyUpdateSchema.options({ presence: 'required'});

module.exports = {
  tourneySchema,
  tourneyUpdateSchema
};
