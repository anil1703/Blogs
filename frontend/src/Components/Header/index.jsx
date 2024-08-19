import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ReactContext from "../../ReactContext";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header(props) {
  const [username, setUsername] = useState('');
  const [dropdownText, setDropdownText] = useState('');
  const { changeToBlogsBy } = useContext(ReactContext);

  useEffect(() => {
    const userName = Cookies.get('name');
    setUsername(userName);
    const cookieValue = Cookies.get('isAllBlogs');
    setDropdownText(cookieValue === 'true' ? 'All Blogs' : 'Interest Blogs');
  }, []);

  const logingOut = () => {
    Cookies.remove('name');
    Cookies.remove("jwt_token");
    Cookies.remove("email");
    Cookies.remove("intrest");
    const { history } = props;
    history.replace('/login');
    window.location.reload();
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    Cookies.set('isAllBlogs', value);
    changeToBlogsBy(value === 'true');
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#6B728E", color: "white" }} className="bg-body-dark">
      <Container>
        <Navbar.Brand style={{ color: "white", fontWeight: "bold", fontSize: "30px" }} href="#home">Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ color: "white" }} href="#features">Features</Nav.Link>
            <Nav.Link style={{ color: "white" }} href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text style={{ color: "white" }}>
              Signed in as: <a style={{ color: "white", textDecoration: "none" }} href="#login">{username}</a>
            </Navbar.Text>
            <NavDropdown title={dropdownText} id="collapsible-nav-dropdown" style={{ color: "white" }}>
              <NavDropdown.Item value="false" eventKey="myInterestBlogs">My Interest Blogs</NavDropdown.Item>
              <NavDropdown.Item value="true" eventKey="allBlogs">All Blogs</NavDropdown.Item>
            </NavDropdown>
            <button className="logOutButn" onClick={logingOut} style={{ color: "white" }}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(Header);