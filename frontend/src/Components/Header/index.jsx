import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Header(props) { 

  const [username, setUsername] = useState('');
 
  useEffect(() => {
    const userName = Cookies.get('name');
    setUsername(userName);
  }, []);

  const logingOut = () => {
    Cookies.remove('name');
    Cookies.remove("jwt_token");
    Cookies.remove("email");
    Cookies.remove("intrest");
    const { history } = props; 
    history.replace('/login');
    window.location.reload();
  }

  return (
    <Navbar style={{ backgroundColor: "#6B728E", color: "white" }} className="bg-body-dark">
      <Container>
        <Navbar.Brand style={{ color: "white", fontWeight: "bold", fontSize: "30px" }} href="#home">Blogs</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ color: "white" }}>
            Signed in as: <a style={{ color: "white", textDecoration: "none" }} href="#login">{username}</a>
          </Navbar.Text>
          <button onClick={logingOut} className="logOutButn">
            Logout
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(Header);
