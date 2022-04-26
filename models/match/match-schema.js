

const Joi = require('joi');

/* 
* Match Entity
* It is single match information entity.  
*/


const matchUpdateSchema = Joi.object().keys({
  summary: Joi.string().min(10).max(512),
  // isHomeAway: Joi.boolean(), // for matches that weren't played either home rather on another stadium for. e.g - Final of UEFA
  home_player: Joi.string().max(255),
  away_player: Joi.string().max(255),
  home_goals: Joi.array().items(Joi.number()),
  away_goals: Joi.array().items(Joi.number()),
  in_extraTime: Joi.boolean(),
  in_penalty: Joi.boolean(),
  match_date: Joi.date().min('9-1-2021'), // TODO: change to match_date, as match can be scheduled for later
});

const matchSchema = matchUpdateSchema.options({ presence: 'required'});


module.exports = {
  matchSchema,
  matchUpdateSchema
};
