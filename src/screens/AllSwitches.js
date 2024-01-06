import React, { useEffect, useState } from "react";
import Axios from "axios";
import ToggleButton from "react-toggle-button";
import openHAB from "../openHAB/openHAB";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { token } from "./Login/Login";
var regex = /^(?!.*Sensor).*$/i;

const AllSwitches = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);
  const [responseStatus, setResponseStatus] = useState([]);
  const [toggle, setToggle] = useState(false); // Switch toggle handler

  const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
  };

  const postConfig = {
    headers: {
      Authorization: token,
      "Content-Type": "text/plain",
    },
  };

  useEffect(() => {
    document.title = "SmartRoom – All devices";
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      fetchOpenHABItems();
    }
  }, []);

  const fetchOpenHABItems = async () => {
    try {
      const response = await Axios.get(openHAB.url + "/api/v1/devices/items", config);
      setOpenHABItems(response.data);
      console.log("OpenHAB items:", response.data);
    } catch (error) {
      console.error("Fetch OpenHAB items error:", error);
    }
  };

  var switches = [];
  openHABItems.forEach(function (item) {
    if (item.type === "Switch" && regex.test(item.name)) {
      switches.push(item);
    }
  });

  // const toggleSwitch = (item) => {
  //   console.log("Toggling switch:", item);

  //   const newState = item.state === "OFF" ? "ON" : "OFF";

  //   Axios.get(openHAB.url + "/api/v1/devices/items/" + item.name, {
  //     params: { state: newState },
  //     ...postConfig,
  //   })
  //     .then((response) => {
  //       console.log("Toggle response:", response.data);
  //       setResponseStatus(response.data);
  //       fetchOpenHABItems();
  //     })
  //     .catch((error) => {
  //       console.error("Toggle error:", error);
  //     });
  // };

  const toggleSwitch = (item) => {
    console.log("Toggling switch:", item);

    const updatedSwitches = openHABItems.map((s) =>
    s.name === item.name ? { ...s, state: item.state === "OFF" ? "ON" : "OFF" } : s
    );
    setOpenHABItems(updatedSwitches);


      // Initiate API call
      Axios.get(openHAB.url + "/api/v1/devices/items/" + item.name, {
        params: { state: item.state === "OFF" ? "ON" : "OFF" },
        ...postConfig,
      })
        .then((response) => {
          console.log("Toggle response:", response.data);
          setResponseStatus(response.data);

          // Fetch the updated state from the server asynchronously
          fetchOpenHABItems();
        })
        .catch((error) => {
          console.error("Toggle error:", error);
        });
  };


  async function sendOpenHABRequest(name, state) {
    const tokens = name.split('_');
    const xtokens = tokens.slice(-2);
    state = state.toLowerCase();
    if (state === "on") {
      Axios
        .post(openHAB.url + "/api/v1/devices/items/" + xtokens[0] + "/" + xtokens[1] + "/state", {"state": "OFF"}, config)
        .then((response) => {
          setResponseStatus(response.data);
        });
    } else {
      Axios
        .post(openHAB.url + "/api/v1/devices/items/" + xtokens[0] + "/" + xtokens[1] + "/state", {"state": "ON"}, config)
        .then((response) => {
          setResponseStatus(response.data);
        });
    }
  }

  return (
    <>
      <div>
        <button className="back-button" onClick={() => navigate(-1)} />
      </div>
      {switches.length === 0 && (
        <div className="noDevicesPopup">
          No switches found. Make sure openHAB is running!
        </div>
      )}
      {switches.length > 0 && (
        <div className="vertical-scroll-area">
          {switches.map((src) => (
            <div key={src.title} className="card hov-primary vertical">
              <div
                className="card-image vertical"
                style={{
                  backgroundImage: `url('/resources/${openHAB.switches.LIGHT_SWITCH_ID}.svg')`,
                  filter:
                    src.state === "OFF"
                      ? "invert(35%) sepia(24%) saturate(6006%) hue-rotate(349deg) brightness(84%) contrast(89%)"
                      : "invert(56%) sepia(39%) saturate(532%) hue-rotate(57deg) brightness(98%) contrast(90%)",
                }}
              />
              <div
                className="card-title vertical"
                style={{
                  color: src.state === "OFF" ? "#cc4125" : "#6aa84f",
                }}
              >
                {src.label}
              </div>
              <div className="toggle-container">
                <ToggleButton
                  id={`switchToggle-${src.name}`}
                  value={src.state === "ON"}
                  onToggle={() => {
                    toggleSwitch(src);
                    sendOpenHABRequest(src.name, src.state);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllSwitches;
