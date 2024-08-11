const mongoose = require("mongoose")
const peopleschema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    housenumber: {
        type: String,
        required: true
    },
    missingdate: {
        type: Date,
        default: Date.now,
        required: true
    },
    aadhar: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

var peopleModel=mongoose.model("Peoples",peopleschema)
module.exports=peopleModel