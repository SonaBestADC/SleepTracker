import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";


const FriendItem = ({ friendEmail, friendUsername, id }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
    const fetchFriendSleepItem = async () => {
      const responce = await fetch(`/sleepItems/${friendEmail}`);
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

    fetchFriendSleepItem();

  }, []);

  return (
    <Container>
      <Row>
        <Col>{friendUsername}</Col>
        <Col>{message}</Col>
        {id}
      </Row>
    </Container>
  )
}

export default FriendItem