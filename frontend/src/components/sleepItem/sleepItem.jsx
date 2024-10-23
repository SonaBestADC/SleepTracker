import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { useSleepItemContext } from "../../hooks/useSleepItemContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styles from "./sleepItem.module.css";

const SleepItem = (props) => {
  const { dispatch } = useSleepItemContext();

  const handleClick = async () => {
    const responce = await fetch("/sleepItem/" + props.id, {
      method: "DELETE",
    });
    const json = await responce.json();
    console.log(json);
    if (responce.ok) {
      dispatch({ type: "DELETE_SLEEP_ITEM", payload: json });
    }
  };

  return (
    <Card className={styles.card} >
      <Card.Body>
        <Card.Title>
          <div className={styles.title}>
            {props.date.toLocaleDateString("en-us")}
              <span className={styles.remove} onClick={handleClick}>
                <FontAwesomeIcon icon={faTrashCan}/>
              </span>
          </div>
        </Card.Title>
        <Card.Subtitle className="mb-2">
          Report of Sleep
        </Card.Subtitle>
        <Card.Text>
          {props.desp}
          <ProgressBar variant={props.variant} animated now={props.progress} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SleepItem;
