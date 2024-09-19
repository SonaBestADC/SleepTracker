import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import styles from "./sleepItem.module.css";

const SleepItem = (props) => {
  // Variant Rules:
  // Red = 0 - 25
  // Yellow = 25 - 50
  // Blue = 50 - 85
  // Green = 85 - 100
  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>{props.date}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Report of Sleep</Card.Subtitle>
        <Card.Text>
          {props.desp}
          <ProgressBar variant={props.variant} animated now={props.progress}/>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SleepItem;
