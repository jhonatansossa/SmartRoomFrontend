import { React } from "react";
import ReactTooltip from "react-tooltip";
import CountUp from "react-countup";

function Counter(props) {
  var unitDescription = "";
  if (props.unitDescription !== "") {
    unitDescription = " = " + props.unitDescription;
  }

  return (
    <div className="counterItem">
      <div class="counter" data-target={props.value}>
        <CountUp
          start={0}
          end={props.value}
          duration={2}
          decimals={props.decimals}
          decimal="."
        />
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
