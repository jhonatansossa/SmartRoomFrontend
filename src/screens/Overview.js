import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import openHAB from "../openHAB/openHAB";
import OverviewTopDownDeviceElement from "../components/OverviewTopDownDeviceElement";
import OverviewTopDownSwitchElement from "../components/OverviewTopDownSwitchElement";
import OverviewDeviceList from "../components/OverviewDeviceList";
import OverviewSwitchList from "../components/OverviewSwitchList";
import OverviewTopDownStaticElement from "../components/OverviewTopDownStaticElement";
import Counter from "../components/Counter";
import { useNavigate } from "react-router-dom";
import { token } from "./Login/Login";
import base64 from 'base-64';

var regex = /^(?!.*Sensor).*$/i;

const Overview = () => {
  const [openHABItems, setOpenHABItems] = useState([]);
  const [peopleInsideRoom, setPeopleInsideRoom] = useState()
  const [energyConsumptionData, setEnergyConsumptionData] = useState({
    averageEnergy: 0,
    devicesCount: 0,
    switchCount: 0,
    totalEnergy: 0,
  });

  const navigate = useNavigate();

  const config = {
    headers: { Authorization: token },
    };

  const timerRef = useRef(null);

  useEffect(() => {
    document.title = "SmartRoom – Overview";
    let auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      navigate("/login");
    } else {
      timerRef.current = setInterval(function () {
        fetchOpenHABItems();
        fetchEnergyConsumptionData();
        fetchPeopleInsideRoom();
      }, 1000);
      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, []);

  const fetchPeopleInsideRoom = async () => {
  try {
    const response = await Axios.get(openHAB.url + "/api/v1/devices/roomstatus", config);
    console.log(response.data.amount); // Access the correct key
    const numberOfPeopleInsideRoom = response.data.amount;
    setPeopleInsideRoom(numberOfPeopleInsideRoom);
  } catch (error) {
    console.error("Error fetching number of people inside the room:", error);
  }
};

  const fetchOpenHABItems = async () => {
    const response = await Axios.get(openHAB.url + "/api/v1/devices/items", config);
    setOpenHABItems(response.data);
  };

  const fetchEnergyConsumptionData = async () => {
    try {
      const response = await Axios.get(
        openHAB.url + "/api/v1/devices/energy_consumption",
        config
      );

      //console.log("Energy Consumption Response:", response.data);

      // Update state with the fetched energy consumption data
      setEnergyConsumptionData({
        averageEnergy: response.data.average_energy,
        devicesCount: response.data.devices_count,
        switchCount: response.data.switch_count,
        totalEnergy: response.data.total_energy,
      });
      
      
    } catch (error) {
      console.error("Error fetching energy consumption data:", error);
    }
  };


  var switches = [];
  var devices = [];
  openHABItems.forEach(function (item) {
    if (item.type === "Switch" && regex.test(item.name)) {
      switches.push(item);
    }
    if (item.type === "Switch" && !regex.test(item.name)){
      devices.push(item);
    }
    if ("Switch" !== item.type) {
      devices.push(item);
    }
  });

  //Turned on devices
  var totalConsumption = 0.0;
  var turnedOnDevices = [];
  openHABItems.forEach(function (item) {
  const isOn =  item.state === 'ON';

  if (isOn) {
    turnedOnDevices.push(item);
    totalConsumption += Number.parseFloat(item.state);
  }
  });

  function getTurnedOnDevices() {
  return turnedOnDevices.filter(device => device.state === "ON");
}

  return (
    <>
      <div>
        <div className="card cardCounter">
          <Counter
            value={energyConsumptionData.totalEnergy}
            text="Total consumption in kWh"
            unit="kWh"
            unitDescription="Kilowatt hours"
            description="This value represents the total overall energy consumption of the smart room"
            decimals="2"
          />
          <Counter
            value={energyConsumptionData.averageEnergy}
            text="Average consumption in kWh"
            unit="kWh"
            unitDescription="Kilowatt hours"
            description="This value represents the average overall energy consumption per device of the smart room"
            decimals="2"
          />
          <Counter
            value={energyConsumptionData.devicesCount}
            text="Devices"
            description="This value represents the amount of devices in the smart room"
            decimals="0"
          />
          <Counter
            value={energyConsumptionData.devicesCount}
            text="Turned on devices"
            description="This value represents the amount of turned on devices in the smart room"
            decimals="0"
          />
          <Counter
            value={energyConsumptionData.switchCount}
            text="Switches"
            description="This value represents the amount of switches in the smart room"
            decimals="0"
          />
          <Counter
            value={peopleInsideRoom}
            text="People inside the Room"
            description="This value represents the number of the people inside the smart room"
            decimals="0"
          />
        </div>

        <div className="flex-container">
          <OverviewTopDownStaticElement id="tv1" name="TV1"/>
          <OverviewTopDownStaticElement id="tv2" name="TV2" />
          <OverviewTopDownStaticElement id="sofa" name="Sofa" />
          <OverviewTopDownStaticElement id="window1" name="Window" />
          <OverviewTopDownStaticElement id="window2" name="Window" />
          <OverviewTopDownStaticElement id="lamp1" name="Lamp" />
          <OverviewTopDownStaticElement id="lamp2" name="Lamp" />
          <OverviewTopDownStaticElement id="server" name="Server" />
          <OverviewTopDownStaticElement id="door" name="Door" />
          <OverviewTopDownStaticElement id="camera" name="Camera" />

          {devices.length === 0 && devices.length === 0 && (
            <div className="noDevicesPopup">
              No devices or switches found. Make sure openHAB is running!
            </div>
          )}

          

          {/* {devices.map((device) => (
            <OverviewTopDownDeviceElement
              id = {device.name}
              devices = {devices}
            />
          ))} */}

          {switches.map((s) => (
            <OverviewTopDownSwitchElement id={s.name} switches={switches} />
          ))}
        </div>
        
        <OverviewDeviceList
          name = {"Turned on devices"}
          deviceList={turnedOnDevices}
        />
        <OverviewSwitchList name={"Switches"} switchList={switches} />
      </div>
    </>
  );
};


export default Overview;