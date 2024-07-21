import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        },
        
        gender:{
            type:String,
            required:true
        },
        intrests:{
            type:Array,
            required:true
        },
        set_password:{
            type:String,
            required:true
        },
},{timestamps:true})

const users_signup = mongoose.model("users",signupSchema)
export {users_signup};