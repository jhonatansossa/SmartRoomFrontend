import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import measurements from "../dummyData/Measurements";
  import { React, useState } from "react";

  const Graphs = () => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    const [lastMeasurements, setLastMeasurements] = useState(measurements.lastMeasurements);

    const labels = lastMeasurements.map((eachMeasure) => {
      return eachMeasure.date
    });

    const dataMeasurements = lastMeasurements.map((eachMeasure) => {
      return eachMeasure.value
    });

    const data = {
      labels,
      datasets: [
        {
          label: 'Voltage',
          data: dataMeasurements,
          borderColor: 'rgb(239, 150, 46)',
          backgroundColor: 'rgba(239, 150, 46, 0.5)',
        }
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          display: false
        },
        title: {
          display: true,
          text: 'Voltage in V',
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    };

    return (<Line options={options} data={data} />);
  };

  export default Graphs;