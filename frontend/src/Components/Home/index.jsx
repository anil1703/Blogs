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
    renderStatus: renderStatus.initial,
    name: "",
    email: "",
    intrests: [],
    blogsData: [],
  };

  componentDidMount() {
    this.gettingDetails();
  }

  gettingDetails = () => {
    this.setState({ renderStatus: renderStatus.loading });

    const name = Cookies.get("name");
    const email = Cookies.get("email");
    const intrestsString = Cookies.get("intrest");

    if (name && email && intrestsString) {
      const intrests = intrestsString.split(',').map(item => item.trim());
      this.setState({ name, email, intrests, renderStatus: renderStatus.success }, this.fetchBlogsData);
    } else {
      this.setState({ renderStatus: renderStatus.error });
    }
  };

  fetchBlogsData = () => {
    const { intrests } = this.state;
    console.log("Ani",intrests)
    console.log(intrests)
    axios.get("http://localhost:5000/myIntrestsBlogs",intrests)
      .then(response => {
        this.setState({ blogsData: response.data });
      })
      .catch(error => {
        console.error(error);
        this.setState({ renderStatus: renderStatus.error });
      });
  };

  loadingModule = () => (
    <div className="loading-container">
      <Audio height="80" width="80" radius="9" color="#6EB8EF" ariaLabel="loading" />
    </div>
  );

  successModule = () => (
    <div className="welcome-banner">
      <h1>Welcome {this.state.name}!</h1>
      <img style={{ height: "300px" }} src={undraw_Super_thank_you_re_f8bo} alt="Welcome Image" />
    </div>
  );

  errorModule = () => (
    <div className="error-container">
      <h1>Error fetching data</h1>
    </div>
  );

  render() {
    const { renderStatus } = this.state;

    return (
      <>
        <Header />
        <div className="home-margin-setup">
          {renderStatus === renderStatus.loading && this.loadingModule()}
          {renderStatus === renderStatus.success && this.successModule()}
          {renderStatus === renderStatus.error && this.errorModule()}
        </div>
      </>
    );
  }
}

export default Home;
