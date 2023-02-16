import { Button, Dropdown, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Home.scss";

import "./fonts/nemoy/nemoy.light.otf";

import emblem from "./images/logo/emblem.png";

import { useState } from "react";
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
  const jobFormSubmissionHandler = () => {
    if (jobTitle.length !== 0 && companyName.length !== 0 && url.length !== 0) {
      const client = {
        url: url,
        company: companyName,
        title: jobTitle,
      };
      setCompanyName("");
      setJobTitle("");
      setUrl("");

      fetch("http://localhost:8000/addJob/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });

      return;
    }

    const isValidUrl = (testUrl: string) => {
      let result: URL;
      try {
        result = new URL(testUrl);
      } catch (_) {
        return false;
      }
      return result.protocol === "http:" || result.protocol === "https:";
    };
    setValidator({
      url: !isValidUrl(url),
      company: companyName.length === 0,
      title: jobTitle.length === 0,
    });
  };

  return (
    <div className="d-flex flex-column align-items-left">
      <div className="d-flex justify-content-between">
        <Link to="/">
          <img src={emblem} alt="logo" width="150" height="150"></img>
        </Link>
        <Dropdown className="mt-3 me-3">
          <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
            Projects
          </Dropdown.Toggle>

          <Dropdown.Menu
            variant="dark"
            className="dropdown_menu-2 dropdown-menu-end"
          >
            <ul className="list dropdown-menu-end">
              <Dropdown.Item as="button" className=" mb-2">
                <a
                  href="https://github.com/Nestrixx?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pe-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </Dropdown.Item>
              <Dropdown.Item className=" mb-2" as="button">
                <a
                  href="https://www.linkedin.com/in/christian-mckinney-b049a0116/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pe-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    stroke="black"
                    fill="white"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </Dropdown.Item>
              <Dropdown.Item className=" mb-2" as="button">
                <a
                  href="https://nestrixx.github.io/alarm-clock/#/alarms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pe-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </Dropdown.Item>
              <Dropdown.Item as="button" className=" mb-2">
                <a
                  href="https://my-tv-tracker-etq08qw6k-nestrixx.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pe-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </a>
              </Dropdown.Item>
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
            jobFormSubmissionHandler();
          }}
        >
          Submit New Job Info
        </Button>
      </div>
    </div>
  );
};

export default Home;
