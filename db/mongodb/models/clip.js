const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');
const paginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;
var ClipSchema = new Schema({
  title: String,
  author: Schema.Types.ObjectId,
  privacy: String,
  video_url: { unique: true, type: String},
  video_meta: Schema.Types.ObjectId,
  likes: Array,
  comments: Array
}, { timestamps: true });

ClipSchema.plugin(uniqueValidator);
ClipSchema.plugin(paginate);
var Clip = mongoose.model('Clip', ClipSchema);

module.exports = Clip;
