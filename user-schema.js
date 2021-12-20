const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fullName : String,
    mobile: Number,
    username:String,
    password:String,
    confirmPassword:String
});

var User = mongoose.model('User',UserSchema);

module.exports = User;