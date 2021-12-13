import {React, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ToggleButton from 'react-toggle-button'
import Axios from "axios";

const DetailedSwitch = () => {
    const { id } = useParams();

    //Fetching openHAB switch item
    const [openHABItem,setOpenHABItem]=useState([])

    const config = {
        headers: { Authorization: `Bearer oh.testToken.JpBfn4tkeRgYr7jV2MQi2xiNqfbZUdxJVWjIwfNDOLmo28MEbk10YmxGgYRs16Y752YXmgdqpU8D7htg` }
    };

    useEffect(() => {
        fetchOpenHABItem();
    }, [])

    const fetchOpenHABItem=async()=>{
        // https://community.openhab.org/t/cors-problem/113063  --> If requests not working
        const response=await Axios('http://localhost:8080/rest/items/' + id, config);
        setOpenHABItem(response.data)
    }

    var switchOn = false;
    if(openHABItem.state === 'ON'){
        switchOn = true;
    }

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
        </label>
          <ToggleButton
              value={ self.state.value || false }
              onToggle={(value) => {
                  self.setState({
                      value: !value,
                  })
              }} />
      </div>
    </div>
  );
};

export default DetailedSwitch;
