var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    audioname:String,
    postdate:String,
});
var Audio = mongoose.model('Audio', UserSchema);
module.exports = Audio;