
import { users_signup } from "../Schema/signupSchema/signupSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


export async function creatingUser(userData) {
    const userDataArray = [];
    
    const hashedPassword = await bcrypt.hash(userData.set_password, 10);
    userData.set_password = hashedPassword;
    
    userDataArray.push(userData);

    const response = await users_signup.insertMany(userDataArray);

    return response;
}
export async function loginUser(userData) {
    const response = await users_signup.findOne({email:userData.email})

    if(!response){
        return {status:401,message:"User doestn't exists"}
    }

    const checkingPassword = await bcrypt.compare(userData.password,response.set_password)

    if(!checkingPassword){
        return {status:401,message:"Password is incorrect"}
    }

    const setPayLoad = {
        id:response._id,
        email:response.email,
        name:response.name,
    }

    const jwtToken = jwt.sign(setPayLoad,"lkjhgfdsa",{expiresIn:"24hr"})

    return {status:200,message:{
        jwt_token:jwtToken,
        name:response.name,
        email:response.email} }
}