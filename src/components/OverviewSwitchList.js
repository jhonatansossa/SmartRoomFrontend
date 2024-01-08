import { React } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import openHAB from "../openHAB/openHAB";

function OverviewSwitchList(props) {
  let navigate = useNavigate();

  const redirectToSwitches = () => {
    navigate("/switches");
  };

  function redirectToDetailedSwitch(device) {
    const id = device.name;
    let path = generatePath("/switches/:id/details", { id });
    navigate(path, { state: { device }});
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
          {props.name + " (" + props.switchList.length + ")"}
        </div>
        <button
          onClick={redirectToSwitches}
          className="btn-primary-no-background"
        >
          View all
        </button>
      </div>

      <div className="scroll-area">
        {props.switchList.length === 0 && (
            <div
                className="altList"
                style={{
                  color: '#ef962e',
                  fontStyle: 'italic',
                }}
            >No switches found</div>
        )}
        {props.switchList.map((src) => (
          <button
            className="card hov-primary horizontal"
            onClick={() => redirectToDetailedSwitch(src)}
          >
            <div
              key={src.label}
              className="card-image horizontal"
              style={{
                //backgroundImage: `url('/resources/${src.name}.svg')`,
                backgroundImage: `url('/resources/${openHAB.switches.LIGHT_SWITCH_ID}.svg')`,
              }}
            />
            <div className="card-title horizontal">{src.display_name}</div>
          </button>
        ))}
      </div>
    </>
  );
}

export default OverviewSwitchList;
