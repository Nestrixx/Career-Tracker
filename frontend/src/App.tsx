import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Card from "react-bootstrap/Card";
import "./App.scss";

function App() {
  const [jobData, setJobData] = useState([]);
  // const [jobName, setJobName] = useState([]);
  // const [jobTitle, setJobTitle] = useState([]);
  // const [jobURL, setJobURL] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/jobData/")
      .then((response) => response.json())
      .then((data) => setJobData(data));
  }, []);

  useEffect(() => {
    console.log(jobData);
  });

  function JobCard() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
          <Card.Link href="#">Card Link</Card.Link>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Card border="light" bg="dark" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Link href="#">Card Link</Card.Link>
          </Card.Body>
        </Card>
      </header>
    </div>
  );
}

export default App;
