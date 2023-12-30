import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { token, isUserAdmin } from "../screens/Login/Login";
import openHAB from '../openHAB/openHAB';
import axios from 'axios';

const DelayConfigurator = () => {

  const isUserAdmin = sessionStorage.getItem("isAdmin") === "true";
  let navigate = useNavigate();
  const [timers, setTimers] = useState([]);

  // const config = {
  //   headers: { Authorization: token },
  // };
  
  const config = {
    headers: { Authorization: sessionStorage.getItem("token") },
  };

  useEffect(() => {
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      fetchTimers();
    }
  }, []);

  const fetchTimers = async () => {
    try {
      const response = await axios(openHAB.url + "/api/v1/devices/get_alarm_timers", config);
      setTimers(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  const updateTimer = async (id) => {
    const { timer_value, timer_units } = timers[id];
  
    const parsedTimerValue = parseInt(timer_value, 10);
  
    if (isNaN(parsedTimerValue)) {
      console.error('Invalid timer_value:', timer_value);
      return;
    }
  
    try {
      await axios.put(openHAB.url + '/api/v1/devices/set_alarm_timers', {
        id,
        timer_units,
        timer_value: parsedTimerValue,
      }, config);
    } catch (error) {
      console.error("Error updating the timer:", error);
    }  
  }

  const handleNumberChange = (id, newValue) => {
    const modifiedTimers = [...timers];
    modifiedTimers[id] = { ...modifiedTimers[id], timer_value: newValue };

    setTimers(modifiedTimers);
  };

  const handleUnitsChange = (id, newUnits) => {
    const modifiedTimers = [...timers];
    modifiedTimers[id] = { ...modifiedTimers[id], timer_units: newUnits };

    setTimers(modifiedTimers);
  };

  const renderContent = () => {
    console.log(isUserAdmin)
    if (!isUserAdmin) {
      return null;
    }

    return (
      <div className="timer-grid-container">
        {timers.map((timer) => {
          const alertName = timer.alert_name.split('_').join(' ');
          
          return (
            <div key={timer.id} className="timer">
              <h4 className="timer-grid-title">{alertName}</h4>
              <span className="grid-line"></span>
              <div className="timer-grid-contain">
                <div className="timer-status">
                  <input
                    type="number"
                    value={timer.timer_value}
                    onChange={(e) => handleNumberChange(timer.id, e.target.value)}
                    className="timer-input"
                  />
                  <select
                    value={timer.timer_units}
                    onChange={(e) => handleUnitsChange(timer.id, e.target.value)}
                    className="timer-input"
                  >
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                  </select>
                  <button
                    onClick={() => updateTimer(timer.id)}
                    className="timer-input"
                  > Save
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default DelayConfigurator;
