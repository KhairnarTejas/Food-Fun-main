const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const passportLocalmongoose=require('passport-local-mongoose');

const userSchema=new Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        
    },
    username: {
        type: String,
        required: true,
        unique: false, // Set unique to false to remove the unique index
    },
    
});
mongoose.plugin(passportLocalmongoose)

module.exports=mongoose.model("User",userSchema);

