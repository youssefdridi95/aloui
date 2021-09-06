var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var courseSchema = new Schema({
   
    usermail: {
        type: String,
        require: false
    },
    title: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    date: {
        type: String,
        require: false
    },
    time: {
        type: String,
        require: false
    },
    category: {
            type: String,
            required: false
    },
    available: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: false
    },
    basicdesc: {
        type: String,
        require: false
    },	
    basichours: {
        type: Number,
        require: false
    },
    basicprice: {
        type: Number,
        require: false
    },
    standarddesc: {
        type: String,
        require: false
    },	
    standardhours: {
        type: Number,
        require: false
    },
    standardprice: {
        type: Number,
        require: false
    },
    premiumdesc: {
        type: String,
        require: false
    },	
    premiumhours: {
        type: Number,
        require: false
    },
    premiumprice: {
        type: Number,
        require: false
    },
    ratings: [{
        value: {
            type: Number,
            required: false
        },
         ratedBy: {
            type: String,
             required: false
         },
         timeStamp: {
            type: String,
             required: false
         }
     }],
     ratingAvg: {
       type: Number,
         required: false,
       default: 0
     },
     comments: [{
        content: {
            type: String,
            required: false
        },
        commentedBy: {
            type: String,
            required: false
        },
        timeStamp: {
            type: String,
            required: false
        }
    }],
    coupon: [{
        code: {
            type: String,
            default: (+new Date).toString(14)
        },
        course: {
            type: Schema.ObjectId,
        },
        user: {
            type: Schema.ObjectId
        }
    }]
    
    
  
})


module.exports = mongoose.model('courses', courseSchema)