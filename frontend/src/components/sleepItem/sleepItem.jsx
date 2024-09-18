import React from "react";
import { Card } from "react-bootstrap";
import styles from "./sleepItem.module.css";

const SleepItem = () => {
  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title>9/18/24</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Lorem, ipsum.</Card.Subtitle>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          voluptate eveniet quasi praesentium, ullam autem accusamus omnis
          suscipit magnam accusantium alias quod illo veniam iste. Adipisci
          sequi a repudiandae? Perferendis.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SleepItem;
