import { React } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";

function OverviewDeviceList(props) {
  let navigate = useNavigate();

  const redirectToDevices = () => {
    navigate("/devices");
  };

  function redirectToDetailedDevice(device) {
    const id = device.name;
    let path = generatePath("/devices/:id/details", { id });
    navigate(path, { state: { device }});
  }

  function printId(label) {
  const deviceTypes = ['Camera', 'Sensor', 'TV', 'LIGHT', 'Lamps', "Lamp", "Thermostat", "Metervoltage"];
  let imageName = "";
  //console.log(label, "  kleviii");
  const lowercasedLabel = label.toLowerCase();

  for (const type of deviceTypes) {
    const lowercasedType = type.toLowerCase();

    if (lowercasedLabel.includes(lowercasedType)) {
      switch (type) {
        case 'Camera':        imageName = openHAB.devices.CAMERA_ID;        break;
        case 'Sensor':        imageName = openHAB.devices.SENSOR_ID;        break;
        case 'TV':            imageName = openHAB.devices.TV_ID;            break;
        case 'LIGHT':         imageName = openHAB.devices.LIGHT_ID;         break;
        case 'Lamp':          imageName = openHAB.devices.LAMP_ID;          break;
        case 'Lamps':         imageName = openHAB.devices.LAMP_ID;          break;
        case 'Thermostat':    imageName = openHAB.devices.THERMOSTAT_ID;    break;
        case 'Metervoltage':  imageName = openHAB.devices.METERVOLTAGE_ID;  break;
        default: break;
      }
      break;
    }
  }

  return imageName;
}

  function shortname(parameter) {
    const fullWord = parameter.split('_');
    const indiceSwitch = fullWord.indexOf('switch');

    const selection = indiceSwitch !== -1 ? fullWord.slice(0, indiceSwitch) : fullWord.slice(0, 2);
    const result = selection.join(' ');

    return result;
  }

  return (
    <>
      <div className="header">
        <div className="section-header">
          {props.name + " (" + props.deviceList.length + ")"}
        </div>
        <button
          onClick={redirectToDevices}
          className="btn-primary-no-background"
        >
          View all
        </button>
      </div>

      <div className="scroll-area">
        {props.deviceList.length === 0 && (
            <div
                className="altList"
                style={{
                  color: '#ef962e',
                  fontStyle: 'italic',
                }}
            >No devices found</div>
        )}
        {props.deviceList.map((src) => (
          <button
            className="card hov-primary horizontal"
            onClick={() =>
              redirectToDetailedDevice(src)
            }
          >
            <div
              key = {src.title}
              className = "card-image horizontal"
              onClick={() =>{
                printId(src.name)
              }}
              style={{
                backgroundImage: `url('/resources/${printId(src.label)}.svg')`,
              }}
            />
            <div className="card-title horizontal">
              {src.display_name}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default OverviewDeviceList;
