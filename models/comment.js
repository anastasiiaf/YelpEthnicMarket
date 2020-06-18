var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
var moment = require('moment');
// Schema setup
var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    username: String,
  },
  created: String,
});

module.exports = mongoose.model('comment', commentSchema);
