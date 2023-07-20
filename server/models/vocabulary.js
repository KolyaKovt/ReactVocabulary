const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  firstLang: {
    type: [String],
    default: []
  },
  secLang: {
    type: [String],
    default: []
  },
  countOfRepetitions: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Vocabulary', vocabularySchema);