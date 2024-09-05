import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./navmenu.css";

const Navmenu = () => {
  return (
<Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Sleep Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/signup">Sign up</Nav.Link>
            <Nav.Link href="/login">Log in</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default Navmenu;
