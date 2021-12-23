import { React } from "react";

function Counter(props) {
  // Animation counter
  // Source: https://www.cssscript.com/number-countup-animation-counter/
  const counters = document.querySelectorAll(".counter");
  for (let n of counters) {
    const updateCount = () => {
      const target = +n.getAttribute("data-target");
      const count = +n.innerText;
      const speed = 500; // Animation speed
      const inc = target / speed;
      if (count < target) {
        n.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        n.innerText = Math.round(target);
      }
    };
    updateCount();
  }

  return (
    <div className="card cardCounter">
      <div class="counter" data-target={props.value}>
        0
      </div>
      <div className="counterUnit">kW/h</div>
    </div>
  );
}

export default Counter;
