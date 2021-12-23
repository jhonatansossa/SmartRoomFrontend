import React, { useEffect, useState } from "react";
import Axios from "axios";
import openHAB from "../openHAB/openHAB";
import OverviewTopDownDeviceElement from "../components/OverviewTopDownDeviceElement";
import OverviewTopDownSwitchElement from "../components/OverviewTopDownSwitchElement";
import OverviewDeviceList from "../components/OverviewDeviceList";
import OverviewSwitchList from "../components/OverviewSwitchList";
import OverviewTopDownStaticElement from "../components/OverviewTopDownStaticElement";

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

  // Overall consumption counter - Animation
  const counters = document.querySelectorAll(".counter");
  for (let n of counters) {
    const updateCount = () => {
      const target = +n.getAttribute("data-target");
      const count = +n.innerText;
      const speed = 500; // change animation speed here
      const inc = target / speed;
      if (count < target) {
        n.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        n.innerText = target;
      }
    };
    updateCount();
  }

  return (
    <>
      <div>
        <div className="card cardCounter">
          <div class="counter" data-target="200000">
            0
          </div>
          <div className="counterUnit">kW/h</div>
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
