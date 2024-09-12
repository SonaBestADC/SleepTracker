import React from "react";
import { Row, Col, Card, Container, Image } from "react-bootstrap";
import placeholder from "../../images/placeholder.png";

const FreindItem = () => {
  return (
    <Container>
      <Row>
        <Col>User Name</Col>
        <Col xs={8}>User Information</Col>
      </Row>
    </Container>
  );
};

export default FreindItem;
