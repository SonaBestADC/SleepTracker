import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import FriendsList from "../friendsList/friendsList";
import { useLogout } from "../../hooks/useLogout";

import Signup from "../signup/signup";
// import SleepForm from "../sleepForm/sleepForm";
import "./navmenu.css";

const Navmenu = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Sleep Tracker</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <FriendsList />
          </Nav.Link>
          <Nav.Link>
            <span onClick={handleClick}>Logout</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navmenu;
