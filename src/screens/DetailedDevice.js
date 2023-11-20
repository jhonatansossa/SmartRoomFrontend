import { React, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Graphs from "../components/Graphs";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import { token } from "./Login/Login";
import base64 from 'base-64';

const DetailedDevice = () => {
  const [openHABItem, setOpenHABItem] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  //let base64 = require("base-64");
  const config = {
    headers: { Authorization: token },
  };

  const timerRef = useRef(null);

  useEffect(() => {
    document.title = "SmartRoom – " + id;
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      timerRef.current = setInterval(function () {
        fetchOpenHABItem();
      }, 1000);
      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, []);

  const fetchOpenHABItem = async () => {
    const response = await Axios(
      openHAB.url + "/api/v1/devices/items/" + id + "_ACTIVE_EXPORT_KWH",
      config
    );
    setOpenHABItem(response.data);
  };

  if (openHABItem === undefined) {
    return <div />;
  } else {
    return (
      <div className="vertical-scroll-area">
        <h2 className="title">
          {openHABItem.stateDescription.options[0].value}
        </h2>
        <div className="card vertical">
          <div
            key={id}
            className="card-image vertical"
            style={{
              backgroundImage: `url('/resources/${id}.svg'`,
            }}
          />
          <div className="card-title card-content">
            <p>
              Current consumption: <b>{openHABItem.state} kWh</b>
            </p>
          </div>
        </div>
        <Graphs />
      </div>
    );
  }
};

export default DetailedDevice;
