import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { token } from "../screens/Login/Login";
import openHAB from '../openHAB/openHAB';
import axios from 'axios';

const DeviceConfigurator = () => {
  let navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);

  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      fetchDevices();
    }
  }, [])

  const fetchDevices = async () => {
    try {
      const response = await axios(openHAB.url + "/api/v1/devices/relations", config);
      const filteredDevices = response.data.filter((device) => device.item_type === "Switch"
        && (device.measurement_name === "switchbinary" || device.measurement_name === "switch"))

      const autoSwitchOffDevices = filteredDevices.filter((device) => device?.auto_switchoff === true);

      setDevices(filteredDevices);
      setSelectedDevices(autoSwitchOffDevices.map((device) => device.item_name));
    } catch (error) {
      console.error("Error fetching devices that can be switched off:", error);
    }
  }

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
      const response = await axios.post(openHAB.url + '/api/v1/devices/loadmetadata', { items: selectedDevices }, config);
      console.log('Items sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending items:', error);
    }
  };

  return (
    <div className="vertical-scroll-area">
      {devices.map((device) => (
        <button
          key={device.thing_name}
          className={`card hov-primary vertical ${selectedDevices.includes(device.thing_name) ? 'selected' : ''}`}
          onClick={() => handleDeviceSelection(device.item_name)}
        >
          <div
            className="card-image vertical"
          />
          <div
            className="card-title vertical"
            style={{
              color: selectedDevices.includes(device.item_name) ? "#ef962e" : "#cc4125",
            }}
          >
            {device.thing_name.split(' ').slice(1).join(' ')}
          </div>
        </button>
      ))}
      <button onClick={handleConfirm} disabled={selectedDevices.length === 0}>
        Confirm
      </button>
    </div>
  );
}

export default DeviceConfigurator;