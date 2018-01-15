var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate =require("mongoose-paginate");
var UserSchema = new mongoose.Schema({
        worldnews:String,
        images:String,
        postdate:String,
});
UserSchema.plugin(mongoosePaginate);
var World = mongoose.model("World", UserSchema);
module.exports = World;