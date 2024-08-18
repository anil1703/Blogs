import {creatingBlog,retrivingAllBlogsFromDatabase,retrivingBlogsByInterstsFromDatabase} from "../services/blogServices.js"


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

export async function retrivingAllBlogs (req,res){
    try{
        const fetching = await retrivingAllBlogsFromDatabase();
        res.status(200).json(fetching);
    }
    catch(err){
        res.status(500).send("There is a problem while fetching the blogs");
    }
}

export async function retrivingBlogsByIntersts(req,res){
    const intrests = req.body.intrests;
    try{
        const fetching = await retrivingBlogsByInterstsFromDatabase(intrests);
        res.status(200).json(fetching);
    }
    catch(error){
        res.status(500).send("There is a problem while fetching the Intrests blogs");
    }
}