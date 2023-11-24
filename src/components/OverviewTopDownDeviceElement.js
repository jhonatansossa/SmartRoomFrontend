import { React } from "react";
import ReactTooltip from "react-tooltip";
import { generatePath, useNavigate } from "react-router-dom";

const updateColor = (kwh) => {
  let color;
  if (kwh <= 0) {
    color = "#818181";
  } else {
    color = "#ef962e";
  }
  return { color };
};

function OverviewTopDownDeviceElement(props) {
  let navigate = useNavigate();

  function redirectToDetailedDevice(id) {
    let path = generatePath("/devices/:id/details", { id });
    navigate(path);
  }

  return (
    <div
      onClick={() => redirectToDetailedDevice(props.id)}
      style={{
        filter: updateColor(
          props.devices.find((device) => device.name === props.id).state
        ).color,
      }}

      id={
        "device" +
        props.devices.find(
          (device) => device.name === props.id
        ).name
      }
      className="square"
      data-tip
      data-for={
        props.devices.find(
          (device) => device.name === props.id
        ).name + "ToolTip"
      }
    >
      <ReactTooltip
        id={
          props.devices.find(
            (device) => device.name === props.id
          ).name + "ToolTip"
        }
      >
        <span>
          {
            getNameAndCurrentConsumption()
          }
        </span>
      </ReactTooltip>
    </div>
  );

  function getNameAndCurrentConsumption() {
    var name = props.devices.find(
      (device) => device.name === props.id
    ).name;
    var value = props.devices.find(
      (device) => device.name === props.id
    ).state
    var state = value <= 0 ? 'OFF' : 'ON: ' + value + 'kWh' 
    return name + ' ' + state 
  }
}

export default OverviewTopDownDeviceElement;
