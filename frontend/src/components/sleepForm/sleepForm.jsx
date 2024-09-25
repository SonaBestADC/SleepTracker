import { useState } from "react";
import { Form, Button, Container, Modal, Col, Row } from "react-bootstrap";

const SleepForm = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  // add state changes for form

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO check to see if form is filled

    //convert start & end times to datetime so then can find hours slept
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    // Datetime objects for storing date and converting
    const startDate = new Date();
    const endDate = new Date();
    // Setting the hours for the dates
    startDate.setHours(startHours, startMinutes, 0, 0);
    endDate.setHours(endHours, endMinutes, 0, 0);
    const differenceInMillis = endDate - startDate;
    // Hours slept in total. gained from start - end
    const hourSlept = differenceInMillis / (1000 * 60 * 60);
    // Converts the dateString into dateTimeObject to send to db. dont ask why +1
    const dateTimeObject = new Date(date);
    dateTimeObject.setDate(dateTimeObject.getDate() + 1);

    // For progress bar, I say the goal is 8 and therefor it is.
    const progress = hourSlept / 8 * 100;

    let variant =
      progress >= 80
        ? "success"
        : progress >= 60
        ? "primary"
        : progress >= 40
        ? "warning"
        : "danger";

    let desp =
      progress >= 0.8
        ? "You did well"
        : progress >= 0.6
        ? "You could do better"
        : progress >= 0.4
        ? "Could sleep more"
        : "See a doctor";

    console.log(dateTimeObject);
    console.log(date);
    console.log(hourSlept);
    console.log(variant);
    console.log(progress);
    console.log(desp);
    
    const testEmail = "damien@email.com";

    // set as sleep data for post request
    const sleepData = {email: testEmail, desp, date: dateTimeObject, hours_slept: hourSlept, variant, progress};
    console.log(sleepData)

    const responce = await fetch("/sleepItem", {
      method: "POST",
      body: JSON.stringify(sleepData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await responce.json();
    if (!responce.ok) {
      setError(json.message);
    }
    if (responce.ok) {
      // Reset all states for form
      setError(null);
      console.log("New sleep item added");
    }
  };
  return (
    <div>
      <Button onClick={handleShow}>Sleep Form</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sleep Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add onChange={(e)=. setState(e.target.value)} for each form part */}
          {/* Also add value={value} to each Form.Control/look up react bootstrap stuff */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date of Sleep</Form.Label>
              <Form.Control
                type="date"
                placeholder="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="start">
                  <Form.Label>Sleep Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="start"
                    onChange={(e) => setStartTime(e.target.value)}
                    value={startTime}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="end">
                  <Form.Label>Awake time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="end"
                    onChange={(e) => setEndTime(e.target.value)}
                    value={endTime}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SleepForm;
