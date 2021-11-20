import React from "react";
import { Col, Row } from "react-bootstrap";

const Overview = () => {
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
          <div>Turned on</div>
          <button className="btn-primary-no-background">View all</button>
        </div>

        <div className="scroll-area">
          {devices_turnedOn.map((src) => (
            <div
              key={src.title}
              className="card"
              style={{
                backgroundImage: `url(${src.image})`,
              }}
            >
              <div className="card-title">{src.title}</div>
            </div>
          ))}
        </div>
        <div className="header">
          <div>Frequently used</div>
          <button className="btn-primary-no-background">View all</button>
        </div>
        <div className="scroll-area">
          {devices_frequentlyUsed.map((src) => (
            <div
              key={src.title}
              className="card"
              style={{
                backgroundImage: `url(${src.image})`,
              }}
            >
              <div className="card-title">{src.title}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const devices_turnedOn = [
  { image: "/logo192.png", title: "device1" },
  { image: "/logo192.png", title: "device2" },
  { image: "/logo192.png", title: "device3" },
  { image: "/logo192.png", title: "device4" },
  { image: "/logo192.png", title: "device5" },
  { image: "/logo192.png", title: "device6" },
];

const devices_frequentlyUsed = [
  { image: "/logo192.png", title: "device1" },
  { image: "/logo192.png", title: "device2" },
  { image: "/logo192.png", title: "device3" },
];

export default Overview;
