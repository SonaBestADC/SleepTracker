import { useState } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import { useFriendsContext } from "../../hooks/useFriendsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import FriendItem from "../friendItem/friendItem";
import styles from "./friendsList.module.css";

const FriendsList = () => {
  const [show, setShow] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [error, setError] = useState(null);
  const { friends, dispatch } = useFriendsContext();
  const { user } = useAuthContext();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    const fetchFriendsList = async () => {
      try {
        const response = await fetch(`/friends/${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch friends list");
        }
        const json = await response.json();
        dispatch({ type: "SET_FRIEND", payload: json });
        setError(null);
        
      } catch (err) {
        console.error("Error fetching friends list:", err);
        setError("No friends listed");
      }
    };
    
    fetchFriendsList();
  }

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
    try{

      const friendUsername = await getFriendUsername(friendEmail);

    console.log(friendUsername);
    const friendObject = { user_email: user.email, user_username: user.username,  friend_email: friendEmail, friend_username: friendUsername};
    console.log(JSON.stringify(friendObject));

    const responce = await fetch("/friends", {
      method: "POST",
      body: JSON.stringify(friendObject),
      headers: {
        "Content-Type": "application/json",
      },
    }, [user]);

    const json = await responce.json();
    if (!responce.ok) {
      setError(json.message);
      return;
    }

    if (responce.ok) {
      setFriendEmail("");
      setError(null);
      dispatch({ type: "ADD_FRIEND", payload: json });
    }
    }catch (err){
      setError("An error has occured");
    }
  };

  return (
    <div>
      <div onClick={handleShow} className={styles.gray}>Friends List</div>
      <Offcanvas show={show} onHide={handleClose} className={styles.friendsList} data-bs-theme="dark">
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
            {error && <div className="error">{error}</  div>}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FriendsList;
