import axios from "axios";
import { Component } from "react";

const renderStatus = {
    initial: "INITIAL",
    loading: "LOADING",
    success: "SUCCESS",
    error: "ERROR",
    
  };

class BlogsById extends Component{
    state = {renderingStatus:renderStatus.initial,blog:[]}

    componentDidMount(){
        this.getBlog()
    }

    getBlog = () => {
        const {match} = this.props;
        const {params} = match;
        const {id} = params;

        axios.get(`http://localhost:5000/blog/{id}`)
        .then(response => {
            this.setState({renderingStatus:renderStatus.success, blog: response.data})
            })
            .catch(error => {
                this.setState({renderingStatus:renderStatus.error})
                })
        
    }

    render(){
        return(
            <h1>hi</h1>)
    }
}

export default BlogsById