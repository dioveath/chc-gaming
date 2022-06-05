const Joi = require('joi-oid');


const tourneyUpdateSchema = Joi.object().keys({
  title: Joi.string().min(4).max(40),
  description: Joi.string().min(16).max(1024),
  status: Joi.string().valid('pending', 'published', 'canceled'), // pending | published | canceled
  medias: Joi.array().items(Joi.object().keys({
    // image | video | poster (poster is just image to be shown off)
    media_type: Joi.string().valid('image', 'video', 'poster').required(),
    media_url: Joi.string().required(),
  })),

  members: Joi.array().items(Joi.object().keys({
    member_id: Joi.objectId().required(),
    reg_id: Joi.string().min(6).required(),
    // status for registration, pending | accepted | rejected
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'cancelled').required(),
    registered_date: Joi.date().required(),
    fee_paid: Joi.boolean().required()
  })),

  managers: Joi.array().items(Joi.objectId()),
  sponserships: Joi.array().items(Joi.object().keys({
    name: Joi.string(),
    description: Joi.string().min(8),
    logo_url: Joi.string(),
    website_url: Joi.string(),
    sponser_value: Joi.number()
  })),
  
  prizes: Joi.array().items(Joi.object().keys({
    prize_title: Joi.string().required(),
    prize_description: Joi.string().required(),
    prize_value: Joi.number().required()
  })),
  matches: Joi.array().items(Joi.object().keys({
    // match id is ref to match  
    match_id: Joi.objectId().required(),
    // match_tourney_id is the match id for this tournmanet,
    // for e.g. For tourney Round 1 & Match no. 2, this will be 'M1.2'
    match_tourney_id: Joi.string().required(),
    match_played: Joi.boolean().required(),
  })),

  hypes: Joi.array().items(Joi.objectId()), // like likes system for tournament
  game: Joi.string(),
  max_players: Joi.number(),
  location: Joi.string(),
  registration_fee: Joi.number(),
  live_link: Joi.string(),
  registration_end_date: Joi.date(),
  start_date: Joi.date().min('9-1-2021'),
  end_date: Joi.date().greater(Joi.ref('start_date')),  

}).min(1);

const tourneySchema = tourneyUpdateSchema.options({ presence: 'required'});

module.exports = {
  tourneySchema,
  tourneyUpdateSchema
};
