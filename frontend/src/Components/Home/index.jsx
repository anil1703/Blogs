import React, { Component } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { Audio } from 'react-loader-spinner';
import axios from "axios";
import undraw_Super_thank_you_re_f8bo from "../assests/undraw_Super_thank_you_re_f8bo.png";
import "./index.css";
import ReactContext from "../../ReactContext";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap'; 
import Markdown from 'react-markdown'

const renderStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
  
};

class Home extends Component {
  state = {
    status: renderStatus.initial,
    name: "",
    email: "",
    intrests: [],
    blogsData: [],
    showModal: true,  
    fullscreen: true,
    body:""
  };

  componentDidMount() {
    this.gettingDetails();
  }

  gettingDetails = () => {
    this.setState({ status: renderStatus.loading });

    const name = Cookies.get("name");
    const email = Cookies.get("email");
    const intrestsString = Cookies.get("intrest");

    if (name && email && intrestsString) {
      const intrests = intrestsString.split(',').map(item => item.trim());
      this.setState({ name, email, intrests }, this.fetchBlogsDataBasedOnContext);
    } else {
      this.setState({ status: renderStatus.error });
    }
  };

  fetchBlogsDataBasedOnContext = () => {
    this.contextValue = this.context;
    const { isAllBlogs } = this.contextValue;
    this.fetchBlogsData(isAllBlogs);
  };

  fetchBlogsData = async (isAllBlogs) => {
    try {
      let response;
      if (isAllBlogs) {
        // Using GET method for fetching all blogs
        response = await axios.get("http://localhost:5000/allBlogs");
      } else {
        // Using POST method for fetching blogs based on interests
        const { intrests } = this.state;
        response = await axios.post("http://localhost:5000/myIntrestsBlogs", { intrests });
      }

      this.setState({
        blogsData: response.data,
        status: renderStatus.success,
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      this.setState({ status: renderStatus.error });
    }
  };

  handleShowModal = (fullscreen) => {
    this.setState({ fullscreen, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  writingBody = (e) => {
    this.setState({
      body:e.target.value
    })
  }

  loadingModule = () => (
    <div style={{height:"90vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} className="loading-container">
      <Audio height="80" width="80" radius="9" color="#6EB8EF" ariaLabel="loading" />
    </div>
  );

  blogShower = () => {
    const { blogsData } = this.state;
    console.log(blogsData)
    return (
       <ul className="blogsUl">
        {blogsData.map((eachBlog) => <li className="blogsLi" key={eachBlog._id}>
          <div className="blogsHead">
          <h5>{eachBlog.title}</h5>
            </div>
            <div className="blogsPara">
            <p>{eachBlog.description}</p>
            </div>
            <button className="blogsViewButton">View</button>
        </li>
      )}
      
       </ul>
    )
  }

  successModule = () => {
    const {name,body} = this.state
const {showModal,fullscreen} = this.state
    return (
      <>
      <div className="welcome-banner">
        <div>
        <h1>Welcome {name}!</h1>
        <button 
            style={{ textDecoration: "none" }} 
            className="createBlogButton" 
            onClick={() => this.handleShowModal(true)} // Handle button click
          >
            Create a blog <FaExternalLinkAlt size={15} />
          </button>
        </div>
        
        <div>
        <img style={{ height: "300px" }} src={undraw_Super_thank_you_re_f8bo} alt="Welcome" />
        </div>
        
      
      </div>
      {this.blogShower()}
      {/* Fullscreen Modal */}
      <Modal show={showModal} fullscreen={fullscreen} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="createBlodDiv">

          <div className="one" >
         <div style={{display:"flex",flexDirection:"column"}}>
         <label>TITLE</label>
         <input className="inputStyleCreateBlogs" type="text"/>
         </div>
         <div style={{display:"flex",flexDirection:"column",marginTop:"8px"}}>
          <label>BODY</label>
          <textarea onChange={this.writingBody} className="textareaCreateBlog">

            </textarea>
         </div>
         </div >

         <div className="two">
         
          <Markdown style={{width:"100%",height:"100%"}}>
            {body}
          </Markdown>
         </div>

          </div>
        
         
        </Modal.Body>
      </Modal>
      </>
    );
  };

  errorModule = () => (
    <div className="error-container">
      <h1>Error fetching data</h1>
    </div>
  );

  render() {
    const { status } = this.state;

    return (
      <ReactContext.Consumer>
        {(value) => {
          this.contextValue = value;
          return (
            <>
              <Header />
              <div className="home-margin-setup">
                {status === renderStatus.loading && this.loadingModule()}
                {status === renderStatus.success && this.successModule()}
                {status === renderStatus.error && this.errorModule()}
              </div>
            </>
          );
        }}
      </ReactContext.Consumer>
    );
  }
}

Home.contextType = ReactContext;

export default Home;
