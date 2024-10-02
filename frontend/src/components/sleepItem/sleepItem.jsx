import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { useSleepItemContext } from "../../hooks/useSleepItemContext"; 
import styles from "./sleepItem.module.css";

const SleepItem = (props) => {
  const { dispatch } = useSleepItemContext()
  

  const handleClick = async () => {
    const responce = await fetch("/sleepItem/" + props.id, {
      method: "DELETE"
    })
    const json = await responce.json();
    console.log(json)
    if(responce.ok){
      dispatch({type: "DELETE_SLEEP_ITEM", payload: json})
    }
  }

  return (
    <Card className={styles.card} data-bs-theme="dark">
      <Card.Body>
        <Card.Title>{props.date.toLocaleDateString("en-us")}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Report of Sleep</Card.Subtitle>
        <Card.Text>
          {props.desp}
          <ProgressBar variant={props.variant} animated now={props.progress}/>
        </Card.Text>
      </Card.Body>
      <span onClick={handleClick}>delete</span>
    </Card>
  );
};

export default SleepItem;
