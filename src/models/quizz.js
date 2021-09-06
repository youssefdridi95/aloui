var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var quizzSchema = new Schema({
    title: {
    type: String,
    require: false,
  },
  fullname: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: false,
  },
  date: {
    type: String,
    require: false,
  },
  category: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  duration:{
    type:String,
    require:false
  },
 
  user: {
    type: Schema.ObjectId
    },
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
        valid: {
          type: String,
          required: true,
        },
        answers: [
          {
            answerText: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ]
 

});

module.exports = mongoose.model("quizz", quizzSchema);
