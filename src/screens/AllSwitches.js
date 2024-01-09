import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import ToggleButton from "react-toggle-button";
import openHAB from "../openHAB/openHAB";
import { useNavigate } from "react-router-dom";
import { token } from "./Login/Login";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CloseButton from 'react-bootstrap/CloseButton';

var regex = /^(?!.*Sensor).*$/i;

const AllSwitches = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);
  const [responseStatus, setResponseStatus] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const displayNameRef = useRef(null);
  const [userAdmin, setUserAdmin] = useState(false);

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
      fetchAdminStatus();
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

  const fetchAdminStatus = async () => {
    try {
      const response = await Axios.get(openHAB.url + "/api/v1/auth/me", config);
      const isUserAdmin = response.data.user_type === 1 ? true : false;
      setUserAdmin(isUserAdmin);
    } catch (error) {
      console.error("User auth fetch error:", error);
    }
  }

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

  const toggleMenu = (device) => {
    if (selectedDevice && selectedDevice.name === device.name) {
      closeEditMode();
    } else {
      setSelectedDevice(device);
      setEditMode(true);
    }
  };

  const setNewDisplayName = async () => {
    const splitId = selectedDevice.name.split('_');
    const itemId = splitId[splitId.length-1];
    const thingId = splitId[splitId.length-2];
    const newName = displayNameRef.current.value;

    if (newName.length === 0) {
      console.log("Empty name input");
      return;
    }
    try {
      await Axios.put(openHAB.url + '/api/v1/devices/new_item_names', {
        item_id: itemId,
        new_item_name: newName,
        thing_id: thingId,
      }, config);
      setOpenHABItems(prevOpenHABItems => {
        return prevOpenHABItems.map(item => {
          if (item.name === selectedDevice.name) {
            return {
              ...item,
              display_name: newName,
            };
          }
          return item;
        });
      });
    } catch (error) {
      console.log("Error saving new display name");
    }
    closeEditMode();
  };

  const closeEditMode = () => {
    setEditMode(false);
    setSelectedDevice(null);
  };

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
            <>
            <div style={{backgroundColor: src.state === "ON" ? "#D1EAF0" : "#FFFFFF"}} key={src.title} className="card hov-primary vertical toggle-separator">
              <div className="toggle-separator">
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
                  className="card-title vertical name-config"
                  style={{
                    color: src.state === "OFF" ? "#cc4125" : "#6aa84f",
                  }}
                >
                  {src.display_name}
                </div>
              </div>
              <DropdownButton id="dropdown-basic-button" title="...">
                <Dropdown.Item>
                  Turn On/Off
                  <ToggleButton
                    id={`switchToggle-${src.name}`}
                    value={src.state === "ON"}
                    onToggle={() => {
                      toggleSwitch(src);
                      sendOpenHABRequest(src.name, src.state);
                    }}
                  />
                </Dropdown.Item>
                {userAdmin && (
                  <Dropdown.Item onClick={() => toggleMenu(src)}>Change Name</Dropdown.Item>
                )}
                </DropdownButton>
            </div>
            {editMode && selectedDevice && selectedDevice.name === src.name && (
              <div className="card vertical toggle-separator">
                <div className="card-content toggle-separator">
                  <div className="toggle-separator">
                  <input
                    ref={displayNameRef}
                    type="text"
                    placeholder="Name"
                    defaultValue={src.display_name}
                    className="timer-name-input name-config"
                  />
                  <button
                      onClick={setNewDisplayName}
                      className="timer-name-input"
                  > Save
                  </button>
                  </div>
                </div>
                <CloseButton onClick={closeEditMode} className="timer-close">
                </CloseButton>
              </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default AllSwitches;
