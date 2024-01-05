import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import base64 from 'base-64';
import { token } from "./Login/Login";
var regex = /^(?!.*Sensor).*$/i;
const AllDevices = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);

  //let base64 = require("base-64");
  // const config = {
  //   headers: { Authorization: token },
  // };

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

  function redirectToDetailedDevice(id) {
    if (!id) {
      console.error("ID no válido");
      return;
    }else{
      let path = generatePath("/devices/:id/details", { id });
      navigate(path);
    }
    
  }

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
          <button
            className="card hov-primary vertical"
            onClick={() =>
              redirectToDetailedDevice(src.label)
            }
          >
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
            <div className="card-title vertical">
              {src.name}
            </div>
          </button>
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
