import React, { useEffect, useState } from "react";
import logo from "./logo.svg";

import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import "./App.scss";
import { Job } from "./types/Job";

function App() {
  const [jobData, setJobData] = useState<Job[]>();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/jobData/")
      .then((response) => response.json())
      .then((data) => setJobData(data));
  }, []);

  useEffect(() => {
    console.log(jobData, "hi");
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <InputGroup size="lg" className="mb-3 w-50">
          <InputGroup.Text
            className="pe-0 bg-white rounded-end rounded-pill"
            id="inputGroup-sizing-default"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </InputGroup.Text>
          <Form.Control
            className="border-start-0 shadow-none bg-white rounded-pill rounded-start"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <div className="d-flex justify-content-evenly flex-wrap">
          {jobData?.map((job) => (
            <Card border="light" bg="dark" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title className="text-start">{job.company}</Card.Title>
                <Card.Subtitle className="text-start mb-2 text-muted">
                  {job.title}
                </Card.Subtitle>
                <Card.Link href={job.url}>Job Page</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
