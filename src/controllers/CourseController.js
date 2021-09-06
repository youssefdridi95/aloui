const UserRepository = require('../repositories/UserRepository');
var Course = require('../models/CourseModel');
var User = require('../models/UserModel');
const mongoose = require('mongoose');
const fs = require('fs');
let url = "";
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';
const path = require("path");
const Coupon = require('../models/Coupon');

var functions = {


modifyCourse: function(req,res,next)
{
    url = req.protocol + "://" + req.get("host");
    console.log(req.body)
    const {_id,title,description,category,available,basicdesc,basichours,basicprice,standarddesc,standardhours,standardprice,premiumdesc,premiumhours
    ,premiumprice} = req.body
    console.log(_id)
    Course.findByIdAndUpdate(_id, {title: title,description:description,category:category,available:available,image:url + "/uploads/" + req.file.filename,basicdesc:basicdesc,basichours:basichours,basicprice:basicprice,standarddesc:standarddesc,standardhours:standardhours,standardprice:standardprice,premiumdesc:premiumdesc,premiumhours:premiumhours,premiumprice:premiumprice},
    function (err, docs) {
if (err){
return res.json({
error: true,
errorMessage: "Error Updating, Check again.",

})
}
else{
return res.json({
success: true,

})
} 
    }  ); 
 
}
,


async delete(req, res) {
    try {

        const id = req.params.id;

        await Course.findOneAndDelete({ _id: ObjectId(id)});

        return res.json({
            success: true
        })

    } catch (e) {
        return res.json({
            error: true,
            errorMessage: e
        })
    }
},

addCourse: function (req, res, next) {
console.log(req.body)
url = req.protocol + "://" + req.get("host");
                        var newCourse = Course({
                        usermail: req.body.usermail,
                        fullname: req.body.fullname,
                        title: req.body.title,
                        description: req.body.description,
                        date: new Date().toISOString().slice(0, 10),
                 
                        time: new Date().toLocaleTimeString(),
                        category: req.body.category,
                        available: req.body.available,
                        image: url + "/uploads/" + req.file.filename,
                        basicdesc: req.body.basicdesc,
                        basichours: req.body.basichours,
                        basicprice: req.body.basicprice,
                        standarddesc: req.body.standarddesc,
                        standardhours: req.body.standardhours,
                        standardprice: req.body.standardprice,
                        premiumdesc: req.body.premiumdesc,
                        premiumhours: req.body.premiumhours,
                        premiumprice: req.body.premiumprice,
					
                    });
                    newCourse.save(function (err, newCourse) {
                        if (err) {
                             res.status(403).send({success: false, msg: 'Failed to save!'})
                        }
                        else {
                             res.status(200).send({success: true, msg: 'Course successfully adedd!'})
                        }
                    })
    },

    findCourseByCategory: (req, res) => {
        if (req.query.category) {
            try {
                Course.find({
                    "category.label": req.query.category
                }).then((payload) => {
                    res.send(payload);
                });
            } catch (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving courses by category."
                });
            }
        } else {
            res.status(400).send({
                message: "Category query param cannot be null"
            })
        }
    }
    ,

  
async getonecourse(req,res){
    Course.find({ _id: req.params.id },((err,docs)=>{
        if(!err){
            res.send({ data: docs })
        }
        else{
            res.send("Error")
        }
    }));
},
	
	getcourse: function (req, res) {
        try {
         Course.find()
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
		

      async getteachercourses(req,res){
        Course.find({ usermail : req.params.email },((err,docs)=>{
            if(!err){
                res.send({ data: docs })
            }
            else{
                res.send("Error")
            }
        }));
    },

    purchaseCourse: (req, res) => {
        console.log('hah'+req.params.user);
        Course.find({ _id: req.params.course }).then((course) => {
        User.find({ _id: req.params.user }).then((user) => {
                console.log(user);
                const coupon = {
                    user: mongoose.Types.ObjectId(user._id),
                    course: mongoose.Types.ObjectId(course._id),
                    code: (+new Date).toString(14)
                }
                console.log(coupon);
                course.coupon.push(coupon);
                course.save(course);
                sendEmail(user, course, coupon);
                res.send(course);
            })
        })
    },
 

    getcourse: function (req, res) {
        try {
            Course.find()
                .then(data => {
                    res.send(data);
                })
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving courses."
            });
        }
    },

    // courses?categories=aa
    findCourseByCategory: (req, res) => {
        if (req.query.category) {
            try {
                Course.find({
                    "category.label": req.query.category
                }).then((payload) => {
                    res.send(payload);
                });
            } catch (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving courses by category."
                });
            }
        } else {
            res.status(400).send({
                message: "Category query param cannot be null"
            })
        }
    },
    findCourseById: (req, res) => {
        Course.findOne({_id: req.params.id}).then((payload) => {
            res.send(payload);
        })
    },
    rateCourse: (req, res) => {
        const currentDate = new Date().getTime().toString();
        const rating = req.body.rating;
        rating.timeStamp = currentDate;
        const score = req.body.rating.value;
        const comment = req.body.comment;
        comment.timeStamp = currentDate;
        console.log(comment);
        if (score >= 0 && score <= 5) {
            Course.findOne({_id: req.params.id}).then((payload) => {
                const updatedScore = getRatingsSum(payload, score);
                payload.ratings.push(rating);
                payload.ratingAvg = updatedScore;
                if (comment.content.trim() !== "") {
                    payload.comments.push(comment);
                }
                console.log(`update score is : ${updatedScore}`);
                payload.save(payload);
                res.send(payload);
            })
        } else {
            res.status(400).send({
                message: "Score must be within the range of [0, 5]"
            })
        }
    },
    restoreCourses: (req, res) => {
        Course.remove({}, (data) => {
            res.send({
                message: "courses have been restored"
            })
        });
    },
    
    purchaseCourse: (req, res) => {
        Course.findOne({_id: req.params.course}).then((course) => {
            User.findOne({_id: req.params.user}).then((user) => {
                console.log(`user id is ${user._id}`);
                const coupon = {
                    user: mongoose.Types.ObjectId(user._id),
                    course: mongoose.Types.ObjectId(course._id),
                    code: (+new Date).toString(14)
                }
                course.coupon.push(coupon);
                course.save(course);
                sendEmail(user, course, coupon);
                res.send(course);
            })
        })
    },
    streamContent: (req, res) => {
        Course.findOne({_id: req.params.id}, (err, payload) => {
            if (payload) {
                res.setHeader("content-type", "image/png");
                fs.createReadStream(payload.imagePath).pipe(res);
            }
        })
    },
    streamCategoryContent: (req, res) => {
        console.log('invoked')
        console.log(req.params.label);
        Course.findOne({"category.label": req.params.label}, (err, payload) => {
            console.log(payload);
            if (payload) {
                res.setHeader("content-type", "image/png");
                console.log('mitsketa')
                fs.createReadStream(payload.category.img).pipe(res);
            }
        })
    },
    fetchCategories: (req, res) => {
        let categories = [];
        try {
            Course.find().then((payload) => {
                payload.forEach((course) => {
                    if (categories.find((category) => category.label === course.category.label) === undefined) {
                        categories.push(course.category);
                    }
                });
                res.json(categories);
            });
        } catch (exception) {
            console.log(exception);
        }

    }


    
    
    
}
function sendEmail(user, course, coupon) {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
           user: '2f6b3d8463454e',
           pass: '5e3b75a49e3ed4'
        }
    }
    );

    var mailOptions = {
        from: 'mohamediheb.aloui@esprit.tn',
        to: user.email,
        subject: `purchase email confirmation for learnily course ${course.title}`,
        text: `Greetings , the coupon password for your course ${course.title} is ${coupon.code} `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function getRatingsSum(course, score) {
    return ((course.ratings.reduce((acc, obj) => {
        return acc + obj.value;
    }, 0)) + score) / (course.ratings.length + 1);
}

function generateCouponCode() {
    return (+new Date).toString(14);
}









module.exports = functions