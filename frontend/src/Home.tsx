import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Home.scss";

import "./fonts/nemoy/nemoy.light.otf";

import emblem from "./images/logo/emblem.png";

import { useState } from "react";
import { stringify } from "querystring";
import { Link } from "react-router-dom";

const Home = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [url, setUrl] = useState("");
  const [validator, setValidator] = useState({
    url: false,
    company: false,
    title: false,
  });

  // onChange={(event) => updateSearchInput(event.target.value)}
  const jobFormSubmissionHandler = (
    company: string,
    title: string,
    urlLink: string
  ) => {
    if (company.length !== 0 && title.length !== 0 && urlLink.length !== 0) {
      const client = {
        url: urlLink,
        company: company,
        title: title,
      };
      setCompanyName("");
      setJobTitle("");
      setUrl("");
      console.log(client, JSON.stringify(client));
      fetch("http://localhost:8000/addJob/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      return;
    }
    setValidator({
      url: urlLink.length === 0,
      company: company.length === 0,
      title: title.length === 0,
    });
  };
  return (
    <div className="d-flex flex-column align-items-left">
      <li>
        <Link to="/">
          <img src={emblem} alt="logo" width="150" height="150"></img>
        </Link>
      </li>
      <div className="gap-2 d-flex flex-column align-items-center h-100vh w-100 text-white bg-opacity-75">
        <p className="fs-1 font-face-gm">New Job application</p>
        <InputGroup hasValidation size="lg" className="mb-3 w-50">
          <InputGroup.Text
            className="pe-0 bg-white rounded-end rounded-pill"
            id="inputGroup-sizing-default"
          >
            Job Title
          </InputGroup.Text>
          <Form.Control
            type="text"
            required
            isInvalid={validator.title}
            value={jobTitle}
            className="border-start-0 shadow-none bg-white rounded-pill rounded-start"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => {
              setJobTitle(event.target.value);
              if (validator.title)
                setValidator((prev) => ({ ...prev, title: false }));
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid job title.
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup hasValidation size="lg" className="mb-3 w-50">
          <InputGroup.Text
            className="pe-0 bg-white rounded-end rounded-pill"
            id="inputGroup-sizing-default"
          >
            Company
          </InputGroup.Text>
          <Form.Control
            type="text"
            required
            isInvalid={validator.company}
            value={companyName}
            className="border-start-0 shadow-none bg-white rounded-pill rounded-start"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => {
              setCompanyName(event.target.value);
              if (validator.company)
                setValidator((prev) => ({ ...prev, company: false }));
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid company Name.
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup hasValidation size="lg" className="mb-3 w-50">
          <InputGroup.Text
            className="pe-0 bg-white rounded-end rounded-pill"
            id="inputGroup-sizing-default"
          >
            Job URL
          </InputGroup.Text>
          <Form.Control
            type="text"
            required
            isInvalid={validator.url}
            value={url}
            className="border-start-0 shadow-none bg-white rounded-pill rounded-start"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => {
              setUrl(event.target.value);
              if (validator.url)
                setValidator((prev) => ({ ...prev, url: false }));
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid URL.
          </Form.Control.Feedback>
        </InputGroup>
        <Button
          variant="outline-light"
          size="lg"
          onClick={() => {
            jobFormSubmissionHandler(companyName, url, jobTitle);
          }}
        >
          Submit New Job Info
        </Button>
      </div>
    </div>
  );
};

export default Home;
