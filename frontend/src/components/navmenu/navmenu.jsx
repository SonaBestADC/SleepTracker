import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import FriendsList from "../friendsList/friendsList";

import Signup from "../signup/signup";
// import SleepForm from "../sleepForm/sleepForm";
import "./navmenu.css";

const Navmenu = () => {
  return (
<Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Sleep Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><FriendsList/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default Navmenu;
