const Joi = require("joi-oid");

const arenaSchema = Joi.object()
      .keys({
    name: Joi.string().min(3).max(48).required(),
    handle: Joi.string().alphanum().min(3).max(32).required(),
    category: Joi.string()
      .valid(
        "Brand",
        "Organizer",
        "Community",
        "Content Creator",
        "Publisher",
        "Developer"
      )
          .default("Organizer"),

        owner: Joi.objectId().required(),

    appearance: Joi.object({
      logo: Joi.string().uri().default(""),
      banner: Joi.string().uri().default(""),
    }).default({}),

    about: Joi.object()
      .keys({
        description: Joi.string().max(4096).default(""),
        email: Joi.string().email().default(""),
        phone_number: Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .default(""),
        established: Joi.date()
          .min("1-1-1970")
          .max("1-1-2030")
          .default(() => new Date().toLocaleDateString()), // MM-DD-YYYY
        highlight_video: Joi.string().uri().default(""),
        social_links: Joi.array()
          .items(
            Joi.object().keys({
              social_media: Joi.string()
                .valid("youtube", "instagram", "facebook", "twitch", "twitter")
                .required(),
              profile_url: Joi.string().required(),
              social_handle: Joi.string().required(), // for example @dioveath0 is instagram short handler
            })
          )
          .default([]),
      })
      .default({}),

    subscriptions: Joi.array().default([]).items(Joi.object()), // daily scrims, weekly tourney access
    billing_details: Joi.object().default({}),

    tournaments: Joi.array().items(Joi.object()).default([]),
    leaderboards: Joi.array().items(Joi.object()).default([]),
    posts: Joi.array().items(Joi.object()).default([]),

    members: Joi.array().items(Joi.object()).default([]),
    roles: Joi.array().items(Joi.object()).default([]),
    bans: Joi.array().items(Joi.object()).default([]),

    followers: Joi.array().items(Joi.objectId()).default([]),
    following: Joi.array().items(Joi.objectId()).default([]),
    verified: Joi.boolean().default(false),
  })
  .min(1);


const arenaUpdateSchema = arenaSchema.fork(['name', 'handle'], (schema) => schema.optional());

module.exports = {
  arenaSchema,
  arenaUpdateSchema,
};
