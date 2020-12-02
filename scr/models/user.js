const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    resetLink: {
        type: String,
        default: "",
    },
},
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;