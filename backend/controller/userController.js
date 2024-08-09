
import{creatingUser,loginUser} from "../services/userServices.js"

export async function creatingUserHandler(req,res){
    const userData = req.body;

    try{
        const fetching  = await creatingUser(userData);
        res.status(fetching.status).send(fetching.message);
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
        res.status(fetching.status).send(fetching.message);
      
    }
    catch(err){
        res.status(err.status).send(err.message)
    }

}   