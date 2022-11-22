const mongoose = require("mongoose")
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
    {
        username:{type:String, required:true, unique:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        type:{type:String, required:true},
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
          }],
        isAdmin:{
            type: Boolean,
            default: true,
        },  
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);