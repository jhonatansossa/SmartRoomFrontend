import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import openHAB from "../openHAB/openHAB";
import { token } from "./Login/Login";
import ToggleButton from "react-toggle-button";
import OpenDoor from "../Images/dooropened.png";
import CloseDoor from "../Images/doorclosed.jpg";
import Window from "../Images/window.png";
import Camera from "../Images/camera_control_panel.png";
import DelayConfigurator from "../components/TimeConfig";



const ControlPanel = () => {
  let navigate = useNavigate();
  const [openHABItems, setOpenHABItems] = useState([]);
  const [backendResponseReceived, setBackendResponseReceived] = useState(false);
  const [toggleStates, setToggleStates] = useState({});

  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    document.title = "SmartRoom – Door Status";
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      fetchOpenHABItems();
    }
  }, []);

  const fetchOpenHABItems = async () => {
    try {
      const response = await Axios(openHAB.url + "/api/v1/devices/items", config);
      setOpenHABItems(response.data);

      const initialToggleStates = {};
      response.data
        .filter((item) => item.type === "Switch" && !item.label.toLowerCase().includes("sensor"))
        .forEach((item) => {
          const labelTokens = item.label.split('_');
          const thingID = labelTokens[labelTokens.length - 2];
          const itemID = labelTokens[labelTokens.length - 1];
          initialToggleStates[`${thingID}_${itemID}`] = item.state === "ON" ? "ON" : "OFF";
        });

      setToggleStates(initialToggleStates);
      setBackendResponseReceived(true);
    } catch (error) {
      console.error("Error fetching openHAB items:", error);
    }
  };

  async function sendOpenHABRequest(item) {
    const labelTokens = item.label.split('_');
    const thingID = labelTokens[labelTokens.length - 2];
    const itemID = labelTokens[labelTokens.length - 1];
    const newState = toggleStates[`${thingID}_${itemID}`] === "ON" ? "OFF" : "ON";

    try {
      await Axios.post(openHAB.url + `/api/v1/devices/items/${thingID}/${itemID}/state`, { state: newState }, config);

      setToggleStates((prevStates) => ({
        ...prevStates,
        [`${thingID}_${itemID}`]: newState
      }));

      setOpenHABItems((prevItems) => {
        const updatedItems = prevItems.map((prevItem) => {
          if (prevItem.name === item.name) {
            return {
              ...prevItem,
              state: newState
            };
          }
          return prevItem;
        });
        return updatedItems;
      });
    } catch (error) {
      console.error("Error sending openHAB request:", error);
    }
  }

  if (!backendResponseReceived) {
    return <div className="noDevicesPopup">Loading...</div>;
  }

  function shortname(parameter) {
    const fullWord = parameter.split('_');
    const indiceSwitch = fullWord.indexOf('switch');

    const selection = indiceSwitch !== -1 ? fullWord.slice(0, indiceSwitch) : fullWord.slice(0, 2);
    const result = selection.join(' ');

    return result;
  }

  const doorItem = openHABItems.find((item) => item.name === "Door_Sensor_sensordoor_12_01");
  const windowsItem = openHABItems.find((item) => item.name === "Window_Sensor_sensordoor_11_01");
  const windows2Item = openHABItems.find((item) => item.name === "Window_Sensor_sensordoor_11_01");

  if (!doorItem) {
    return (
      <div className="noDevicesPopup">
        No door found. Make sure openHAB is running!
      </div>
    );
  }

  const doorStatus = doorItem.state;
  const windowStatus = windowsItem.state;
  const window2Status = windows2Item.state;
  const switchItems = openHABItems.filter((item) => item.type === "Switch" && !item.label.toLowerCase().includes("sensor"));
  const devicesItems = openHABItems.filter((item) => (item.type === "Switch" && item.label.toLowerCase().includes("sensor")) || item.type !== "Switch" );

  var excluded_items = ['IP_Camera_Image_22_01', 'Color_LED_Lamp_color_19_03', 'Ceiling_Lamp_color_21_03', 'Motion_Sensor_luminance_13_02', 'Thermostat_targettemperature_04_02','LED_Lights_color_1000_04' ]

  const filteredDevicesItems = devicesItems.filter(
    (item) => !excluded_items.some((excludedLabel) => item.label.includes(excludedLabel))
  );
  
  return (
    <>
      <h1 className="control-title">Controls</h1>
      <DelayConfigurator />
      <div className="grid-container">
         {doorStatus === "CLOSED" && (
          <div className="door-grid">
            <h4 className="door-title">Door Status</h4>
            <span className="bar"></span>
            <img src={CloseDoor} alt="Door closed" />
            <span className="bar"></span>
            <p>The door is closed</p>
          </div>
        )}
         {doorStatus === "OPEN" && (
          <div className="DoorOpen">
            <h4 className="door-title">Door Status</h4>
            <span className="bar"></span>
            <img src={OpenDoor} alt="Door opened" />
            <span className="bar"></span>
            <p>The door is opened</p>
          </div>
        )}

        {windowStatus === "CLOSED" && (
          <div className="door-grid">
            <h4 className="door-title">Window 1</h4>
            <span className="bar"></span>
            <img src={Window} alt="window" className="window_img"/>
            <span className="bar"></span>
            <p>Status: Closed</p>
          </div>
        )}
        {windowStatus === "OPEN" && (
          <div className="DoorOpen">
            <h4 className="door-title">Window 1</h4>
            <span className="bar"></span>
            <img src={Window} alt="window" className="window_img"/>
            <span className="bar"></span>
            <p>Status: Opened</p>
          </div>
        )}

        {window2Status === "CLOSED" && (
          <div className="door-grid">
            <h4 className="door-title">Window 2</h4>
            <span className="bar"></span>
            <img src={Window} alt="window" className="window_img"/>
            <span className="bar"></span>
            <p>Status: Closed</p>
          </div>
        )}
        {window2Status === "OPEN" && (
          <div className="DoorOpen">
            <h4 className="door-title">Window 2</h4>
            <span className="bar"></span>
            <img src={Window} alt="window" className="window_img"/>
            <span className="bar"></span>
            <p>Status: Opened</p>
          </div>
        )}

        {windowStatus === "CLOSED" && (
          <div className="camera-grid">
            <h4 className="door-title">Camera</h4>
            <span className="bar"></span>
            <img src={Camera} alt="window" className="window_img"/>
            <span className="bar"></span>
            <p>Status: Active</p>
          </div>
        )}
        {windowStatus === "OPEN" && (
          <div className="DoorOpen">
            <h4 className="door-title">Camera</h4>
            <span className="bar"></span>
            <img src={Camera} alt="window" className="window_img"/>
            <span className="bar"></span>
            <p>Status: Active</p>
          </div>
        )}

        {switchItems.map((item) => {
          const labelTokens = item.label.split('_');
          const thingID = labelTokens[labelTokens.length - 2];
          const itemID = labelTokens[labelTokens.length - 1];

          return (
            <div key={item.name} className="sensor">
              <h4 className="grid-title">{shortname(item.label)}</h4>
              <span className="grid-line"></span>
              <div className="grid-contain">
                <div className="statusSwitch">
                  <ToggleButton
                    value={toggleStates[`${thingID}_${itemID}`] === "ON"}
                    onToggle={() => sendOpenHABRequest(item)}
                  />
                </div>
                <span className="magician"></span>
                <div className="consumption">{item.state}</div>
              </div>
            </div>
          );
        })}

        {filteredDevicesItems.map((item) => {
          const labelTokens = item.label.split('_');
          const thingID = labelTokens[labelTokens.length - 2];
          const itemID = labelTokens[labelTokens.length - 1];

          return (
            <div key={item.name} className="sensor">
              <h4 className="grid-title">{shortname(item.label)}</h4>
              <span className="grid-line"></span>
              <div className="grid-contain">
                <div className="consumption">{item.state}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ControlPanel;
