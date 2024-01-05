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
    'any_measurement',
  ]

  const colors = {
    'any_measurement' : '142, 202, 230',
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
    final_time : moment().format('YYYY-MM-DD HH:mm:ss'),
    start_time : moment().subtract(1, 'years').format('YYYY-MM-DD HH:mm:ss')
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
      console.log(item_name);
      const matchingItem = response.data.find((Item) => Item.item_name === item_name);
      if (matchingItem) {
        setMeasurementName(matchingItem.measurement_name);
        setThingID(matchingItem.thing_id);
        //console.log('measure : ' + matchingItem.measurement_name);
        //console.log('thing_id: ' + matchingItem.thing_id);
      }
    } catch (error) {
      console.error("Error fetching OpenHAB item:", error);
    }
  };



  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true,
      },
      title: {
        display: true,
        text: 'Energy Measurements ',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  });

const apiCall = async () => {
    setChartData((chartData) => ({
      ...chartData,
      datasets: [],
    }));

    const update = energies.map(async (energy) => {
      const updatedRequestBody = { ...updateRequestBody};
      await apiCallBackend(updatedRequestBody).then((data) => {
        setAllDatasets((allDatasets) => [...allDatasets, energy]);
        setChartData((chartData) => ({
          tension: 0.1,
          labels: data.data.map((eachMeasure) => {
            const moment_source = moment(eachMeasure.time, 'ddd, DD MMM YYYY HH:mm:ss Z');
            // console.log('moment:' + moment_source.format('DD-MM-YYYY HH:mm'));
            return moment_source.format('DD-MM-YYYY HH:mm');
          }),
          datasets: [
            ...chartData.datasets,
            {
              label: energy.replace(/_/gi, ' ').split('energy')[0],
              data: data.data.map((eachMeasure) => {
                return Number(eachMeasure.state);
              }),
              borderColor: 'rgb(' + colors[energy] + ')',
              backgroundColor: 'rgba(' + colors[energy] + ', 0.5)',
            },
          ],
        }));

        setOptions((options) => ({
          ...options,
          plugins: {
            ...options.plugins,
            title: {
              ...options.plugins.title,
              text:
                'Energy Measurements ' +
                moment(updatedRequestBody.start_time).format('YYYY-MM-DD HH:mm:ss') +
                ' - ' +
                moment(updatedRequestBody.final_time).format('YYYY-MM-DD HH:mm:ss'),
            },
          },
        }));
      });
    });
  };
  
  var updateRequestBody = (range) => {
    switch(range) {
      case "5hours":
        updateRequestBody = {
          thing_id: thing_id,
          measurement: measurement_name,
          end_time : moment().format('YYYY-MM-DD HH:mm:ss'),
          start_time : moment().subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss')
        }
        setSelectRange('Last 5 hours')
        
        break; 
      case '1day':
        updateRequestBody = {
          thing_id: thing_id,
          measurement: measurement_name,
          end_time : moment().format('YYYY-MM-DD HH:mm:ss'),
          start_time : moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        }
        setSelectRange('Last day')
        
        break; 
      case '1week':
        updateRequestBody = {
          thing_id: thing_id,
          measurement: measurement_name,
          end_time : moment().format('YYYY-MM-DD HH:mm:ss'),
          start_time : moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss')
        }
        setSelectRange('Last 7 day')
        
        break; 
      case '1month':
        updateRequestBody = {
          thing_id: thing_id,
          measurement: measurement_name,
          end_time : moment().format('YYYY-MM-DD HH:mm:ss'),
          start_time : moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')
        }
        setSelectRange('Last month')
        
        break; 
      case '1year':
        updateRequestBody = {
          thing_id: thing_id,
          measurement: measurement_name,
          end_time : moment().format('YYYY-MM-DD HH:mm:ss'),
          start_time : moment().subtract(12, 'months').format('YYYY-MM-DD HH:mm:ss')
        }
        setSelectRange('Last year')
        
        break; 
      default:
        console.log('Wrong range')
        break; 
    }
    var nb = updateRequestBody;
    apiCall(nb);
    setOptions((options) => ({
      ...options,
      plugins: {
        ...options.plugins,
        title: {
          ...options.plugins.title,
          text:
            'Energy Measurements ' +
            moment(updateRequestBody.start_time).format('YYYY-MM-DD HH:mm:ss') +
            ' - ' +
            moment(updateRequestBody.final_time).format('YYYY-MM-DD HH:mm:ss'),
        },
      },
    }));
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
