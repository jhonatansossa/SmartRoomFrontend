import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import openHAB from '../openHAB/openHAB';
import axios from 'axios';

const DeviceConfigurator = (props) => {
  let navigate = useNavigate();
  let switchList = props.switchList;
  const [selectedDevices, setSelectedDevices] = useState([]);

  // const config = {
  //   headers: { Authorization: token },
  // };

  const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
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
          (device.measurement_name === 'switchbinary' || device.measurement_name === 'switch' || device.measurement_name === 'binary')
      );

      const autoSwitchOffDevices = filteredDevices.filter((device) => device.auto_switchoff === true);

      const mergedDevices = switchList.map((device) => {
        const matchingRelation = response.data.find((relation) => relation.thing_name === device.name);
  
        if (matchingRelation) {
          return { ...device, auto_switchoff: matchingRelation.auto_switchoff };
        }
  
        return device;
      });

      switchList = mergedDevices;
      setSelectedDevices(autoSwitchOffDevices.map((device) => device.item_name));
    } catch (error) {
      console.error('Error fetching devices that can be switched off:', error);
    }
  };

  const handleDeviceSelection = (deviceName) => {
    const isSelected = selectedDevices.includes(deviceName);
    if (isSelected) {
      setSelectedDevices(selectedDevices.filter((selected) => selected !== deviceName));
    } else {
      setSelectedDevices([...selectedDevices, deviceName]);
    }
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
    alert('Devices confirmed.');
  };

   useEffect(() => {
    localStorage.setItem('selectedDevices', JSON.stringify(selectedDevices));
  }, [selectedDevices]);

  return (
    <>
      <div className="header">
        <div className="section-header">Automatically turn off items ({switchList.length})</div>
        <button
          className="btn-primary-no-background"
          onClick={handleConfirm}
          disabled={selectedDevices.length === 0}
        >
          Confirm
        </button>
      </div>

      <div
        className="scroll-area"
      >
        {switchList.map((device) => (
          <button
            key={device.thing_name}
            className={`card hov-primary horizontal ${selectedDevices.includes(device.name) ? 'selected' : ''}`}
            onClick={() => handleDeviceSelection(device.name)}
            style={{
              backgroundColor: selectedDevices.includes(device.name) ? '#D1EAF0' : '#FFFFFF', // Set background color
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
                alt={device.name}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div
              className="card-title horizontal"
            >
              {device.display_name}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default DeviceConfigurator;
