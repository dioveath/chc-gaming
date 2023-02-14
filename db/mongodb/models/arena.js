const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');
const paginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const ArenaSchema = new Schema({
  name: { type: String, unique: true },
  handle: { type: String, unique: true },
  owner: { type: Schema.Types.ObjectId },
  category: String,
  appearance: Object,
  about: Object,
  subscriptions: Array,
  billing_details: Object,
  tournaments: Array,
  leaderboards: Array,
  posts: Array,
  members: Array,
  roles: Array,
  bans: Array,
  followers: Array,
  following: Array,
  verified: Boolean
}, { timestamps: true });


ArenaSchema.plugin(uniqueValidator);
ArenaSchema.plugin(paginate);

const Arena = mongoose.model('Arena', ArenaSchema);

module.exports = Arena;
