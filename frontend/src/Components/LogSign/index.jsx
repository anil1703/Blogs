import React, { Component } from "react";
import authenticationImage from "../assests/Authentication.png";
import "./index.css";
import {withRouter} from "react-router-dom"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "js-cookie"


class LogSign extends Component {
  state = {
    showSignup: false,
    showLogin: false,
    email: "",
    password: "",
    name: "",
    gender: "",
    intrests: "",
  };

  componentDidMount(){
    this.tokenChecking();
  }

  tokenChecking = () => {
    const token = Cookies.get('jwt_token');
    console.log("hii",this.props)
    if (token!==undefined) {
      this.props.history.push('/');
      }
    
  }


  siginingUp = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      gender : this.state.gender,
      intrests: this.state.intrests.split(',').map(eachItem => eachItem.trim()),
      set_password: this.state.password,


    }
    axios.post("http://localhost:5000/sign_up",data)
    .then((response) => {
      
      

      alert(response.data)
      this.setState({
        showSignup: false,
      })

    })
    .catch((err) => {
      alert(err.response.data)
      this.setState({
        showSignup: false,
      })
    })
  }

  sucessfulLogin = (response) => {
    Cookies.set("jwt_token",response.data.jwt_token,{expires:30})
      Cookies.set("name",response.data.name,{expires:30})
      Cookies.set("email",response.data.email,{expires:30})
      const convertArrayToSnake = response.data.intrest.map(item => item).join(',');
      console.log(convertArrayToSnake)
      Cookies.set("intrest",convertArrayToSnake,{expires:30})
      console.log("Bye",this.props)
      const {history} = this.props
      history.replace("/")
      window.location.reload();
  }

  loginging = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    axios.post("http://localhost:5000/login",data)
    .then((response) => {
      
      this.sucessfulLogin(response)
      
      

    })
    .catch((err) => {
      alert(err.response.data)
    })
  }

  handleCloseSignup = () => {
    this.setState({
      showSignup: false,
    });



    
  };

  handleShowSignup = () => {
    this.setState({
      showSignup: true,
    });
  };

  handleCloseLogin = () => {
    this.setState({
      showLogin: false,
    });
  };

  handleShowLogin = () => {
    this.setState({
      showLogin: true,
    });
  };

  enteringUsername = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  enteringMail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  creatingPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  enteringInterests = (event) => {
    this.setState({
      intrests: event.target.value,
    });
  };

  selectingGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  

  render() {
    const { showSignup, showLogin } = this.state;
    return (
      <div className="auth-home">
        <div>
          <img
            className="auth-image"
            src={authenticationImage}
            alt="Authentication"
          />
        </div>
        <div className="auth-text-content">
          <h1>Welcome to the Blogs</h1>
          <p>
            If you have already signed up, you can login. If this is the first time you are entering the blogs site, then you can sign up.
          </p>
          <div className="auth-buttons-div">
            <button onClick={this.handleShowSignup}>Signup</button>
            <button onClick={this.handleShowLogin}>Login</button>

            {/* Signup Modal */}
            <Modal show={showSignup} onHide={this.handleCloseSignup}>
              <Modal.Header closeButton>
                <Modal.Title>Signup</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formSignupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      autoFocus
                      onChange={this.enteringUsername}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSignupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={this.enteringMail}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSignupPassword">
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password@#^!$%!"
                      onChange={this.creatingPassword}
                    />
                  </Form.Group>

                  {/* Gender Radio Buttons */}
                  <Form.Group className="mb-3" controlId="formSignupGender">
                    <Form.Label>Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="Male"
                        name="gender"
                        type="radio"
                        value="male"
                        onChange={this.selectingGender}
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="gender"
                        type="radio"
                        value="female"
                        onChange={this.selectingGender}
                      />
                      
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSignupInterests">
                    <Form.Label>Area of Interests</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="games, movies, politics (Make sure separated by ',')"
                      onChange={this.enteringInterests}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseSignup}>
                  Close
                </Button>
                <Button style={{backgroundColor:"#6EB8EF"}} variant="primary" onClick={this.siginingUp}>
                  SignUp
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Login Modal */}
            <Modal show={showLogin} onHide={this.handleCloseLogin}>
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formLoginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      onChange={this.enteringMail}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      onChange={this.creatingPassword}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseLogin}>
                  Close
                </Button>
                <Button style={{backgroundColor:"#6EB8EF"}} variant="primary" onClick={this.loginging}>
                  Login
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LogSign);
