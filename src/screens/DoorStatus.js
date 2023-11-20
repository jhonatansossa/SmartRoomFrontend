import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import OpenDoor from "../Images/dooropened.png";
import CloseDoor from "../Images/doorclosed.jpg";
import ToggleButton from "react-toggle-button";
import { token } from "./Login/Login";
import base64 from 'base-64';




const DoorStatus = () => {
  let navigate = useNavigate();

  const [openHABItems, setOpenHABItems] = useState([]);
  const [toggle, setToggle] = useState(false);

  //let base64 = require("base-64");
  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    document.title = "SmartRoom – Door Status";
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
    if (item.name === "Door_Sensor_sensordoor_12_01"){
      var doorStatus = item.state;
      devices.push(item);
    }
  });

   /*
    

    
    */
   
  return (
    <>

      {devices.length === 0 &&
      <div className="noDevicesPopup">
        No door found. Make sure openHAB is running!
      </div>}
      <ToggleButton
        value={toggle}
        onToggle={() => {
          setToggle(!toggle);
        }}
      />

      {!toggle &&
      <div className="DoorClose">
        
        <h2 className="title" align="center">Door Status<br></br><br></br></h2>
        <p align="center" margin-left="2px"><img src={CloseDoor}></img></p>

        <h4 align="center"><br></br>The door is closed</h4>
        
      </div>}

      {toggle &&
      <div className="DoorOpen">
        
      <h2 className="title" align="center">Door Status<br></br><br></br></h2>
      <p align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={OpenDoor}></img></p>

      <h4 align="center"><br></br>The door is opened</h4>
      
    </div>}
  

    </>
  );
};

export default DoorStatus;

