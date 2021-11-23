import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, generatePath } from "react-router-dom";

const AllDevices = () => {
  let navigate = useNavigate();

  function redirectToDetailed(id) {
    let path = generatePath("/details/:id", { id });
    navigate(path);
  }

  return (
    <div className="vertical-scroll-area">
      {devices.map((src) => (
        <button
          className="card hov-primary vertical"
          onClick={() => redirectToDetailed(src.title)}
        >
          <div
            key={src.title}
            className="card-image vertical"
            style={{
              backgroundImage: `url(${src.image})`,
            }}
          ></div>
          <div className="card-title vertical">{src.title}</div>
        </button>
      ))}
    </div>
  );
};

const devices = [
  { title: "device1", image: "/logo192.png" },
  { title: "device2", image: "/logo192.png" },
  { title: "device3", image: "/logo192.png" },
  { title: "device4", image: "/logo192.png" },
  { title: "device5", image: "/logo192.png" },
  { title: "device6", image: "/logo192.png" },
  { title: "device7", image: "/logo192.png" },
  { title: "device8", image: "/logo192.png" },
  { title: "device9", image: "/logo192.png" },
  { title: "device10", image: "/logo192.png" },
  { title: "device11", image: "/logo192.png" },
  { title: "device12", image: "/logo192.png" },
];

export default AllDevices;
