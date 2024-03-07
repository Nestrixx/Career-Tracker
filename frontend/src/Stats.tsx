import { useState, useEffect } from "react";
import "./Stats.scss";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Job } from "./types/Job";
import { MonthMap } from "./types/monthMap";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { LineChart } from "@mui/x-charts/LineChart";
import { Graph } from "./types/Graph";
import Navbar from "./Navbar";

function Stats() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getUTCFullYear()
  );
  const [jobData, setJobData] = useState<Job[]>([]);
  const [mapOfTheMonths, setMapOfTheMonths] = useState<MonthMap>({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  });

  const [yearsTrackingApplications, setYearsTrackingApplications] = useState<
    number[]
  >([]);
  const [graphBeingDisplayed, setGraphBeingDisplayed] = useState<Graph>(
    Graph.PieGraph
  );

  useEffect(() => {
    fetch("http://localhost:8000/jobData/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setJobData(data);
      })
      .catch((error) => {
        console.error("There was a problem fetching job data: ", error);
      });
  }, []);

  useEffect(() => {
    for (let i = 0; i < jobData.length; i++) {
      let currentElementYear = new Date(jobData[i].date);
      setYearsTrackingApplications((prevYears) => {
        const newYear = currentElementYear.getFullYear();
        if (!prevYears.includes(newYear)) {
          return [...prevYears, newYear];
        }
        return prevYears;
      });
    }
  }, [jobData]);

  useEffect(() => {
    let filteredJobDataForCurrentYear = jobData.filter(
      (element) => new Date(element.date).getFullYear() === selectedYear
    );

    const newMonthMap: MonthMap = {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
    };

    for (let i = 0; i < filteredJobDataForCurrentYear.length; i++) {
      let jobDate = new Date(filteredJobDataForCurrentYear[i].date);
      let applicationMonth = jobDate.getMonth();

      switch (applicationMonth) {
        case 0:
          newMonthMap.january += 1;
          break;

        case 1:
          newMonthMap.february += 1;
          break;

        case 2:
          newMonthMap.march += 1;
          break;

        case 3:
          newMonthMap.april += 1;
          break;

        case 4:
          newMonthMap.may += 1;
          break;

        case 5:
          newMonthMap.june += 1;
          break;

        case 6:
          newMonthMap.july += 1;
          break;

        case 7:
          newMonthMap.august += 1;
          break;

        case 8:
          newMonthMap.september += 1;
          break;

        case 9:
          newMonthMap.october += 1;
          break;

        case 10:
          newMonthMap.november += 1;
          break;

        case 11:
          newMonthMap.december += 1;
          break;
      }
    }
    setMapOfTheMonths(newMonthMap);
  }, [jobData, selectedYear]);

  return (
    <div className="contentWrapper">
      <Navbar></Navbar>
      <div className="titleWrapper">
        <p className="titleText">
          A current breakdown of job applications by month for
        </p>
        <Dropdown className="mt-3 me-3n yearDropdown">
          <Dropdown.Toggle
            size="lg"
            variant="outline-light"
            id="dropdown-basic"
          >
            {selectedYear}
          </Dropdown.Toggle>

          <Dropdown.Menu className="yearSelectorDropdown">
            {yearsTrackingApplications.map((year) => (
              <DropdownItem
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                }}
              >
                {year}
              </DropdownItem>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="graphTitleWrapper">
        <span>
          choose between a{" "}
          <button
            onClick={() => setGraphBeingDisplayed(Graph.PieGraph)}
            className="graphSelectButton"
          >
            {" "}
            pie graph{" "}
          </button>{" "}
          and a{" "}
          <button
            onClick={() => setGraphBeingDisplayed(Graph.LineGraph)}
            className="graphSelectButton"
          >
            {" "}
            bar graph
          </button>{" "}
          to display the applications per month
        </span>
      </div>
      <div className="chartWrapper">
        {graphBeingDisplayed === Graph.PieGraph ? (
          <PieChart
            className="chart"
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data: [
                  { id: 1, value: mapOfTheMonths.january, label: "January" },
                  { id: 2, value: mapOfTheMonths.february, label: "February" },
                  { id: 3, value: mapOfTheMonths.march, label: "March" },
                  { id: 4, value: mapOfTheMonths.april, label: "April" },
                  { id: 5, value: mapOfTheMonths.may, label: "May" },
                  { id: 6, value: mapOfTheMonths.june, label: "June" },
                  { id: 7, value: mapOfTheMonths.july, label: "July" },
                  { id: 8, value: mapOfTheMonths.august, label: "August" },
                  {
                    id: 9,
                    value: mapOfTheMonths.september,
                    label: "September",
                  },
                  { id: 10, value: mapOfTheMonths.october, label: "October" },
                  { id: 11, value: mapOfTheMonths.november, label: "November" },
                  { id: 12, value: mapOfTheMonths.december, label: "December" },
                ],
              },
            ]}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 14,
                  fill: "white",
                },
              },
            }}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: 17,
              },
            }}
            width={800}
            height={600}
          />
        ) : null}
        {graphBeingDisplayed === Graph.LineGraph ? (
          <LineChart
            xAxis={[
              { scaleType: "point", data: [...Object.keys(mapOfTheMonths)] },
            ]}
            series={[
              {
                data: [...Object.values(mapOfTheMonths)],
                label: "Number of applications per month",
              },
            ]}
            slotProps={{
              legend: {
                labelStyle: {
                  fill: "white",
                },
              },
            }}
            width={800}
            height={600}
            sx={{
              //change left yAxis label styles
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                strokeWidth: "0.4",
                fill: "#FFFFFF",
              },
              // change bottom label styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                strokeWidth: "0.5",
                fill: "#FFFFFF",
              },
              // bottomAxis Line Styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                stroke: "#FFFFFF",
                strokeWidth: 1,
              },
              // leftAxis Line Styles
              "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                stroke: "#FFFFFF",
                strokeWidth: 1,
              },
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Stats;
