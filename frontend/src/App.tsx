import { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import "./App.scss";

import { Job } from "./types/Job";

import { format, parseJSON } from "date-fns";

import "./fonts/nemoy/nemoy.light.otf";

import emblem from "./images/logo/emblem.png";
import { Link } from "react-router-dom";

function App() {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/jobData/")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a: Job, b: Job) => {
          const appliedDateA = new Date(a.date).valueOf();
          const appliedDateB = new Date(b.date).valueOf();

          return appliedDateB - appliedDateA;
        });
        setJobData(data);
      });
  }, []);

  const updateSearchInput = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const jobDateFormatHandler = (date: string) => {
    return format(parseJSON(date), "PP");
  };

  const filteredJobList = () => {
    if (searchInput.length === 0) {
      return jobData;
    }
    return jobData.filter((job) =>
      job.company.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <div className="App">
      <div className="App-header">
        <header>
          <img src={emblem} alt="logo" />
          <div className="linkOptions">
            <Link className="text-light fs-1 font-face-gm link" to="/stats">
              More Info
            </Link>
            <Link className="text-light fs-1 font-face-gm link" to="/home">
              Home Page
            </Link>
          </div>
          <p className="fs-3 font-face-gm">
            Number of jobs applied to{" "}
            <span className="fw-bold">{jobData.length} </span>
          </p>
          <p className="fs-1 font-face-gm">My Application List</p>
        </header>
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
            onChange={(event) => updateSearchInput(event.target.value)}
            className="border-start-0 shadow-none bg-white rounded-pill rounded-start"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <div className="w-100">
          <div className="cardWrapper">
            {filteredJobList().map((job) => (
              <Card
                className="mb-2"
                border="light"
                bg="dark"
                style={{ width: "18rem" }}
              >
                <Card.Body>
                  <Card.Title className="text-truncate fs-4 text-start">
                    {job.company}
                  </Card.Title>
                  <Card.Subtitle className="text-truncate text-start mb-2 text-muted">
                    {job.title}
                  </Card.Subtitle>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <Card.Link className="text-start fs-4" href={job.url}>
                      Job Page
                    </Card.Link>
                    <div className="fs-5">{jobDateFormatHandler(job.date)}</div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
