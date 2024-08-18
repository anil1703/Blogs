import React, { Component } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { Audio } from 'react-loader-spinner';
import axios from "axios";
import undraw_Super_thank_you_re_f8bo from "../assests/undraw_Super_thank_you_re_f8bo.png";
import "./index.css";

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
      this.setState({ name, email, intrests }, this.fetchBlogsData);
    } else {
      this.setState({ status: renderStatus.error });
    }
  };

  fetchBlogsData = async () => {
    try {
      const { intrests } = this.state;
      const response = await axios.post("http://localhost:5000/myIntrestsBlogs", { intrests });

      // Update the state with the fetched data and set render status to success
      this.setState({ blogsData: response.data, status: renderStatus.success });

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
    console.log("re", status)

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
  }
}

export default Home;