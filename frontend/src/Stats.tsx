import { useState, useEffect } from "react";
import "./Stats.scss";
import { PieChart } from "@mui/x-charts/PieChart";
import { Job } from "./types/Job";

function Stats() {
  interface MonthMap {
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
  }

  let theCurrentYear = new Date().getUTCFullYear();

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
    let filteredJobData = jobData.filter(
      (element) => element.date.substring(0, 4) === theCurrentYear.toString()
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

    for (let i = 0; i < filteredJobData.length; i++) {
      let jobDate = new Date(filteredJobData[i].date);
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
  }, [jobData, theCurrentYear]);

  console.log(mapOfTheMonths);

  return (
    <div className="contentWrapper">
      <p>
        A current breakdown of job applications by month for {theCurrentYear}
      </p>
      <PieChart
        className="chart"
        colors={[
          "#000000",
          "#69C28E",
          "#6CA885",
          "#60DB94",
          "#6A8F79",
          "#63756A",
          "#4F5C54",
          "#324239",
          "#223329",
          "#1D3326",
          "#003315",
          "#FFFFFF",
        ]}
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
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
        width={600}
        height={400}
      />
    </div>
  );
}

export default Stats;
