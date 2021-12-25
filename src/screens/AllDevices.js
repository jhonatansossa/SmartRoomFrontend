import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";

const AllDevices = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);

  const config = {
    headers: { Authorization: openHAB.token },
  };

  useEffect(() => {
    document.title = "SmartRoom – All devices";
    let auth = sessionStorage.getItem("auth")
    if(auth !== "true") {
      navigate("/login");
      fetchOpenHABItems();
    }
  }, []);

  const fetchOpenHABItems = async () => {
    const response = await Axios(openHAB.url + "/rest/items", config);
    setOpenHABItems(response.data);
  };

  var devices = [];
  openHABItems.forEach(function (item) {
    if ("stateDescription" in item) {
      if ("options" in item.stateDescription) {
        if (item.stateDescription.options !== []) {
          item.stateDescription.options.forEach(function (value) {
            if (value.value === "device") {
              devices.push(item);
            }
          });
        }
      }
    }
  });

  function redirectToDetailedDevice(id) {
    let path = generatePath("/devices/:id/details", { id });
    navigate(path);
  }

  return (
    <div className="vertical-scroll-area">
      {devices.map((src) => (
        <button
          className="card hov-primary vertical"
          onClick={() =>
            redirectToDetailedDevice(src.stateDescription.options[2].value)
          }
        >
          {
            <div
              key={src.title}
              className="card-image vertical"
              style={{
                backgroundImage: `url('/resources/${src.stateDescription.options[2].value}.svg')`,
              }}
            />
          }
          <div className="card-title vertical">
            {src.stateDescription.options[0].value}
          </div>
        </button>
      ))}
    </div>
  );
};

export default AllDevices;
