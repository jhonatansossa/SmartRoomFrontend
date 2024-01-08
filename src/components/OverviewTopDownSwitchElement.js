import { React, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Axios from "axios";
import openHAB from "../openHAB/openHAB";
import { token } from "../screens/Login/Login";
const updateColorSwitch = (state) => {
  let color;
  if (state === "OFF") {
    color = "#818181";
  } else {
    color = "#ef962e";
  }
  return { color };
};




function OverviewTopDownSwitchElement(props) {
  let navigate = useNavigate();

  function redirectToDetailedSwitch(device, id) {
    let path = generatePath("/switches/:id/details", { id });
    console.log(device.state);
    UpdateOverviewSwitchBox(device.name, setResponseStatus, device.state);
    // navigate(path, { state: { device } });
  }

  const [switchState, setSwitchState] = useState(props.switches.find((s) => s.name === props.id).state);
  const [responseStatus, setResponseStatus] = useState([]);

  function UpdateOverviewSwitchBox(name, setResponseStatus, state) {
  const tokens = name.split('_');
  const xtokens = tokens.slice(-2);

  const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
  };

  async function sendOpenHABRequest(newState) {
    let data = { "state": newState };
    
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

  // Call the function with the current toggle state
  sendOpenHABRequest(state === "ON" ? "OFF" : "ON");
}


  return (
    <div
      onClick={() => redirectToDetailedSwitch(props.switches.find((s) => s.name === props.id), props.id)}
      style={{
        backgroundColor: updateColorSwitch(props.switches.find((s) => s.name === props.id).state).color,
      }}
      id={props.id + "Switch"}
      className="square"
      data-tip
      data-for={props.id + "Tooltip"}
    >
      <ReactTooltip id={props.id + "Tooltip"}>
        <span>{props.switches.find((s) => s.name === props.id).display_name}</span>
      </ReactTooltip>
      <div className="topdown-element-text">
        {props.switches.find((s) => s.name === props.id).state}
        <br />
      </div>
    </div>
  );
}

export default OverviewTopDownSwitchElement;