var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var quizzStatSchema = new Schema({
  quizz: {
    type: Schema.ObjectId,
  },
  answersStat: {
    type: Number,
    required: true,
  },
  candidates: {
    user: {
      type: Schema.ObjectId,
    },
  },
});

module.exports = mongoose.model("quizzStat", quizzStatSchema);
