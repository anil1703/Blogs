import {creatingBlog,retrivingAllBlogsFromDatabase,retrivingBlogsByInterstsFromDatabase,retrivingBlogByIdFromDatabase} from "../services/blogServices.js"


export async function creatingBlogHandler (req,res){
    const userData = req.body;
    console.log(userData);
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

export async function retrivingBlogById(req,res){
    const blogId = req.params.id;
    console.log("Jaffa",blogId)
    try{
        const fetching = await retrivingBlogByIdFromDatabase(blogId);
        res.status(200).json(fetching);
        }
        catch(error){
            res.status(500).send("There is a problem while fetching the blog");
            }
}