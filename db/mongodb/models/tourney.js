const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var TourneySchema = new Schema({
  title: { type: String, unique: true },
  description: String,
  members: Array,
  managers: Array,
  sponserships: Array,
  prizes: Map,
  matches: Array,
  registration_fee: Number,
  start_date: Date,
  end_date: Date

}, { timestamps: true });


TourneySchema.plugin(uniqueValidator);
var Tourney = mongoose.model("Tourney", TourneySchema);

module.exports = Tourney;
