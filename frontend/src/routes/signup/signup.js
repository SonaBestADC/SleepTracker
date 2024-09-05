import React from "react";
import { Form, Button, Container } from "react-bootstrap";

const Signup = () => {
  // Add state compatability when signup hook is created
  return (
    <Container>
      <Form >
        <h1>Sign Up</h1>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
