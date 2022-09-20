import "./App.css";
import { useEffect, useState } from "react";
import { Button, Row, Col, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { gtToken, onMessageListener } from "./firebase";
import Home from "./Components/Home";
import Payment from "./Components/Payment";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import DemoNotifications from "./Components/DemoNotifications";
// import { Route, Routes } from "react-router-dom";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  const [token, setToken] = useState("");

  useEffect(() => {
    gtToken(setToken);
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

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, lcoation, path }) => {
        alert(`${message}`);
      });
    }
  });
  const link = from([
    errorLink,
    new HttpLink({ uri: "http://20.235.104.53:8080/query" }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="payment" element={<Payment></Payment>} />
          <Route
            path="demonotifications"
            element={<DemoNotifications></DemoNotifications>}
          />
        </Routes>
        {/* <Toast
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
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small style={{ width: "280px" }}></small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast> */}
        {/* <header className="App-header">
          {token != "" && <h1> Notification permission enabled 👍🏻 </h1>}
          {token == "" && <h1> Need notification permission ❗️ </h1>}
          {token != "" && (
            <div>
              <h2> Generated Token: </h2>
              {token}
            </div>
          )} */}

        {/* <Button onClick={() => setShow(true)}>Show Push Notification</Button> */}
        {/* </header> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
