const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var TourneySchema = new Schema({
  title: { type: String, unique: true },
  description: String,
  rules: String,
  status: String,
  hypes: Array,
  game: String,
  max_players: Number,
  location: String,
  platforms: Array,

  registration_fee: Number,
  registration_open_date: Date,
  registration_end_date: Date,
  start_date: Date,
  end_date: Date,

  medias: Array,
  streams: Array,
  registrations: Array,
  participants: Array,
  managers: Array,
  sponserships: Array,
  prizes: Array,
  tourney_data: Object,
  final_standings: Array

}, { timestamps: true });


TourneySchema.plugin(uniqueValidator);
var Tourney = mongoose.model("Tourney", TourneySchema);

module.exports = Tourney;
