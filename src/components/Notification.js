import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from "socket.io-client"
import openHAB from '../openHAB/openHAB';

const socket = io(openHAB.url);

const NotificationHandler = () => {
  const location = useLocation();

  useEffect(() => {
    socket.on("devices-off", (message) => {
      if (location.pathname !== "/login" && location.pathname !== "/404" && location.pathname !== "/") {
        alert(message.data);
      }
    });

    socket.on("door-alarm", (message) => {
      if (location.pathname !== "/login" && location.pathname !== "/404" && location.pathname !== "/") {
        alert(message.data);
      }
    });

    return () => {
      socket.off("devices-off");
      socket.off("door-alarm");
    }
  }, [location]);

  return null;
}

export default NotificationHandler;
