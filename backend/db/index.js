
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://shashank1623:Ii14Dy2hoPrOpSZk@cluster0.4viaxwn.mongodb.net/logiMove")

//define the schema
const userSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 4,
        maxLength : 60
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    userRole : {
        type : String,
        required : true
    }
})

const captainSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 4,
        maxLength : 60
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    userRole : {
        type : String,
        required : true
    },
    vehicleType : {
        type : String,
        required : true
    }
})


const User = mongoose.model('User',userSchema);
const Captain = mongoose.model('Captain',captainSchema);

module.exports = {
    User,
    Captain
}