import { useState } from "react";
import { Form, Button, Container, Modal, Col, Row } from "react-bootstrap";

const Login = ({ show, setShow }) => {
  // Add state compatability when login hook is created

  // const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set up rest of login logic
    setShow(false);
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2">
              <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
