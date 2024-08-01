import {blogs} from "../Schema/bolgSchema/blogSchema.js"

export async function creatingBlog(userData){
    const array = []
    array.push(userData)
    const response = await blogs.insertMany(array)
    return response
}