import { React } from "react";
import ReactTooltip from "react-tooltip";

function Counter(props) {
  var unitDescription = "";
  if (props.unitDescription !== "") {
    unitDescription = " = " + props.unitDescription;
  }

  return (
    <div className="counterItem">
      <div class="counter" data-target={props.value}>
        0
      </div>
      <div>
        <div
          className="counterHelp"
          data-tip={props.unit + unitDescription + "<br />" + props.description}
        >
          <div className="counterUnit">{props.unit}</div>
          <img src="help.svg" width="14px" height="14px" />
        </div>
        <ReactTooltip multiline={true} />
      </div>
    </div>
  );
}

export default Counter;
