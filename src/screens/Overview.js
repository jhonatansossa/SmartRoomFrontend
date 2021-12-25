import React, { useEffect, useState } from "react";
import Axios from "axios";
import openHAB from "../openHAB/openHAB";
import OverviewTopDownDeviceElement from "../components/OverviewTopDownDeviceElement";
import OverviewTopDownSwitchElement from "../components/OverviewTopDownSwitchElement";
import OverviewDeviceList from "../components/OverviewDeviceList";
import OverviewSwitchList from "../components/OverviewSwitchList";
import OverviewTopDownStaticElement from "../components/OverviewTopDownStaticElement";
import Counter from "../components/Counter";

const Overview = () => {
  //Fetching openHAB switches
  const [openHABItems, setOpenHABItems] = useState([]);

  const config = {
    headers: {
      Authorization: openHAB.token,
    },
  };

  useEffect(() => {
    document.title = "SmartRoom – Overview";
    setInterval(function () {
      fetchOpenHABItems();
    }, 1000);
  }, []);

  const fetchOpenHABItems = async () => {
    const response = await Axios(openHAB.url + "/rest/items", config);
    setOpenHABItems(response.data);
  };

  var switches = [];
  var devices = [];
  openHABItems.forEach(function (item) {
    if (item.type === "Switch") {
      if ("stateDescription" in item) {
        if ("readOnly" in item.stateDescription) {
          if (item.stateDescription.readOnly === false) switches.push(item);
        }
      }
    }
    if ("stateDescription" in item) {
      if ("options" in item.stateDescription) {
        if (item.stateDescription.options !== []) {
          item.stateDescription.options.forEach(function (value) {
            if (value.value === "device") {
              devices.push(item);
            }
          });
        }
      }
    }
  });

  //Turned on devices
  var totalConsumption = 0.0;
  var turnedOnDevices = [];
  devices.forEach(function (item) {
    if (item.state > 0) {
      turnedOnDevices.push(item);
      console.log(item.label + item.state);
      totalConsumption = parseFloat(totalConsumption) + parseFloat(item.state);
    }
  });

  return (
    <>
      <div>
        <div className="card cardCounter">
          <Counter
            value={totalConsumption}
            text="Total consumption in kWh"
            unit="kWh"
            unitDescription="Kilowatt hours"
            description="This value represents the total overall energy consumption of the smart room"
            decimals="2"
          />
          <Counter
            value={totalConsumption / devices.length}
            text="Average consumption in kWh"
            unit="kWh"
            unitDescription="Kilowatt hours"
            description="This value represents the average overall energy consumption per device of the smart room"
            decimals="2"
          />
          <Counter
            value={devices.length}
            text="Devices"
            description="This value represents the amount of devices in the smart room"
            decimals="0"
          />
          <Counter
            value={turnedOnDevices.length}
            text="Turned on devices"
            description="This value represents the amount of turned on devices in the smart room"
            decimals="0"
          />
          <Counter
            value={switches.length}
            text="Switches"
            description="This value represents the amount of switches in the smart room"
            decimals="0"
          />
        </div>

        <div className="flex-container">
          <OverviewTopDownStaticElement id="circle" name="Round table" />
          <OverviewTopDownStaticElement id="horRectangle" name="Table" />
          <OverviewTopDownStaticElement id="server" name="Server" />
          <OverviewTopDownStaticElement id="door" name="Door" />

          {devices.map((device) => (
            <OverviewTopDownDeviceElement
              id={device.stateDescription.options[2].value}
              devices={devices}
            />
          ))}

          {switches.map((s) => (
            <OverviewTopDownSwitchElement id={s.name} switches={switches} />
          ))}
        </div>
        <OverviewDeviceList name={"Turned on"} deviceList={turnedOnDevices} />
        <OverviewSwitchList name={"Switches"} switchList={switches} />
      </div>
    </>
  );
};

export default Overview;
