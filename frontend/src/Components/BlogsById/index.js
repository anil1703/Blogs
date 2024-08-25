import "./index.css"
import axios from "axios";
import { Component } from "react";
import Markdown from 'react-markdown'

const renderStatus = {
    initial: "INITIAL",
    loading: "LOADING",
    success: "SUCCESS",
    error: "ERROR",
    
  };

class BlogsById extends Component{
    state = {renderingStatus:renderStatus.initial,blog:{}}

    componentDidMount(){
        this.getBlog()
    }

    getBlog = () => {
        const {match} = this.props;
        const {params} = match;
        const {id} = params;

        axios.get(`https://blogs-xmvh.onrender.com/blog/${id}`)
        .then(response => {
            console.log(response)
            this.setState({renderingStatus:renderStatus.success, blog: response.data})
            })
            .catch(error => {
                this.setState({renderingStatus:renderStatus.error})
                })
        
    }

    render(){
        const {blog} = this.state

        return(
                <div className="blogsssDIv">
                <h1>{blog.title}</h1> <span style={{color:"gray"}}>{blog.createdAt}</span>
                <Markdown>{blog.description}</Markdown>
                </div> )
    }
}

export default BlogsById