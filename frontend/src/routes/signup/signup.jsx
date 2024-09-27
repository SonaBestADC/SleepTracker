import { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
const Signup = () => {
    const [email, setEmail] = useState();
    const [username, setusername] = useState()
    const [password, setpassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Email Address" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
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
    </>
  );
};

export default Signup;
