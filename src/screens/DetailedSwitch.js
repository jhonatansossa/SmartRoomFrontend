import { React, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const DetailedSwitch = () => {
  const { id } = useParams();

    /*
    * Daten holen und Toogle button machen 
    */


  const src = {
    title: "device1",
    image: "/logo192.png",
    voltage: 30,
    power: 240,
    switchOn: true,
  };

  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(src.switchOn);

  // Switch toggle handler
  const toggleSwitch = () => {
    // When the handler is invoked
    // inverse the boolean state of switch
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="vertical-scroll-area">
      <div className="card vertical">
        <div className="card-title">JUST FOR DEMO: {id}</div>
      </div>
      <div
        className={
          passwordShown ? "card vertical switch-on" : "card vertical switch-off"
        }
      >
        <label
          className={passwordShown ? "switch switch-on" : "switch switch-off"}
        >
          <input
            type="checkbox"
            onClick={toggleSwitch}
            className="checkbox-icon"
          />
          Switched on
        </label>
      </div>
      <div className="card vertical">
        <div
          key={src.title}
          className="card-image vertical"
          style={{
            backgroundImage: `url(${src.image})`,
          }}
        ></div>
        <div className="card-title card-content">
          <p>
            Current voltage: {src.voltage}V<br />
            Current power: {src.power}W
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailedSwitch;
