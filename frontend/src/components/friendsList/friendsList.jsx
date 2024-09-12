import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import FreindItem from "../friendItem/friendItem";

const FriendsList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div onClick={handleShow}>
        Friends List
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Friends List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FreindItem />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FriendsList;
