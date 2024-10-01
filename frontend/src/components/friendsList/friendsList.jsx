import { useState, useEffect } from "react";
import { Button, Offcanvas, Form, Row, Col } from "react-bootstrap";
import { useFriendsContext } from "../../hooks/useFriendsContext";
import FriendItem from "../friendItem/friendItem";
import styles from "./friendsList.module.css";

const FriendsList = () => {
  const [show, setShow] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [error, setError] = useState(null);
  const { friends, dispatch } = useFriendsContext();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchFriendsList = async () => {
      const testEmail = "damien@email.com";
      try {
        const response = await fetch(`/friends/${testEmail}`);
        if (!response.ok) {
          throw new Error("Failed to fetch friends list");
        }
        const json = await response.json();
        console.log("Fetched friends list:", json);
        console.log("Fetched friends context:", friends);
        dispatch({ type: "SET_FRIEND", payload: json });
        
      } catch (error) {
        console.error("Error fetching friends list:", error);
      }
    };
    
    fetchFriendsList();
  }, []);
  
  

  const getFriendUsername = async (friendEmail) => {
    const response = await fetch("/" + friendEmail);
    const json = await response.json();

    if (!response.ok) {
      return null; 
    }
    if (response.ok) {
      return json.username;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testEmail = "damien@email.com";
    const testUsername = "SonaBestADC";
    const friendUsername = await getFriendUsername(friendEmail);

    console.log(friendUsername);
    const friendObject = { user_email: testEmail, user_username: testUsername,  friend_email: friendEmail, friend_username: friendUsername};
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
      setFriendEmail("");
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
                  onChange={(e) => setFriendEmail(e.target.value)}
                  value={friendEmail}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className={styles.button} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Form>
          {friends &&
            friends.map((friend) => (
              <FriendItem key={friend.id} friendEmail={friend.friend_email} friendUsername={friend.friend_username} id={friend.id}/>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FriendsList;
