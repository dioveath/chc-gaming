
const mongoose = require('../connection');

var Schema = mongoose.Schema;
var MatchSchema = new Schema({

  summary: String,
  home_player: String,
  away_player: String,
  home_goals: Array,
  away_goals: Array,
  in_extraTime: Boolean,
  in_penalty: Boolean,
  match_date: Date

}, { timestamps: true });


var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
