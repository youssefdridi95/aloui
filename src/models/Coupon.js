const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CouponSchema = new Schema({
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
})

module.exports = mongoose.model('coupon',CouponSchema);
