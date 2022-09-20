import React, { useEffect, useState } from "react";
import { gtToken, onMessageListener } from "../firebase";
import { Button, Row, Col, Toast } from "react-bootstrap";
const DemoNotifications = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  const [token, setToken] = useState("");

  useEffect(() => {
    gtToken(setToken);
    document.title = "Notifications";
  }, []);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div>
      <Toast
        className="d-inline-block m-1"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          minWidth: 250,
        }}
      >
        <Toast.Header style={{ color: "white", backgroundColor: "#bcd101" }}>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small style={{ width: "280px" }}></small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      {/* <header className="App-header">
  {token != "" && <h1> Notification permission enabled 👍🏻 </h1>}
  {token == "" && <h1> Need notification permission ❗️ </h1>}
  {token != "" && (
    <div>
      <h2> Generated Token: </h2>
      {token}
    </div>
  )} */}

      <Button onClick={() => setShow(true)}>Show Push Notification</Button>
    </div>
  );
};

export default DemoNotifications;
