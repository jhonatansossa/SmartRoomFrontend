import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import openHAB from "../openHAB/openHAB";
import OpenDoor from "../Images/dooropened.png";
import CloseDoor from "../Images/doorclosed.jpg";
import { token } from "./Login/Login";

const DoorStatus = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);
  const [backendResponseReceived, setBackendResponseReceived] = useState(false);

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
      setBackendResponseReceived(true);
    } catch (error) {
      console.error("Error fetching openHAB items:", error);
    }
  };

  if (!backendResponseReceived) {
    return <div className="noDevicesPopup" >Loading...</div>;
  }

  const doorItem = openHABItems.find((item) => item.name === "Door_Sensor_sensordoor_12_01");

  if (!doorItem) {
    return (
      <div className="noDevicesPopup">
        No door found. Make sure openHAB is running!
      </div>
    );
  }

  const doorStatus = doorItem.state;

  return (
    <>
      {doorStatus === "CLOSED" && (
        <div className="DoorClose">
          <h2 className="title" align="center">
            Door Status<br></br><br></br>
          </h2>
          <p align="center"><img src={CloseDoor} alt="Door closed" /></p>
          <h4 align="center"><br></br>The door is closed</h4>
        </div>
      )}

      {doorStatus === "OPEN" && (
        <div className="DoorOpen">
          <h2 className="title" align="center">
            Door Status<br></br><br></br>
          </h2>
          <p align="center"><img src={OpenDoor} alt="Door opened" /></p>
          <h4 align="center"><br></br>The door is opened</h4>
        </div>
      )}
    </>
  );
};

export default DoorStatus;