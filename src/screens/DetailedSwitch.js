import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ToggleButton from "react-toggle-button";
import Axios from "axios";
import axios from "axios";
import openHAB from "../openHAB/openHAB";
import { token } from "./Login/Login";
import base64 from 'base-64';

  const DetailedSwitch = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //Fetching openHAB switch item
  const [openHABItem, setOpenHABItem] = useState([]);
  const [toggle, setToggle] = useState(false); // Switch toggle handler
  const [responseStatus, setResponseStatus] = useState([]);

  //let base64 = require("base-64");
  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    document.title = "SmartRoom – Details" ;
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      fetchOpenHABItem();
    }
  }, []);

  const fetchOpenHABItem = async () => {
    const response = await Axios(openHAB.url + "/api/v1/devices/items/" + id, config);
    setOpenHABItem(response.data);
    if (response.data.state === "ON") {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const tokens = id.split('_');
  const xtokens = tokens.slice(-2);

  async function sendOpenHABRequest(toggle) {
    if (toggle) {
      axios
        .post(openHAB.url + "/api/v1/devices/items/" + xtokens[0] + "/" + xtokens[1]+ "/state", {"state": "OFF"}, config)
        .then((response) => {
          setResponseStatus(response.data);
        });
    } else {
      axios
        .post(openHAB.url + "/api/v1/devices/items/" + xtokens[0] + "/" + xtokens[1] + "/state", {"state": "ON"}, config)
        .then((response) => {
          setResponseStatus(response.data);
        });
    }
  }

  return (
    <div className="vertical-scroll-area">
      <h2 className="title">{openHABItem.label}</h2>
      <ToggleButton
        value={toggle}
        onToggle={() => {
          setToggle(!toggle);
          sendOpenHABRequest(toggle);
        }}
      />
    </div>
  );
};

export default DetailedSwitch;
