import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    tag :{
        type: String,
        required: true
    },
    
    createdByuser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    
    }
}, {timestamps:true})

const blogs = mongoose.model("blogs",blogSchema)

export {blogs}