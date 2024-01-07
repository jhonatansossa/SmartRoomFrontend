import { React } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

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
    navigate(path, { state: { device }});
  }

  return (
    <div
      onClick={() => redirectToDetailedSwitch(props.switches.find((s) => s.name === props.id), props.id)}
      style={{
        backgroundColor: updateColorSwitch(
          props.switches.find((s) => s.name === props.id).state
        ).color,
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
