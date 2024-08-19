import React, { Component } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { Audio } from 'react-loader-spinner';
import axios from "axios";
import undraw_Super_thank_you_re_f8bo from "../assests/undraw_Super_thank_you_re_f8bo.png";
import "./index.css";
import ReactContext from "../../ReactContext";

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

  loadingModule = () => (
    <div className="loading-container">
      <Audio height="80" width="80" radius="9" color="#6EB8EF" ariaLabel="loading" />
    </div>
  );

  successModule = () => {
    const { blogsData, name } = this.state;

    return (
      <div className="welcome-banner">
        <h1>Welcome {name}!</h1>
        <img style={{ height: "300px" }} src={undraw_Super_thank_you_re_f8bo} alt="Welcome" />
        {blogsData.map((blog, index) => (
          <div key={index}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
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
