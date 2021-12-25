import { React } from "react";
import ReactTooltip from "react-tooltip";
import CountUp from "react-countup";

function Counter(props) {
  var details = "";
  if (props.unit !== undefined && props.unitDescription !== undefined) {
    details = props.unit + " = " + props.unitDescription + "<br />";
  }

  return (
    <div className="counterItem">
      <div class="counter">
        <CountUp
          start={0}
          end={props.value}
          duration={2}
          decimals={props.decimals}
          decimal="."
        />
      </div>
      <div>
        <div className="counterHelp" data-tip={details + props.description}>
          <div className="counterUnit">{props.text}</div>
          <img src="help.svg" width="14px" height="14px" />
        </div>
        <ReactTooltip multiline={true} />
      </div>
    </div>
  );
}

export default Counter;
