import { React } from "react";
import ReactTooltip from "react-tooltip";

function Counter(props) {
  // Animation counter
  // Source: https://www.cssscript.com/number-countup-animation-counter/
  const counters = document.querySelectorAll(".counter");
  for (let n of counters) {
    const updateCount = () => {
      const target = +n.getAttribute("data-target");
      const count = +n.innerText;
      const speed = 5000; // Animation speed
      const inc = target / speed;
      if (count < target) {
        n.innerText = Math.ceil(count + inc) + ".00";
        setTimeout(updateCount, 1);
      } else {
        n.innerText = Math.round(target * 100) / 100;
      }
    };
    updateCount();
  }

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
