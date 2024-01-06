import React, { useEffect, useState, useRef } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CloseButton from 'react-bootstrap/CloseButton';

var regex = /^(?!.*Sensor).*$/i;

const AllDevices = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const displayNameRef = useRef(null);

  const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
  };

  useEffect(() => {
    document.title = "SmartRoom – All devices";
    let auth = sessionStorage.getItem("auth")
    if(auth !== "true") {
      navigate("/login");
    }else{
      fetchOpenHABItems();
    }
  }, []);

  const fetchOpenHABItems = async () => {
    const response = await Axios(openHAB.url + "/api/v1/devices/items", config);
    setOpenHABItems(response.data);
  };

  var devices = [];
  openHABItems.forEach(function (item) {
    if (item.label !== "Total_Energy_Consumption_1000_01" && item.label !== "Number_people_detection_1000_05"){
      if (item.type === "Switch" && !regex.test(item.name)){
        devices.push(item);
      }
      if ("Switch" !== item.type) {
        devices.push(item);
      }
    }
  });

  function redirectToDetailedDevice(device) {
    if (!device || !device.name) {
      console.error("Device not valid");
      return;
    }else{
      const deviceName = device.name;
      let path = generatePath("/devices/:deviceName/details", { deviceName });
      navigate(path, { state: { device } });
    }
  }

  const toggleMenu = (device) => {
    if (selectedDevice && selectedDevice.name === device.name) {
      closeEditMode();
    } else {
      setSelectedDevice(device);
      setEditMode(true);
    }
  };

  const setNewDisplayName = async () => {
    const splitId = selectedDevice.name.split('_');
    const itemId = splitId[splitId.length-1];
    const thingId = splitId[splitId.length-2];
    const newName = displayNameRef.current.value;

    if (newName.length === 0) {
      console.log("Empty name input");
      return;
    }
    try {
      await Axios.put(openHAB.url + '/api/v1/devices/new_item_names', {
        item_id: itemId,
        new_item_name: newName,
        thing_id: thingId,
      }, config);
      setOpenHABItems(prevOpenHABItems => {
        return prevOpenHABItems.map(item => {
          if (item.name === selectedDevice.name) {
            return {
              ...item,
              display_name: newName,
            };
          }
          return item;
        });
      });
    } catch (error) {
      console.log("Error saving new display name");
    }
    closeEditMode();
  };

  const closeEditMode = () => {
    setEditMode(false);
    setSelectedDevice(null);
  };

  return (
    <> 
    <div>
      <button className="back-button" onClick={() => navigate(-1)} />
    </div>
    {devices.length === 0 &&
      <div className="noDevicesPopup">
        No devices found. Make sure openHAB is running!
      </div>
    }

      <div className="vertical-scroll-area">
        {devices.map((src) => (
          <>
          <div key={src.name} className="card hov-primary vertical toggle-separator">
            <div className="toggle-separator">
              {
                <div
                  key={src.title}
                  className="card-image vertical"
                  style={{
                    backgroundImage: `url('/resources/${SetImage(src.label)}.svg')`,
                  //backgroundImage: `25`,
                  }}
                />
              }
              <div className="card-title vertical name-config">
                {src.display_name}
              </div>
            </div>
            <DropdownButton id="dropdown-basic-button" title="...">
              <Dropdown.Item onClick={() => redirectToDetailedDevice(src)}>Measurements</Dropdown.Item>
              <Dropdown.Item onClick={() => toggleMenu(src)}>Change Name</Dropdown.Item>
            </DropdownButton>
          </div>
          {editMode && selectedDevice && selectedDevice.name === src.name && (
            <div className="card vertical toggle-separator">
              <div className="card-content toggle-separator">
                <div className="toggle-separator">
                <input
                  ref={displayNameRef}
                  type="text"
                  placeholder="Name"
                  defaultValue={src.display_name}
                  className="timer-name-input name-config"
                />
                <button
                    onClick={setNewDisplayName}
                    className="timer-name-input"
                > Save
                </button>
                </div>
              </div>
              <CloseButton onClick={closeEditMode} className="timer-close">
              </CloseButton>
            </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};


function SetImage(label) {
  const deviceTypes = ['Camera', 'Sensor', 'TV', 'LIGHT', 'Lamps', "Lamp", "Thermostat", "Metervoltage"];
  let imageName = "";
  console.log(label, "  kleviii");
  const lowercasedLabel = label.toLowerCase();

  for (const type of deviceTypes) {
    const lowercasedType = type.toLowerCase();

    if (lowercasedLabel.includes(lowercasedType)) {
      switch (type) {
        case 'Camera':        imageName = openHAB.devices.CAMERA_ID;        break;
        case 'Sensor':        imageName = openHAB.devices.SENSOR_ID;        break;
        case 'TV':            imageName = openHAB.devices.TV_ID;            break;
        case 'LIGHT':         imageName = openHAB.devices.LIGHT_ID;         break;
        case 'Lamp':          imageName = openHAB.devices.LAMP_ID;          break;
        case 'Lamps':         imageName = openHAB.devices.LAMP_ID;          break;
        case 'Thermostat':    imageName = openHAB.devices.THERMOSTAT_ID;    break;
        case 'Metervoltage':  imageName = openHAB.devices.METERVOLTAGE_ID;  break;
        default: break;
      }
      break;
    }
  }

  return imageName;
}

export default AllDevices;
