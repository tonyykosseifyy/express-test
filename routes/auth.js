const mongoose = require("mongoose") ;
const { Schema } = mongoose ;



const userSchema = new Schema({
    name : {
        type: String ,
        required: true 
    } ,
    email : {
        type: String ,
        required: true , 
        max: 255 ,
    }, 
    password: {
        type: String ,
        required: true ,
        max: 1024
    }
}) ;


module.exports = mongoose.model("User" , userSchema ) ;