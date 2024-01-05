import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import ToggleButton from "react-toggle-button";
import ReactTooltip from "react-tooltip";
import { token } from "./Login/Login";
import base64 from 'base-64';
var regex = /^(?!.*Sensor).*$/i;
const AllSwitches = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);
  const [toggle, setToggle] = useState(false); // Switch toggle handler
  const [responseStatus, setResponseStatus] = useState([]);

  //let base64 = require("base-64");
    // const config = {
    //   headers: { Authorization: token },
    // };

    const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
  };

  const postConfig = {
    headers: {
      Authorization: token,
      "Content-Type": "text/plain",
    },
  };

  useEffect(() => {
    document.title = "SmartRoom – All devices";
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      fetchOpenHABItems();
    }
  }, []);

  const fetchOpenHABItems = async () => {
    const response = await Axios.get(openHAB.url + "/api/v1/devices/items", config);
    setOpenHABItems(response.data);
  };

  var switches = [];
  openHABItems.forEach(function (item) {
    if (item.type === "Switch" && regex.test(item.name)) {
            switches.push(item);
          }
        }
  );

  function redirectToDetailedSwitch(id) {
    let path = generatePath("/switches/:id/details", { id });
    navigate(path);
  }

  async function toggleAllSwitches(toggle) {
    switches.forEach(function (item) {
      if (toggle === true) {
        Axios
          .post(openHAB.url + "/api/v1/devices/items/" + item.name, "OFF", postConfig)
          .then((response) => {
            setResponseStatus(response.data);
            console.log(responseStatus);
          });
      } else {
        Axios
          .post(openHAB.url + "/api/v1/devices/items/" + item.name, "ON", postConfig)
          .then((response) => {
            setResponseStatus(response.data);
            console.log(responseStatus);
          });
      }
      fetchOpenHABItems();
    });
  }

  return (
    <>
    <div>
      <button className="back-button" onClick={() => navigate(-1)} />
    </div>
      {switches.length === 0 && (
        <div className="noDevicesPopup">
          No switches found. Make sure openHAB is running!
        </div>
      )}
      {switches.length > 0 && (
        <div className="card masterSwitch">
          <ToggleButton
            id="masterToggle"
            value={toggle}
            onToggle={() => {
              setToggle(!toggle);
              toggleAllSwitches(toggle);
            }}
          />
          <div className="masterSwitchContainer">
            <div id="masterSwitchDesc">Master-Switch</div>
            <img
              id="masterHelpIcon"
              src="help.svg"
              alt="help"
              width="14px"
              height="14px"
              data-tip
              data-for="masterSwitch"
            />
            <ReactTooltip id="masterSwitch">
              <span>Toggle all devices at once</span>
            </ReactTooltip>
          </div>
        </div>
      )}
      <div className="vertical-scroll-area">
        {switches.map((src) => (
          <>
            {src.state === "OFF" && (
              <button
                id="switchOFF"
                className="card hov-primary vertical"
                onClick={() => redirectToDetailedSwitch(src.name)}
              >
                {
                  <div
                    key={src.title}
                    className="card-image vertical"
                    style={{
                      backgroundImage: `url('/resources/${openHAB.switches.LIGHT_SWITCH_ID}.svg')`,
                      //backgroundImage: `url('/resources/${src.name}.svg')`,
                      filter:
                        "invert(35%) sepia(24%) saturate(6006%) hue-rotate(349deg) brightness(84%) contrast(89%)",
                    }}
                  />
                }
                <div
                  className="card-title vertical"
                  style={{
                    color: "#cc4125",
                  }}
                >
                  {src.label}
                </div>
              </button>
            )}
            {src.state === "ON" && (
              <button
                id="switchON"
                className="card hov-primary vertical"
                onClick={() => redirectToDetailedSwitch(src.name)}
              >
                {
                  <div
                    key={src.title}
                    className="card-image vertical"
                    style={{
                      backgroundImage: `url('/resources/${openHAB.switches.LIGHT_SWITCH_ID}.svg')`,
                      //backgroundImage: `url('/resources/${src.name}.svg')`,
                      filter:
                        "invert(56%) sepia(39%) saturate(532%) hue-rotate(57deg) brightness(98%) contrast(90%)",
                    }}
                  />
                }
                <div
                  className="card-title vertical"
                  style={{
                    color: "#6aa84f",
                  }}
                >
                  {src.label}
                </div>
              </button>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default AllSwitches;
