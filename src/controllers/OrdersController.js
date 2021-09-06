
const Course = require('../models/CourseModel')
const Coupon = require('../models/Coupon');
const User = require('../models/UserModel');
const mongoose = require('mongoose');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';
const path = require("path");
const express = require('express');
const UserRepository = require('../repositories/UserRepository');
var Order = require('../models/OrderModel')
const nodemailer = require('nodemailer');
let url = "";
let meetlink = "https://meet.google.com/quv-czxm-aqb"
var fs = require('fs');
var handlebars = require('handlebars');
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: '2f6b3d8463454e',
       pass: '5e3b75a49e3ed4'
    }
});
var functions = {
    createOrder: function (req, res, next) {
        console.log(req.body)
                                var newOrder = Order({
                                image: req.body.image,
                                sendermail: req.body.sendermail,
                                sendername: req.body.sendername,
                                senderusername: req.body.senderusername,
                                date: new Date().toISOString().slice(0, 10),
                                time: new Date().toLocaleTimeString(),
                                senderpackage: req.body.senderpackage,
                                courseemail: req.body.courseemail,
                                startdate:  req.body.startdate,
                                starttime: req.body.starttime,
                                token: req.body.token,
                                coursetitle: req.body.coursetitle,
                                orderstatus: req.body.orderstatus,
                                teacherstatus: req.body.teacherstatus,
                                totalprice: req.body.totalprice,
                                note: req.body.note,  
                                nbhours : req.body.nbhours,
                                datetime: req.body.datetime,
                                                     
                            });
                            newOrder.save(function (err, newOrder) {
                                if (err) {
                                     res.status(403).send({success: false, msg: 'Failed to save!'})
                                }
                                else {
                                     res.status(200).send({success: true, msg: 'Order successfully added!',orderid:newOrder._id})
                                     console.log(newOrder);
                                     
                                     readHTMLFile(__dirname + '/orderconfirmation.html', function(err, html) {
                                        var template = handlebars.compile(html);
                                        var replacements = {
                                            _id : newOrder._id,
                                            coursetitle: newOrder.coursetitle,
                                            image : newOrder.image,
                                            senderusername : newOrder.senderusername,
                                            senderpackage : newOrder.senderpackage,
                                            nbhours : newOrder.nbhours,
                                            startdate : newOrder.startdate,
                                            starttime : newOrder.starttime,
                                            note : newOrder.note,
                                            totalprice : newOrder.totalprice,
                                            link: 'https://meet.google.com/quv-czxm-aqb',
                                        };
                                        var htmlToSend = template(replacements);
                                        var mailOptions = {
                                            from: 'my@email.com',
                                            to : 'some@email.com',
                                            subject : 'Order confirmation',
                                            html : htmlToSend
                                         };
                                        transport.sendMail(mailOptions, function (error, response) {
                                            if (error) {
                                                console.log(error);
                                                callback(error);
                                            }
                                        });
                                    });
                      
            
                
            }
}); },

createCourseEvent: (req, res) => {
    
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        Course.findOne({_id: req.params.id},async (err, course) => {
            if (course) {
                const user =await UserRepository.findUserById(req.body.userId);
                const datetime = req.body.datetime;
                const orderid=req.body.orderid;
                authorize(JSON.parse(content), createEvent, course, user,datetime,orderid );
            }
        })

    });
    res.send({message: 'event sent successfully'});
},

async getteacherorders(req,res){
    Order.find({ courseemail : req.params.email },((err,docs)=>{
        if(!err){
            res.send({ data: docs })
        }
        else{
            res.send("Error")
        }
    }));
},

async getlearnerorders(req,res){
    Order.find({ sendermail : req.params.email },((err,docs)=>{
        if(!err){
            res.send({ data: docs })
        }
        else{
            res.send("Error")
        }
    }));
},

updatestatus: function(req,res,next)
{
    console.log(req.body)
    const {_id,orderstatus,teacherstatus,sendermail} = req.body
    Order.findByIdAndUpdate(_id, {orderstatus: orderstatus,teacherstatus:teacherstatus},
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
successMessage: "Order status has been updated!",
});
readHTMLFile(__dirname + '/orderstatus.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
        senderusername : newOrder.sendermail,
        orderstatus : orderstatus,
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
        from: 'my@email.com',
        to : 'some@email.com',
        subject : 'test subject',
        html : htmlToSend
     };
    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        }
    });
});
} 
    }  ); 
 
}
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 * @param course
 * @param user
 * @param datetime
 * @param orderid
 */
function authorize(credentials, callback, course, user,datetime,orderid) {
    console.log('authorize');
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        console.log(oAuth2Client);
        callback(oAuth2Client, course, user, datetime,orderid);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    console.log('getAccessToken');
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'online',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param course
 * @param user
 * @param datetime
 * @param orderid
 */
function  createEvent(auth,course,user,datetime,orderid) {
    console.log('course = '+ course + 'user = '+ user + 'datetime = '+ datetime + 'orderid='+orderid);
    const attendees = [
        {'email': 'mohamediheb.aloui@esprit.tn'},
        {'email': 'mohamediheb.aloui@esprit.tn', 'organizer': true}
    ]
    auth.credentials.key = "AIzaSyCFmWXqIVeNDQBDtNf8oH5ereU9c9rg1mg";
    const calendar = google.calendar({version: 'v3', auth});
    const event = {
        'summary': `Invitation to Learnly course ${course.title}`,
        'location': 'Tunis, Tunisia',
        'description': `${course.description}`,
        'start': {
            'dateTime': datetime,
            'timeZone': 'Africa/Tunis'
        },
        'end': {
            'dateTime': '2021-08-28T17:00:00-07:00',
            'timeZone': 'Africa/Tunis'
        },
        'attendees': attendees,
        'conferenceData': {
            'createRequest': {
                'requestId': "tester",
                'conferenceSolutionKey': {'type': "hangoutsMeet"},
            },
        }
    };

    calendar.events.insert({
        
        auth: auth,
        calendarId: 'ofhjsis07cebl74j79lcfgqct0@group.calendar.google.com',
        resource: event,
        key: 'AIzaSyCFmWXqIVeNDQBDtNf8oH5ereU9c9rg1mg',
        sendNotifications: true,
        conferenceDataVersion: 1
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data;     
 
        });
  
}



module.exports = functions