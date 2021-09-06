
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    profilepic: {
        type: String,
        required: false,
        default: "http://localhost:8081/uploads/defaultpic.png"
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    balance: {
        type: Number,
        required: false,
        default: 0,
    },
    fcmToken: String,
    chatId: String,
    createdAt: {
        type: Number,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = mongoose.model('User', UserSchema);
