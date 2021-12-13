import React, { useState,useEffect } from "react";
import Axios from 'axios';
import { useNavigate, generatePath } from "react-router-dom";
import PopUp from "../components/PopUp";

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

  const [seen, setSeen] = useState(false);

  //Fetching openHAB switches
  const [openHABItems,setOpenHABItems]=useState([])

  const config = {
    headers: { Authorization: `Bearer oh.testToken.JpBfn4tkeRgYr7jV2MQi2xiNqfbZUdxJVWjIwfNDOLmo28MEbk10YmxGgYRs16Y752YXmgdqpU8D7htg` }
  };

  useEffect(() => {
    fetchOpenHABItems();
  }, [])

  const fetchOpenHABItems=async()=>{
    // https://community.openhab.org/t/cors-problem/113063  --> If requests not working
    const response=await Axios('http://localhost:8080/rest/items', config);
    setOpenHABItems(response.data)
  }

  var switches = [];
  openHABItems.forEach(function(item) {
    if(item.type === "Switch"){
      switches.push(item);
    }
  });

  console.log(switches)

  return (
    <>
      <div>
        <div className="flex-container">
          <div id="circle"/>
          <div id="horRectangle"/>
          <div id="door"/>
          <div
            onClick={() => setSeen(!seen)}
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
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
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
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
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
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
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
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="dryer"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>

          {seen ? <PopUp /> : null}
        </div>

        <div className="header">
          <div className="section-header">Turned on</div>
          <button
            onClick={redirectToDevices}
            className="btn-primary-no-background"
          >
            View all
          </button>
        </div>

        <div className="scroll-area">
          {devices_turnedOn.map((src) => (
            <button
              className="card hov-primary horizontal"
              onClick={() => redirectToDetailedDevice(src.title)}
            >
              <div
                key={src.title}
                className="card-image horizontal"
                style={{
                  backgroundImage: `url(${src.image})`,
                }}
              ></div>
              <div className="card-title horizontal">{src.title}</div>
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
                  backgroundImage: `url(/logo192.png)`,
                }}
              ></div>
              <div className="card-title horizontal">{src.label}</div>
            </button>
          ))}
        </div>         

        <div className="header">
          <div className="section-header">Frequently used</div>
          <button
            onClick={redirectToDevices}
            className="btn-primary-no-background"
          >
            View all
          </button>
        </div>
        <div className="scroll-area">
          {devices_frequentlyUsed.map((src) => (
            <button
              className="card hov-primary horizontal"
              onClick={() => redirectToDetailedDevice(src.title)}
            >
              <div
                key={src.title}
                className="card-image horizontal"
                style={{
                  backgroundImage: `url(${src.image})`,
                }}
              ></div>
              <div className="card-title horizontal">{src.title}</div>
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
