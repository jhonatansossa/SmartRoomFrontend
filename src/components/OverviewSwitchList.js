import { React, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";

const updateColorSwitch = (state) => {
  let color;
  if (state === "OFF") {
    color = "#FFFFFF";
  } else {
    color = "#D1EAF0";
  }
  return { backgroundColor: color };
};

function OverviewSwitchList(props) {
  let navigate = useNavigate();
  const [responseStatus, setResponseStatus] = useState([]);

  const redirectToSwitches = () => {
    navigate("/switches");
  };

  function redirectToDetailedSwitch(device) {
    const id = device.name;
    let path = generatePath("/switches/:id/details", { id });
    ActivateSwitch(device);
  }

  function ActivateSwitch(device) {
    const config = {
      headers: { Authorization: sessionStorage.getItem("token") },
    };

    if (device) {
      const switchState = device.state;

      sendOpenHABRequest(device.state === "ON" ? "OFF" : "ON");

      async function sendOpenHABRequest(newState) {
        let data = { "state": newState };
        const tokens = device.name.split('_');
        const xtokens = tokens.slice(-2);
        try {
          const response = await Axios.post(
            openHAB.url + "/api/v1/devices/items/" + xtokens[0] + "/" + xtokens[1] + "/state",
            data,
            config
          );

          setResponseStatus(response.data);

          if (newState === "OFF") {
            console.log("Device turned off:", response.data);
          } else if (newState === "ON") {
            console.log("Device turned on:", response.data);
          }
        } catch (error) {
          console.error("Error updating switch state:", error);
        }
      }
    }
  }

  return (
    <>
      <div className="header">
        <div className="section-header">
          {props.name + " (" + props.switchList.length + ")"}
        </div>
        <button
          onClick={redirectToSwitches}
          className="btn-primary-no-background"
        >
          View all
        </button>
      </div>

      <div className="scroll-area">
        {props.switchList.length === 0 && (
            <div
                className="altList"
                style={{
                  color: '#ef962e',
                  fontStyle: 'italic',
                }}
            >No switches found</div>
        )}
        {props.switchList.map((src) => (
          <button
            className="card hov-primary horizontal"
            onClick={() => redirectToDetailedSwitch(src)}
            style={updateColorSwitch(src.state)} // Set background color dynamically
          >
            <div
              key={src.label}
              className="card-image horizontal"
              style={{
                backgroundImage: `url('/resources/switch${src.state === "ON" ? "_on" : ""}.svg')`,
              }}
            />
            <div className="card-title horizontal">{src.display_name}</div>
          </button>
        ))}
      </div>
    </>
  );
}

export default OverviewSwitchList;
