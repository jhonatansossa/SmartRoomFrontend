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
import { React, useState, useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import * as moment from 'moment';
import apiCallBackend from '../services/ApiCallBackend';
import Stack from 'react-bootstrap/Stack';
import { token } from "../screens/Login/Login";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const Graphs = ({ item_name }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const navigate = useNavigate();
  const config = {
    headers: { Authorization: token },
  };

  const energies = [
    'active_import_energy',
    'active_export_energy',
    'reactive_import_energy',
    'reactive_export_energy',
    'apparent_import_energy',
    'apparent_export_energy',
  ]

  const colors = {
    'active_import_energy' : '142, 202, 230',
    'active_export_energy':'33, 158, 188',
    'reactive_import_energy':'2, 48, 71',
    'reactive_export_energy':'255, 183, 3',
    'apparent_import_energy':'251, 133, 0',
    'apparent_export_energy':'155, 34, 38'
  }
  
  const [measurement_name, setMeasurementName] = useState();
  const [thing_id, setThingID] = useState();
  const [allDatasets, setAllDatasets] = useState([])
  const [chartData, setChartData] = useState({
    labels: [],
    datasets:[]
  });
  const [selectRange, setSelectRange] = useState('Select a range')

  let requestbody = {
    id : '13',
    measure: 'active_import_energy',
    final_time : moment().format('YYYY-MM-DD hh:mm:ss'),
    start_time : moment().subtract(1, 'years').format('YYYY-MM-DD hh:mm:ss')
  }

  useEffect(() => {
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
        fetchMeasurementData();
    }
  }, [navigate, setMeasurementName]);

  const fetchMeasurementData = async () => {
    try {
      const response = await Axios.get(
        openHAB.url+"/api/v1/devices/relations",
        config
      );
      
      await setMeasurementName(response.data.filter(Item => (Item.item_name == item_name))[0].measurement_name);
      await setThingID(response.data.filter(Item => (Item.item_name == item_name))[0].thing_id);
    } catch (error) {
      console.error("Error fetching OpenHAB item:", error);
    }
  };

  const apiCall = async() => {
    setChartData(chartData => ({...chartData,
      datasets: []
    }))

    const update = energies.map(async (energy) => {
      requestbody = {...requestbody,
        measure: energy
      }
      await apiCallBackend(requestbody).then(data => {
        setAllDatasets(allDatasets => ([...allDatasets, energy]));
        setChartData(chartData => ({
          tension: 0.1,
          labels: data.lastMeasurements.map((eachMeasure) => {
            const moment_source = moment(eachMeasure.time, 'ddd, DD MMM YYYY HH:mm:ss Z')
            //console.log(moment_source)
            return moment_source.format('DD-MM-YYYY HH:mm');
          }),
          datasets: [...chartData.datasets,
            {
              label: energy.replace(/_/gi, " ").split("energy")[0],
              data: data.lastMeasurements.map((eachMeasure) => {
                return eachMeasure.value;
              }),
              borderColor: 'rgb(' + colors[energy] + ')',
              backgroundColor: 'rgba(' + colors[energy] + ', 0.5)',
            }
          ]
        }));
      })
    })
  }
  

  var updateRequestBody = (range) => {
    switch(range) {
      case "5hours":
        requestbody = {
          id: thing_id,
          measure: measurement_name,
          final_time : moment().format('YYYY-MM-DD hh:mm:ss'),
          start_time : moment().subtract(5, 'hours').format('YYYY-MM-DD hh:mm:ss')
        }
        setSelectRange('Last 5 hours')
        //apiCall()
        break; 
      case '1day':
        requestbody = {
          id: thing_id,
          measure: measurement_name,
          final_time : moment().format('YYYY-MM-DD hh:mm:ss'),
          start_time : moment().subtract(1, 'days').format('YYYY-MM-DD hh:mm:ss')
        }
        //apiCall()
        setSelectRange('Last day')
        break; 
      case '1week':
        requestbody = {...requestbody,
          id: thing_id,
          measure: measurement_name,
          final_time : moment().format('YYYY-MM-DD hh:mm:ss'),
          start_time : moment().subtract(7, 'days').format('YYYY-MM-DD hh:mm:ss')
        }
        //apiCall()
        setSelectRange('Last week')
        break; 
      case '1month':
        requestbody = {
          id: thing_id,
          measure: measurement_name,
          final_time : moment().format('YYYY-MM-DD hh:mm:ss'),
          start_time : moment().subtract(1, 'months').format('YYYY-MM-DD hh:mm:ss')
        }
        setSelectRange('Last month')
        //apiCall()
        break; 
      case '1year':
        requestbody = {
          id: "12",
          measure: measurement_name,
          final_time : moment().format('YYYY-MM-DD hh:mm:ss'),
          start_time : moment().subtract(2, 'months').format('YYYY-MM-DD hh:mm:ss')
        }
        setSelectRange('Last year')
        //apiCall()
        break; 
      default:
        console.log('Wrong range')
        break; 
    }
    console.log(requestbody)
  }

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true
      },
      title: {
        display: true,
        text: 'Energy Measurements',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
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

  return (
    <Stack gap={2}>
      <DropdownButton id="dropdown-basic-button" title={selectRange}  align={{ lg: 'left' }}>
      <Dropdown.Item href="#/action-1" onClick={() => updateRequestBody('5hours')}>Last 5 hours</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={() => updateRequestBody('1day')}>Last day</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={() => updateRequestBody('1week')}>Last week</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={() => updateRequestBody('1month')}>Last month</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={() => updateRequestBody('1year')}>Last year</Dropdown.Item>
      </DropdownButton>
      <div className="bg-light border">
      <Line options={options} data={chartData} />
      </div>
    </Stack>
  );
};

export default Graphs;
