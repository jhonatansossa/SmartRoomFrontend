import { React } from "react";
import { generatePath, useNavigate } from "react-router-dom";

function OverviewSwitchList(props) {
  let navigate = useNavigate();

  const redirectToSwitches = () => {
    navigate("/switches");
  };

  function redirectToDetailedSwitch(id) {
    let path = generatePath("/switches/:id/details", { id });
    navigate(path);
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
            onClick={() => redirectToDetailedSwitch(src.name)}
          >
            <div
              key={src.label}
              className="card-image horizontal"
              style={{
                backgroundImage: `url('/resources/${src.name}.svg')`,
              }}
            />
            <div className="card-title horizontal">{src.label}</div>
          </button>
        ))}
      </div>
    </>
  );
}

export default OverviewSwitchList;
