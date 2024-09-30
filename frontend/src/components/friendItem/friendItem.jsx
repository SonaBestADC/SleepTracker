import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

//  TODO add context to this

const FreindItem = (props) => {
  const [message, setMessage] = useState("");
  const [friendUsername, setFriendUsername] = useState("")



  useEffect(() => {
    setMessage("");
    const fetchFriendSleepItem = async () => {
      const responce = await fetch("/sleepItems/" + props.username);
      const json = await responce.json();
      let total = 0;
      let count = 0;
      json.map(sleepItem => {
        total += sleepItem.progress;
        count++;
      });
      let avg = total/count;
      if(avg >= 66.6){
        setMessage(":)");
      }else if(avg >= 33.3){
        setMessage(":/");
      }else{
        setMessage(":(");
      }
    }

    const fetchFriendUser = async () => {
      const responce = await fetch("/" + props.username);
      const json = await responce.json();
      if(responce.ok){
        setFriendUsername(json.username);
      }
    }

    fetchFriendSleepItem();
    fetchFriendUser();

  }, []);



  return (
    <Container>
      <Row>
        <Col>{friendUsername}</Col>
        <Col>{message}</Col>
      </Row>
    </Container>
  );
};

export default FreindItem;
