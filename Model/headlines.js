var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate =require("mongoose-paginate");
var UserSchema = new mongoose.Schema({
            news:String,
            papername:String,
            paperpage:String,
            category:String,
            imagestatus:String,
            postdate:String,
});
UserSchema.plugin(mongoosePaginate);
var Headlines = mongoose.model('Headlines', UserSchema);
module.exports = Headlines;