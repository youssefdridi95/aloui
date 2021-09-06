const UserRepository = require("../repositories/UserRepository");
var quizz = require("../models/quizz");
var user = require("../models/UserModel");
const mongoose = require("mongoose");
const fs = require("fs");
const TOKEN_PATH = "token.json";
const path = require("path");
const { json } = require("body-parser");

var functions = {
  addQuizz: function (req, res, next) {
    console.log(req.body);
    url = req.protocol + "://" + req.get("host");
    var newquizz = quizz({
      usermail: req.body.usermail,
      fullname: req.body.fullname,
      title: req.body.title,
      description: req.body.description,
      date: new Date().toISOString().slice(0, 10),
      category: req.body.category,
      status: req.body.status,
      image: url + "/uploads/" + req.file.filename,
      duration: req.body.duration,
      questions:JSON.parse(req.body.questions)
    
    });
    newquizz.save(function (err, newquizz) {
      if (err) {
        res.status(403).send({ success: false, msg: err });
      } else {
        res
          .status(200)
          .send({ success: true, msg: "Course successfully adedd!" });
      }
    });
  },
  getquizz: function (req, res) {
    try {
      quizz.find()
      .then(data => {
        res.send(data);
      })
    }
    catch(err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving courses."
          });
    }
  },
  async getOneQuizz(req,res){
    quizz.find({ _id: req.params.id },((err,docs)=>{
        if(!err){
            res.send({ data: docs })
        }
        else{
            res.send("Error")
        }
    }));
}
};



module.exports = functions