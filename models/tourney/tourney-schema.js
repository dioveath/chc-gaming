const Joi = require('joi-oid');

const tourneyUpdateSchema = Joi.object().keys({
  title: Joi.string().min(4).max(40),
  description: Joi.string().min(16).max(2048),
  rules: Joi.string().min(16).max(2048),
  status: Joi.string().valid('pending', 'published', 'canceled'),
  hypes: Joi.array().items(Joi.objectId()), // like likes system for tournament
  game: Joi.string(),
  max_players: Joi.number(),
  location: Joi.string(),
  platforms: Joi.array().items(Joi.string().valid('pc', 'mobile', 'ps4', 'xbox360', 'ps5', 'other', 'not_video_game')),

  registration_fee: Joi.number(),
  registration_open_date: Joi.date().min('9-1-2021'),
  registration_end_date: Joi.date().min(Joi.ref('registration_open_date')),
  start_date: Joi.date().min(Joi.ref('registration_end_date')),
  end_date: Joi.date().min(Joi.ref('start_date')),  


  medias: Joi.array().items(Joi.object().keys({
    media_type: Joi.string().valid('image', 'video', 'poster', 'logo').required(),
    media_url: Joi.string().required(),
  })),

  streams: Joi.array().items(Joi.object().keys({
    platform: Joi.string().min(3).max(255), // Youtube, Twitch, Facebook
    url: Joi.string().min(3).max(512)
  })),

  registrations: Joi.array().items(Joi.object().keys({
    registrant_id: Joi.objectId().required(),
    registration_id: Joi.string().min(6).required(),
    name: Joi.string().min(3).max(255),
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'cancelled').required(),
    registered_date: Joi.date().required(),
    fee_paid: Joi.boolean().required(),
    type: Joi.string().valid('team', 'solo')
  })),

  participants: Joi.array().items(Joi.object().keys({
    participant_id: Joi.objectId().required(),
    name: Joi.string().min(3).max(255),
    status: Joi.string().valid('ready', 'checkedin', 'playing', 'forfeit'),
    created_at: Joi.date(),
    type: Joi.string().valid('team', 'solo')
  })),

  managers: Joi.array().items(Joi.object().keys({
    user_id: Joi.objectId(),
    role: Joi.string().valid('moderator', 'editor', 'admin'),
  })),

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

  // structures, stages, rounds, matches
  tourney_data: Joi.object(),

  // matches: Joi.array().items(Joi.object().keys({
  //   // match id is ref to match  
  //   match_id: Joi.objectId().required(),
  //   // match_tourney_id is the match id for this tournmanet,
  //   // for e.g. For tourney Round 1 & Match no. 2, this will be 'M1.2'
  //   match_tourney_id: Joi.string().required(),
  //   match_played: Joi.boolean().required(),
  // })),

  final_standings: Joi.array().items(Joi.object().keys({
    id: Joi.string().min(6).required(),
    position: Joi.number(),
    rank: Joi.number(),
    participant: {
      id: Joi.string().min(6).required(),
      name: Joi.string().min(3).max(255),
    },
  })),

}).min(1);

const tourneySchema = tourneyUpdateSchema.options({ presence: 'required'});

module.exports = {
  tourneySchema,
  tourneyUpdateSchema
};
