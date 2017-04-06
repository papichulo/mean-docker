var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

module.exports = mongoose.model('BlogPost', new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], index: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: User }
}));
