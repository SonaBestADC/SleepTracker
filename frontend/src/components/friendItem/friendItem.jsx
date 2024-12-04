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
      if (avg >= 85) {
        setMessage("🌟 Excellent sleep!");
      } else if (avg >= 70) {
        setMessage("😊 Good rest!");
      } else if (avg >= 55) {
        setMessage("🙂 Decent, but could improve.");
      } else if (avg >= 40) {
        setMessage("😐 Needs better sleep.");
      } else if (avg >= 25) {
        setMessage("😟 Poor sleep—focus on rest.");
      } else {
        setMessage("😞 Very poor sleep. Take action.");
      }
      
    }

    fetchFriendSleepItem();

  }, []);


  return (
<Container data-bs-theme="dark">
  <Row>
    <Col md={3}>{friendUsername}</Col>
    <Col md={9}>{message}</Col>
  </Row>
</Container>

  )
}

export default FriendItem