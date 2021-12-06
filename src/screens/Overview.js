import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, generatePath } from "react-router-dom";
import PopUp from "../components/PopUp";
// import '../popup.css';

const updateColor = (volts, watts) => {
  let color;
  if (volts < 25 && watts < 100) {
    color = "#6aa84f";
  } else if (volts > 25 && volts < 35 && watts > 100 && watts < 250) {
    color = "#ef962e";
  } else {
    color = "#cc4125";
  }
  return { color };
};

const Overview = () => {
  let navigate = useNavigate();
  // const history = useHistory();

  const redirectToDevices = () => {
    navigate("/devices");
  };

  function redirectToDetailed(id) {
    let path = generatePath("/details/:id", { id });
    navigate(path);
  }

  let volts = 26;
  let watts = 101;

  const [seen, setSeen] = useState(false);

  // onClick={() => setSeen(!seen)}

  // {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
  console.log(seen);
  return (
    <>
      <div>
        <div className="flex-container">
          <div id="circle"></div>
          <div id="horRectangle"></div>
          <div id="door"></div>
          <div
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="washer"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>

          <div
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="tv"
            className="rectangle"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>
          <div
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="kitchen"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>
          <div
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="refrigerator"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>
          <div
            onClick={() => setSeen(!seen)}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            style={{ backgroundColor: updateColor(volts, watts).color }}
            id="dryer"
            className="square"
          >
            <div>
              {volts}W<br />
              {watts}V
            </div>
          </div>

          {seen ? <PopUp /> : null}
        </div>

        <div className="header">
          <div className="section-header">Turned on</div>
          <button
            onClick={redirectToDevices}
            className="btn-primary-no-background"
          >
            View all
          </button>
        </div>

        <div className="scroll-area">
          {devices_turnedOn.map((src) => (
            <button
              className="card hov-primary horizontal"
              onClick={() => redirectToDetailed(src.title)}
            >
              <div
                key={src.title}
                className="card-image horizontal"
                style={{
                  backgroundImage: `url(${src.image})`,
                }}
              ></div>
              <div className="card-title horizontal">{src.title}</div>
            </button>
          ))}
        </div>
        <div className="header">
          <div className="section-header">Frequently used</div>
          <button
            onClick={redirectToDevices}
            className="btn-primary-no-background"
          >
            View all
          </button>
        </div>
        <div className="scroll-area">
          {devices_frequentlyUsed.map((src) => (
            <button
              className="card hov-primary horizontal"
              onClick={() => redirectToDetailed(src.title)}
            >
              <div
                key={src.title}
                className="card-image horizontal"
                style={{
                  backgroundImage: `url(${src.image})`,
                }}
              ></div>
              <div className="card-title horizontal">{src.title}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const devices_turnedOn = [
  { title: "device1", image: "/logo192.png" },
  { title: "device2", image: "/logo192.png" },
  { title: "device3", image: "/logo192.png" },
  { title: "device4", image: "/logo192.png" },
  { title: "device5", image: "/logo192.png" },
  { title: "device6", image: "/logo192.png" },
];

const devices_frequentlyUsed = [
  { title: "device7", image: "/logo192.png" },
  { title: "device8", image: "/logo192.png" },
  { title: "device9", image: "/logo192.png" },
];

export default Overview;
