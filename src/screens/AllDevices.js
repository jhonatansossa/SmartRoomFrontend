import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import base64 from 'base-64';
import { token } from "./Login/Login";
const AllDevices = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);

  //let base64 = require("base-64");
  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    document.title = "SmartRoom – All devices";
    let auth = sessionStorage.getItem("auth")
    if(auth !== "true") {
      navigate("/login");
    }else{
      fetchOpenHABItems();
    }
  }, []);

  const fetchOpenHABItems = async () => {
    const response = await Axios(openHAB.url + "/api/v1/devices/items", config);
    setOpenHABItems(response.data);
  };

  var devices = [];
  openHABItems.forEach(function (item) {
    if ("Switch" === item.type) {
      devices.push(item);
    }
  });

  function redirectToDetailedDevice(id) {
    let path = generatePath("/devices/:id/details", { id });
    navigate(path);
  }

  return (
    <> 
    {devices.length === 0 &&
      <div className="noDevicesPopup">
        No devices found. Make sure openHAB is running!
      </div>
    }

      <div className="vertical-scroll-area">
        {devices.map((src) => (
          <button
            className="card hov-primary vertical"
            onClick={() =>
              redirectToDetailedDevice(25)
            }
          >
            {
              <div
                key={src.title}
                className="card-image vertical"
                style={{
                  backgroundImage: `25`,
                }}
              />
            }
            <div className="card-title vertical">
              {25}
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default AllDevices;
