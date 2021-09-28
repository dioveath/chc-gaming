const mongoose = require('../connection');

var Schema = mongoose.Schema;
var TourneySchema = new Schema({
  
  title: String,
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


var Tourney = mongoose.model("Tourney", TourneySchema);

module.exports = Tourney;
