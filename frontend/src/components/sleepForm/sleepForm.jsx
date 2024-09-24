import { useState } from "react";
import { Form, Button, Container, Modal, Col, Row } from "react-bootstrap";

const SleepForm = () => {
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <Button onClick={handleShow}>Sleep Form</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sleep Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date of Sleep</Form.Label>
              <Form.Control type="date" placeholder="date" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="start">
                  <Form.Label>Sleep Start Time</Form.Label>
                  <Form.Control type="time" placeholder="start" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="end">
                  <Form.Label>Awake time</Form.Label>
                  <Form.Control type="time" placeholder="end" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SleepForm;
