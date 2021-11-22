import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, generatePath } from "react-router-dom";

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

  return (
    <>
      <div>
        <div
          style={{
            height: "240px",
          }}
        >
          Space for smart room overview
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
              className="card"
              onClick={() => redirectToDetailed(src.title)}
            >
              <div
                key={src.title}
                className="card-image"
                style={{
                  backgroundImage: `url(${src.image})`,
                }}
              ></div>
              <div className="card-title">{src.title}</div>
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
              className="card"
              onClick={() => redirectToDetailed(src.title)}
            >
              <div
                key={src.title}
                className="card-image"
                style={{
                  backgroundImage: `url(${src.image})`,
                }}
              ></div>
              <div className="card-title">{src.title}</div>
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
