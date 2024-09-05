import React from 'react'
import { Form, Button, Container } from "react-bootstrap";

const Login = () => {
    // Add state compatability when login hook is created
  return (
    <Container>
      <Form >
        <h1>Log in</h1>
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
  )
}

export default Login