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
  const { isAllBlogs, changeToBlogsBy } = useContext(ReactContext);

  useEffect(() => {
    const userName = Cookies.get('name');
    setUsername(userName);
  }, []);

  useEffect(() => {
    // Update the dropdown text based on the isAllBlogs context
    Cookies.set('isAllBlogs', isAllBlogs.toString());
  }, [isAllBlogs]);

  const logingOut = () => {
    Cookies.remove('name');
    Cookies.remove("jwt_token");
    Cookies.remove("email");
    Cookies.remove("intrest");
    Cookies.remove("id");
    Cookies.remove("isAllBlogs");
    const { history } = props;
    history.replace('/login');
    window.location.reload();
  };

  const handleDropdownChange = (value) => {
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
            
          </Nav>
          <Nav>
            <Navbar.Text style={{ color: "white" }}>
              Signed in as: <a style={{ color: "white", textDecoration: "none" }} href="#login">{username}</a>
            </Navbar.Text>
            <NavDropdown
              title={isAllBlogs ? 'All Blogs' : 'Interest Blogs'}
              id="collapsible-nav-dropdown"
              style={{ color: "white" }}
              onSelect={handleDropdownChange}
            >
              <NavDropdown.Item eventKey="false">My Interest Blogs</NavDropdown.Item>
              <NavDropdown.Item eventKey="true">All Blogs</NavDropdown.Item>
            </NavDropdown>
            <button className="logOutButn" onClick={logingOut} style={{ color: "white" }}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(Header);
