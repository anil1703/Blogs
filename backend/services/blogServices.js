import {blogs} from "../Schema/bolgSchema/blogSchema.js"

export async function creatingBlog(userData){
    const array = []
    array.push(userData)
    const response = await blogs.insertMany(array)
    return response
}

export async function retrivingAllBlogsFromDatabase(){
    const response = await blogs.find()
    return response
}

export async function retrivingBlogsByInterstsFromDatabase(intrests){
    const response = await blogs.find({intrests: {$in:intrests}})
    console.log("hhi",response)
    return response
    
}