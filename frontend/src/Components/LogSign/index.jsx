import React, { Component } from "react";
import authenticationImage from "../assests/Authentication.png";
import "./index.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class LogSign extends Component {
  state = {
    setShow: false,
  };

  handleClose = () => {
    this.setState({
      setShow: false,
    });
  };

  handleShow = () => {
    this.setState({
      setShow: true,
    });
  };

  render() {
    const { setShow } = this.state;
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
            <button onClick={this.handleShow}>Signup</button>
            <button onClick={this.handleShow}>Login</button>
            <Modal show={setShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Signup</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password@#^!$%!"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Area of Intrests</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="games,movies,politics    (Make sure separated by ',')"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                 SignUp
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default LogSign;
