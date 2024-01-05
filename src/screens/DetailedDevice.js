import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Graphs from "../components/Graphs";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";

const DetailedDevice = () => {
  const [openHABItem, setOpenHABItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
  };

  const timerRef = useRef(null);
  const displayNameRef = useRef(null);

  const { device } = location.state;
  let deviceName = device.display_name;

  const splitId = id.split('_');
  const itemId = splitId[splitId.length-1];
  const thingId = splitId[splitId.length-2];

  useEffect(() => {
    document.title = "SmartRoom – " + deviceName;
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      timerRef.current = setInterval(() => {
        fetchOpenHABItem();
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [deviceName, navigate]);

  const fetchOpenHABItem = async () => {
    try {
      const response = await Axios.get(
        openHAB.url+"/api/v1/devices/items/"+id,
        config
      );
      setOpenHABItem(response.data);
    } catch (error) {
      console.error("Error fetching OpenHAB item:", error);
      // Puedes manejar el error de manera más informativa aquí
    }
  };

  const setNewDisplayName = async () => {
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
      deviceName = newName;
      navigate(-1);
    } catch (error) {
      console.log("Error saving new display name");
    }
  }

  if (openHABItem === null) {
    // Puedes mostrar un indicador de carga aquí
    return <div>Loading...</div>;
  } else {
    return (
      <div className="vertical-scroll-area">
        <h2 className="title">{deviceName}</h2>
        <div className="card vertical">
          <div className="card-content">
            Modify device name
            <input
              ref={displayNameRef}
              type="text"
              placeholder={deviceName}
              className="timer-input"
            />
            <button
              onClick={() => setNewDisplayName()}
              className="timer-input"
            > Save
            </button>
          </div>
        </div>
        <div className="card vertical">
          <div
            key={id}
            className="card-image vertical"
            style={{
              backgroundImage: `url('/resources/${id}.svg')`,
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
