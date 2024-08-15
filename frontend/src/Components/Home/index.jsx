import Header from "../Header";
import { Component } from "react";
import Cookies from "js-cookie";
import { Audio } from 'react-loader-spinner';

const renderStatus = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
};

class Home extends Component {
  state = { renderStatus: renderStatus.initial, name: "", email: "" };

  gettingDetails = () => {
    this.setState({ renderStatus: renderStatus.loading });

    const returnName = Cookies.get("name");
    const returnEmail = Cookies.get("email");

    if (returnEmail === undefined || returnName === undefined) {
      // Handle error or default state
      this.setState({ renderStatus: renderStatus.error });
    } else {
      this.setState({ name: returnName, email: returnEmail, renderStatus: renderStatus.success });
    }
  };

  componentDidMount() {
    this.gettingDetails();
  }

  loadingModule = () => {
    return (
      <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Audio height="80" width="80" radius="9" color="#6EB8EF" ariaLabel="loading" wrapperStyle wrapperClass />
      </div>
    );
  };

  successModule = () => {
    // Implement logic to display data
    return (
      <div>
        <h1>Welcome, {this.state.name}!</h1>
        <p>Your email: {this.state.email}</p>
        
      </div>
    );
  };

  errorModule = () => {
    // Implement error handling logic
    return (
      <div>
        <h1>Error fetching data</h1>
      </div>
    );
  };

  render() {
    return (
      <>
        <Header />
        {this.state.renderStatus === renderStatus.loading ? this.loadingModule() : null}
        {this.state.renderStatus === renderStatus.success ? this.successModule() : null}
        {this.state.renderStatus === renderStatus.error ? this.errorModule() : null}
      </>
    );
  }
}

export default Home;