
import{creatingUser,loginUser} from "../services/userServices.js"

export async function creatingUserHandler(req,res){
    const userData = req.body;

    try{
        const fetching  = await creatingUser(userData);
        res.status(200).send("Congratulations Registered Sucessfully.");
    }
    catch(err){
        res.status(400).json(err);
        console.log("There is a problem while registration")
    }
    
}

export async function loginUserController(req,res){
    const userData = req.body;
    try{
        const fetching = await loginUser(userData);
        res.status(200).send(fetching.message);
        console.log(fetching.message.jwt_token)
    }
    catch(err){
        res.status(fetching.status).send(fetching.message)
    }

}   