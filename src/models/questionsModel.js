
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var questionSchema = new Schema({


questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      questionOrder: {
        type: Number,
        required: true,
      },
      answers: [
        {
          answerText: {
            type: String,
            required: true,
          },
          valid: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ]
});

module.exports = mongoose.model("question", questionSchema);