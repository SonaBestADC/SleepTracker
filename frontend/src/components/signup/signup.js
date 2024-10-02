import { useState } from "react";
import { Form, Button, Container, Modal, Col, Row } from "react-bootstrap";
import { useSignup } from "../../hooks/useSignup";

const Signup = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signup(email, username, password);
    console.log(result);
    if (result && !error) {
      setShow(false); // Close modal only if signup is successful
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} centered data-bs-theme="dark" className="text-light">
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2">
              <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} value={email} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form>
          {error && <div className="error">{error}</div>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Signup;
