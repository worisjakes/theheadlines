var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
        address:{
            type: String,
            required:true
        },
        name:{
            type: String,
            required:true
        },
        papertype:{
            type:String,
            required:true
        },
        postdate:{
            type:Date,
            default: Date.now()
        },
        phonenum:{
            type:Number,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        gender:{
            type:String,
            required: true,
        },
        deliveryLocation: []
});
var Order = mongoose.model('Order', UserSchema);
module.exports = Order;