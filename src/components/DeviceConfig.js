import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { token } from '../screens/Login/Login';
import openHAB from '../openHAB/openHAB';
import axios from 'axios';

const DeviceConfigurator = () => {
  let navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [clickedDevices, setClickedDevices] = useState([]);

  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    let auth = sessionStorage.getItem('auth');
    if (auth !== 'true') {
      navigate('/login');
    } else {
      fetchDevices();
    }
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios(openHAB.url + '/api/v1/devices/relations', config);
      const filteredDevices = response.data.filter(
        (device) =>
          device.item_type === 'Switch' &&
          (device.measurement_name === 'switchbinary' || device.measurement_name === 'switch')
      );

      const autoSwitchOffDevices = filteredDevices.filter((device) => device?.auto_switchoff === true);

      setDevices(filteredDevices);
      setSelectedDevices(autoSwitchOffDevices.map((device) => device.item_name));
    } catch (error) {
      console.error('Error fetching devices that can be switched off:', error);
    }
  };

  const handleDeviceSelection = (deviceName) => {
    setClickedDevices((prevClickedDevices) => {
      const isClicked = prevClickedDevices.includes(deviceName);
      const updatedClickedDevices = isClicked
        ? prevClickedDevices.filter((clicked) => clicked !== deviceName)
        : [...prevClickedDevices, deviceName];

      // Perform action based on click state
      if (isClicked) {
        console.log('Not Activated');
      } else {
        console.log('Activated');
      }

      return updatedClickedDevices;
    });

    setSelectedDevices((prevSelectedDevices) => {
      const isSelected = prevSelectedDevices.includes(deviceName);
      const updatedSelectedDevices = isSelected
        ? prevSelectedDevices.filter((selected) => selected !== deviceName)
        : [...prevSelectedDevices, deviceName];

      return updatedSelectedDevices;
    });
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        openHAB.url + '/api/v1/devices/loadmetadata',
        { items: selectedDevices },
        config
      );
      console.log('Items sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending items:', error);
    }
    alert('Confirm');
  };

  return (
    <>
      <div className="header">
        <div className="section-header">Turn off items ({devices.length})</div>
        <button
          className="btn-primary-no-background"
          onClick={handleConfirm}
          disabled={selectedDevices.length === 0}
        >
          Confirm
        </button>
      </div>

      <div
        className="horizontal-scroll-area"
        style={{
          display: 'flex',
          overflowX: 'auto',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        {devices.map((device) => (
          <button
            key={device.thing_name}
            className={`card hov-primary horizontal ${clickedDevices.includes(device.thing_name) ? 'selected' : ''}`}
            onClick={() => handleDeviceSelection(device.thing_name)}
            style={{
              flex: '0 0 150px',
              margin: '0 8px',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundColor: clickedDevices.includes(device.thing_name) ? '#D1EAF0' : '#FFFFFF', // Set background color
            }}
          >
            <div
              className="card-image horizontal"
              style={{
                height: '85px',
                width: '130px',
                marginTop: '5px',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                position: 'relative',
                verticalAlign: 'middle',
                backgroundAttachment: 'scroll',
                stroke: '#ef962e !important',
              }}
            >
              <img
                src={`/resources/${openHAB.switches.LIGHT_SWITCH_ID}.svg`}
                alt={device.thing_name}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div
              className="card-title horizontal"
            >
              {device.thing_name.split(' ').slice(1).join(' ')}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default DeviceConfigurator;
