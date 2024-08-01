import {creatingBlog} from "../services/blogServices.js"

export async function creatingBlogHandler (req,res){
    const userData = req.body;
    try{
        const fetching = await creatingBlog(userData);
        res.status(200).send("Blog Created Successfully!");
    }
    catch(err){
        res.status(500).json(err.message);
        console.log("There is a Problem while creating the blog")
        }

}