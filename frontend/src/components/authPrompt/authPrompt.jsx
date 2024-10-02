import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Signup from "../signup/signup";
import Login from "../login/login";
import styles from "./authPrompt.module.css";

const AuthPrompt = () => {
  const [showPromptModal, setShowPromptModal] = useState(true); 
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const [showSignupModal, setShowSignupModal] = useState(false); 


  const handleLoginClick = () => {
    setShowPromptModal(false); 
    setShowLoginModal(true);   
  };

  const handleSignupClick = () => {
    setShowPromptModal(false); 
    setShowSignupModal(true); 
  };

  useEffect(() => {
    setShowPromptModal(true);
  }, []);

  return (
    <>
      <Modal show={showPromptModal} backdrop="static" keyboard={false} centered data-bs-theme="dark" className={styles.backdrop}>
        <Modal.Header className={styles.modal}>
          <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal}>
          <p>Please log in or sign up to continue.</p>
          <Button variant="primary" onClick={handleLoginClick} className="me-2">
            Log In
          </Button>
          <Button variant="secondary" onClick={handleSignupClick}>
            Sign Up
          </Button>
        </Modal.Body>
      </Modal>

      {showLoginModal && <Login show={showLoginModal} setShow={setShowLoginModal} />}

      {showSignupModal && <Signup show={showSignupModal} setShow={setShowSignupModal} />}
    </>
  );
};

export default AuthPrompt;
