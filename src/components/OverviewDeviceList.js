import { React } from "react";
import { generatePath, useNavigate } from "react-router-dom";

function OverviewDeviceList(props) {
  let navigate = useNavigate();

  const redirectToDevices = () => {
    navigate("/devices");
  };

  function redirectToDetailedDevice(id) {
    let path = generatePath("/devices/:id/details", { id });
    navigate(path);
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
              redirectToDetailedDevice(src.stateDescription.options[2].value)
            }
          >
            <div
              key = {src.title}
              className = "card-image horizontal"
              style={{
                backgroundImage: `url('/resources/${src.stateDescription.options[2].value}.svg')`,
              }}
            />
            <div className="card-title horizontal">
              {src.stateDescription.options[0].value}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default OverviewDeviceList;
