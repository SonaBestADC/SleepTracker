import { useState } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import { useLogin } from "../../hooks/useLogin";
import styles from "./login.module.css";

const Login = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  // const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set up rest of login logic
    const result = await login(email, password);
    console.log(result);
    if (result && !error) {
      setShow(false);
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} centered data-bs-theme="dark" className={styles.backdrop}>
        <Modal.Header className={styles.modal}>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal}>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2">
              <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} value={email} />
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

export default Login;
