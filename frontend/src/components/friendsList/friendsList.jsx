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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const friendUsername = await getFriendUsername(friendEmail);
      if (!friendUsername) {
        setError("User not found");
        return; // Exit the function if username is null
      }


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

  const getFriendUsername = async (friendEmail) => {
    try {
      const response = await fetch(`/${friendEmail}`); // Ensure this endpoint exists and returns { username }
      if (!response.ok) throw new Error("User not found");
      const json = await response.json();
      return json.username;  // Ensure the response has `username` property
    } catch (error) {
      console.error("Error fetching friend username:", error);
      return null;
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
