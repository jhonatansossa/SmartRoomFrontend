import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Graphs from "../components/Graphs";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import { token } from "./Login/Login";
import base64 from 'base-64';

const DetailedDevice = () => {
  const [openHABItem, setOpenHABItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
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
      timerRef.current = setInterval(() => {
        fetchOpenHABItem();
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [id, navigate]);

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

  if (openHABItem === null) {
    // Puedes mostrar un indicador de carga aquí
    return <div>Loading...</div>;
  } else {
    return (
      <div className="vertical-scroll-area">
        <h2 className="title">{openHABItem.label}</h2>
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
