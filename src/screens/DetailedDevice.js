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
  
  const { device } = location.state;

  const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
  };

  const timerRef = useRef(null);


  useEffect(() => {
    document.title = "SmartRoom – " + device.display_name;
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
  }, [navigate]);

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
      <button className="back-button" onClick={() => navigate(-1)} />
        <h2 className="title">{device.display_name}</h2>
      <div className="card vertical">
        <div
          key={id}
          className="card-image vertical"
          style={{
            backgroundImage: `url('/resources/${id}.svg')`,
          }}
        />
        <Graphs item_name={openHABItem.name}/>
      </div>
    </div>
    );
  }
};

export default DetailedDevice;
