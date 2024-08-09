
import { users_signup } from "../Schema/signupSchema/signupSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


export async function creatingUser(userData) {
    const email = userData.email
    const isCheckingEmail = await users_signup.findOne({email:email})
    if(isCheckingEmail) {
        return { status: 400, message: "Email already exists" }
    }
    else{
        const userDataArray = [];
    
    const hashedPassword = await bcrypt.hash(userData.set_password, 10);
    userData.set_password = hashedPassword;
    
    userDataArray.push(userData);

    const response = await users_signup.insertMany(userDataArray);

     return { status: 200, message: "Congratulations Registred Sucessfully" };
    }

    
}
export async function loginUser(userData) {
    const response = await users_signup.findOne({email:userData.email})

    if(!response){
        return {status:400,message:"User doestn't exists"}
    }

    const checkingPassword = await bcrypt.compare(userData.password,response.set_password)

    if(!checkingPassword){
        return {status:400,message:"Password is incorrect"}
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