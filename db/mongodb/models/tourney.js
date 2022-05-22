const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var TourneySchema = new Schema({
  title: { type: String, unique: true },
  description: String,
  status: String,
  medias: Array,
  members: Array,
  managers: Array,
  sponserships: Array,
  prizes: Array,
  matches: Array,
  game: String,
  max_players: Number,
  location: String,
  live_link: String,
  start_date: Date,
  end_date: Date,
  registration_fee: Number
}, { timestamps: true });


TourneySchema.plugin(uniqueValidator);
var Tourney = mongoose.model("Tourney", TourneySchema);

module.exports = Tourney;
