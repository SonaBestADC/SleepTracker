import { useState, useEffect } from "react";
import { Button, Offcanvas, Form, Row, Col } from "react-bootstrap";
import { useFriendsContext } from "../../hooks/useFriendsContext";
import FreindItem from "../friendItem/friendItem";
import styles from "./friendsList.module.css";

const FriendsList = () => {
  const [show, setShow] = useState(false);
  const [friend, setFriend] = useState("");
  const [error, setError] = useState(null);
  const { friends, dispatch } = useFriendsContext();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchFriendsList = async () => {
      const testEmail = "damien@email.com";
      const responce = await fetch("/friends/" + testEmail);
      const json = await responce.json();
      if (responce.ok) {
        dispatch({ type: "SET_FRIEND", payload: json });
      }
    };
    fetchFriendsList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testEmail = "damien@email.com";
    const friendObject = { user: testEmail, friend };
    console.log(JSON.stringify(friendObject));

    const responce = await fetch("/friends", {
      method: "POST",
      body: JSON.stringify(friendObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await responce.json();
    if (!responce.ok) {
      setError(json.message);
    }

    if (responce.ok) {
      setFriend("");
      setError(null);
      dispatch({ type: "ADD_FRIEND", payload: json });
    }
  };

  return (
    <div>
      <div onClick={handleShow}>Friends List</div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Friends List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <div className={styles.addUserWrapper}>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setFriend(e.target.value)}
                  value={friend}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className={styles.button}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
          {friends &&
            friends.map((friend) => (
              // change freind to friend its misspelled
              <FreindItem username={friend.friend} />
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FriendsList;
