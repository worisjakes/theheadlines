var mongoose = require('mongoose');
Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
        username:{
            type: String,
            required:true
        },
        password:{
            type: String,
            required:true
        }
});
var Admin = mongoose.model('Admin', UserSchema);
module.exports = Admin;