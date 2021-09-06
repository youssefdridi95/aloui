var mongoose = require('mongoose')
var Schema = mongoose.Schema;
let meetlink = 'https://meet.google.com/quv-czxm-aqb';
var orderSchema = new Schema({

    sendermail: {
        type: String,
        require: false
    },
    sendername: {
        type: String,
        require: false
    },
    senderusername: {
        type: String,
        require: false
    },
    senderpackage: {
        type: String,
        require: false
    },
    courseemail: {
        type: String,
        require: false
    },
    startdate: {
        type: String,
        require: false
    },
    starttime: {
        type: String,
        require: false
    },
    datetime: {
        type: Date,
        require: false
    },
    token: {
        type: String,
        require: false
    },
    date: {
        type: String,
        require: false
    },
    time: {
        type: String,
        require: false,
    },
    coursetitle: {
        type: String,
        require: false
    },
    orderstatus: {
        type: String,
        require: false
    },
    teacherstatus: {
        type: String,
        require: false
    },	
    totalprice: {
        type: Number,
        require: false
    },
    note: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: false
    },
    nbhours: {
        type: Number,
        require: false
    },
    link: {
        type: String,
        require: false,
        default: meetlink
    }
    
   
  
})


module.exports = mongoose.model('orders', orderSchema)