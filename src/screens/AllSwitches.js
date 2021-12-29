import React, {useEffect, useState} from "react";
import {generatePath, useNavigate} from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import Axios from "axios";
import axios from "axios";
import ToggleButton from "react-toggle-button";
import ReactTooltip from "react-tooltip";

const AllSwitches = () => {
    let navigate = useNavigate();

    const [openHABItems, setOpenHABItems] = useState([]);
    const [toggle, setToggle] = useState(false); // Switch toggle handler
    const [responseStatus, setResponseStatus] = useState([]);

    const config = {
        headers: {Authorization: openHAB.token},
    };

    const postConfig = {
        headers: {
            Authorization: openHAB.token,
            "Content-Type": "text/plain",
        },
    };

    useEffect(() => {
        document.title = "SmartRoom – All devices";
        let auth = sessionStorage.getItem("auth")
        if (auth !== "true") {
            navigate("/login");
        } else {
            fetchOpenHABItems();
        }
    }, []);

    const fetchOpenHABItems = async () => {
        const response = await Axios(openHAB.url + "/rest/items", config);
        setOpenHABItems(response.data);
    };

    var switches = [];
    openHABItems.forEach(function (item) {
        if (item.type === "Switch") {
            if ("stateDescription" in item) {
                if ("readOnly" in item.stateDescription) {
                    if (item.stateDescription.readOnly === false) switches.push(item);
                }
            }
        }
    });

    function redirectToDetailedSwitch(id) {
        let path = generatePath("/switches/:id/details", {id});
        navigate(path);
    }

    async function toggleAllSwitches(toggle) {
        switches.forEach(function (item) {
            if (toggle === 'ON') {
                axios
                    .post(openHAB.url + "/rest/items/" + item.name, "OFF", postConfig)
                    .then((response) => {
                        setResponseStatus(response.data);
                        console.log(responseStatus);
                    });
            } else {
                axios
                    .post(openHAB.url + "/rest/items/" + item.name, "ON", postConfig)
                    .then((response) => {
                        setResponseStatus(response.data);
                        console.log(responseStatus);
                    });
            }
        });
    }

    return (
        <>
            {switches.length === 0 &&
            <div className="noDevicesPopup">
                No switches found. Make sure openHAB is running!
            </div>
            }
            {switches.length > 0 &&
            <div className="card masterSwitch">
                <ToggleButton
                    id="masterToggle"
                    value={toggle}
                    onToggle={() => {
                        setToggle(!toggle);
                        toggleAllSwitches(toggle);
                    }}
                />
                <div className="masterSwitchContainer">
                    <div id="masterSwitchDesc">Master-Switch</div>
                    <img id="masterHelpIcon" src="help.svg" alt="help" width="14px" height="14px" data-tip
                         data-for="masterSwitch"/>
                    <ReactTooltip
                        id='masterSwitch'>
                        <span>Toogle all devices at once</span>
                    </ReactTooltip>
                </div>
            </div>
            }
            <div className="vertical-scroll-area">
                {switches.map((src) => (
                    <>
                        {src.state === 'OFF' &&
                        <button
                            id="switchOFF"
                            className="card hov-primary vertical"
                            onClick={() =>
                                redirectToDetailedSwitch(src.name)
                            }
                        >
                            {
                                <div
                                    key={src.title}
                                    className="card-image vertical"
                                    style={{
                                        backgroundImage: `url('/resources/${src.name}.svg')`,
                                        filter: 'invert(35%) sepia(24%) saturate(6006%) hue-rotate(349deg) brightness(84%) contrast(89%)',
                                    }}
                                />
                            }
                            <div
                                className="card-title vertical"
                                style={{
                                    color: '#cc4125',
                                }}
                            >
                                {src.label}
                            </div>
                        </button>
                        }
                        {src.state === 'ON' &&
                        <button
                            id='switchON'
                            className="card hov-primary vertical"
                            onClick={() =>
                                redirectToDetailedSwitch(src.name)
                            }
                        >
                            {
                                <div
                                    key={src.title}
                                    className="card-image vertical"
                                    style={{
                                        backgroundImage: `url('/resources/${src.name}.svg')`,
                                    }}
                                />
                            }
                            <div
                                className="card-title vertical"
                                style={{
                                    color: '#6aa84f',
                                    filter: 'invert(56%) sepia(39%) saturate(532%) hue-rotate(57deg) brightness(98%) contrast(90%)',
                                }}
                            >
                                {src.label}
                            </div>
                        </button>
                        }
                    </>
                ))}
            </div>
        </>
    );
};

export default AllSwitches;
