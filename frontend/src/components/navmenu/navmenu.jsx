import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import FriendsList from "../friendsList/friendsList";
import { useLogout } from "../../hooks/useLogout";
import { useFriendsContext } from "../../hooks/useFriendsContext";
import styles from "./navmenu.module.css";

const Navmenu = () => {
  const { logout } = useLogout();
  const { dispatch } = useFriendsContext();

  const handleClick = () => {
    logout();
    dispatch({ type: "SET_FRIEND", payload: null });
  };

  return (
    //bg="dark" data-bs-theme="dark"
    <Navbar  sticky="top" className={styles.nav} >
      <Container>
        <Navbar.Brand className={styles.white}>Sleep Tracker</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className={styles.gray}>
            <FriendsList />
          </Nav.Link>
          <Nav.Link className={styles.gray}>
            <span onClick={handleClick}>Logout</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navmenu;
