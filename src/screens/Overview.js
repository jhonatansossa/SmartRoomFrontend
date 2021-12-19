import React, { useEffect, useState } from "react";
import Axios from "axios";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";

const updateColor = (volts, watts) => {
  let color;
  if (volts < 25 && watts < 100) {
    color = "#6aa84f";
  } else if (volts > 25 && volts < 35 && watts > 100 && watts < 250) {
    color = "#ef962e";
  } else {
    color = "#cc4125";
  }
  return { color };
};

const Overview = () => {
  let navigate = useNavigate();

  const redirectToDevices = () => {
    navigate("/devices");
  };

  function redirectToDetailedDevice(id) {
    let path = generatePath("/devices/:id/details", { id });
    navigate(path);
  }

  function redirectToDetailedSwitch(id) {
    let path = generatePath("/switches/:id/details", { id });
    navigate(path);
  }

  let volts = 26;
  let watts = 101;

  //Fetching openHAB switches
  const [openHABItems, setOpenHABItems] = useState([]);

  const config = {
    headers: {
      Authorization: openHAB.token,
    },
  };

  useEffect(() => {
    fetchOpenHABItems();
    document.title = "SmartRoom – Overview";
  }, []);

  const fetchOpenHABItems = async () => {
    const response = await Axios(openHAB.url + "/rest/items", config);
    setOpenHABItems(response.data);
  };

  var switches = [];
  var devices = [];
  openHABItems.forEach(function (item) {
    if (item.type === "Switch") {
      if ("stateDescription" in item) {
        if ("readOnly" in item.stateDescription) {
          if (item.stateDescription.readOnly === false) switches.push(item);
        }
      }
    }
    if ("stateDescription" in item) {
      if ("options" in item.stateDescription) {
        if (item.stateDescription.options !== []) {
          item.stateDescription.options.forEach(function (value) {
            if (value.value === "device") {
              devices.push(item);
            }
          });
        }
      }
    }
  });

  return (
    <>
      <div>
        <div className="flex-container">
          <div id="circle" />
          <div id="horRectangle" />
          <div id="door" />
          <div
            onClick={() => redirectToDetailedDevice(devices_turnedOn[0].title)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="washer"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>

          <div
            onClick={() => redirectToDetailedDevice(devices_turnedOn[1].title)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="tv"
            className="rectangle"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>
          <div
            onClick={() => redirectToDetailedDevice(devices_turnedOn[2].title)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="kitchen"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>
          <div
            onClick={() => redirectToDetailedDevice(devices_turnedOn[3].title)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="refrigerator"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>
          <div
            onClick={() => redirectToDetailedDevice(devices_turnedOn[4].title)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="dryer"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>
        </div>

        <div className="header">
          <div className="section-header">Devices</div>
          <button
            onClick={redirectToDevices}
            className="btn-primary-no-background"
          >
            View all
          </button>
        </div>

        <div className="scroll-area">
          {devices.map((src) => (
            <button
              className="card hov-primary horizontal"
              onClick={() =>
                redirectToDetailedDevice(src.stateDescription.options[2].value)
              }
            >
              <div
                key={src.title}
                className="card-image horizontal"
                style={{
                  backgroundImage: `url('resources/${src.stateDescription.options[2].value}.svg')`,
                }}
              />
              <div className="card-title horizontal">
                {src.stateDescription.options[0].value}
              </div>
            </button>
          ))}
        </div>

        <div className="header">
          <div className="section-header">Switches</div>
        </div>
        <div className="scroll-area">
          {switches.map((src) => (
            <button
              className="card hov-primary horizontal"
              onClick={() => redirectToDetailedSwitch(src.name)}
            >
              <div
                key={src.label}
                className="card-image horizontal"
                style={{
                  backgroundImage: `url('/resources/${src.name}.svg')`,
                }}
              />
              <div className="card-title horizontal">{src.label}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const devices_turnedOn = [
  { title: "device1", image: "/logo192.png" },
  { title: "device2", image: "/logo192.png" },
  { title: "device3", image: "/logo192.png" },
  { title: "device4", image: "/logo192.png" },
  { title: "device5", image: "/logo192.png" },
  { title: "device6", image: "/logo192.png" },
];

const devices_frequentlyUsed = [
  { title: "device7", image: "/logo192.png" },
  { title: "device8", image: "/logo192.png" },
  { title: "device9", image: "/logo192.png" },
];

export default Overview;
