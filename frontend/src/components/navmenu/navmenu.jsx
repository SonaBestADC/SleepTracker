import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import FriendsList from "../friendsList/friendsList";
import Login from "../login/login";
import Signup from "../signup/signup";
// import SleepForm from "../sleepForm/sleepForm";
import "./navmenu.css";

const Navmenu = () => {
  return (
<Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Sleep Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Signup/></Nav.Link>
            <Nav.Link><Login/></Nav.Link>
            <Nav.Link><FriendsList/></Nav.Link>
            {/* <Nav.Link><SleepForm/></Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
  );
};

export default Navmenu;
