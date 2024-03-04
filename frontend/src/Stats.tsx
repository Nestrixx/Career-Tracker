import { useState, useEffect } from "react";
import "./Stats.scss";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Job } from "./types/Job";
import { MonthMap } from "./types/monthMap";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { LineChart } from "@mui/x-charts/LineChart";
import { cheerfulFiestaPaletteLight } from "@mui/x-charts/colorPalettes";


function Stats() {

  const [selectedYear, setSelectedYear] = useState<number>(new Date().getUTCFullYear());
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

  const [yearsTrackingApplications, setYearsTrackingApplications] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/jobData/")
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
      if (!yearsTrackingApplications.includes(currentElementYear.getFullYear())) {
        yearsTrackingApplications.push(currentElementYear.getFullYear());
      }
    }

    let filteredJobDataForCurrentYear = jobData.filter(
      (element) => ((new Date(element.date).getFullYear()) === selectedYear)
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

      console.log(...Object.keys(mapOfTheMonths));

    }
    setMapOfTheMonths(newMonthMap);
  }, [jobData, selectedYear]);



  return (
    <div className="contentWrapper">
      <p className="tital">
        A current breakdown of job applications by month for
        <Dropdown className="mt-3 me-3n " >
          <Dropdown.Toggle size="lg" variant="outline-light" id="dropdown-basic">
            {selectedYear}
          </Dropdown.Toggle>

          <Dropdown.Menu className="yearSelectorDropdown">
            {yearsTrackingApplications.map(year => (
              <DropdownItem key={year} onClick={() => { setSelectedYear(year) }}>{year}</DropdownItem>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </p>
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
              { id: 9, value: mapOfTheMonths.september, label: "September" },
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
              fill: 'white',
            },
          },
        }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
            fontSize: 17,
          },
        }}
        width={600}
        height={400}
      />
      <LineChart
        xAxis={[{ scaleType: 'point', data: [...Object.keys(mapOfTheMonths)] }]}
        series={[
          {
            data: [...Object.values(mapOfTheMonths)],
          },
        ]}
        width={800}
        height={600}
        colors={cheerfulFiestaPaletteLight}
        sx={{
          '.': {
            fill: 'white',
          },
        }}
      />
    </div>
  );
}

export default Stats;
