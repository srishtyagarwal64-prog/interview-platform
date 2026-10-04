import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
name: {
type:String,
required: true
},
email:{
type:String,
unique: true,
required: true
},
 refreshToken: { 
        type: String, 
        select: false
    },
    credits:{
        type:Number,
        default:100
    },
password:{
type:String, 
required: true
}},
{timestamps:true})

const User = mongoose.model("User" , userSchema)

export default  User;