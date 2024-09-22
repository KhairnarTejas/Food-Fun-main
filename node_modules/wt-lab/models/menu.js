const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelMenuSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required: true,
    },
    image:{
        url: String,
        filename: String,
    },
    price:{
        type:Number,
        required: true,
    },
    speciality:{
        type:String,
        required:true,
    },
    foodType:{
        type:String,
        enum: ['veg', 'non-veg','maharashtrian'], // Only allows 'veg' or 'non-veg'
        required:true,
    },
});

const HotelMenu = mongoose.model("HotelMenu", hotelMenuSchema);
module.exports = HotelMenu;
