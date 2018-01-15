var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
        file:{
            type: String,
        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required: true
        },
        location:{
            type:String,
            required:true
        },
        report:{
            type:String,
            required:true
        }
});
var Witness = mongoose.model('Witness', UserSchema);
module.exports = Witness;