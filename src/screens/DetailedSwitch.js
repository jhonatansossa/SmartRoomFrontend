import {React, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ToggleButton from "react-toggle-button";
import Axios from "axios";
import axios from "axios";
import openHAB from "../openHAB/openHAB";

const DetailedSwitch = () => {
    const {id} = useParams();

    //Fetching openHAB switch item
    const [openHABItem, setOpenHABItem] = useState([]);
    const [toggle, setToggle] = useState(false); // Switch toggle handler
    const [responseStatus, setResponseStatus] = useState([]);

    const config = {
        headers: {
            Authorization: openHAB.token,
            "Content-Type": "text/plain",
        },
    };

    useEffect(() => {
        fetchOpenHABItem();
    }, []);

    const fetchOpenHABItem = async () => {
        // https://community.openhab.org/t/cors-problem/113063  --> If requests not working
        const response = await Axios(openHAB.url + "/rest/items/" + id, config);
        setOpenHABItem(response.data);
    };

    if (openHABItem.state === "ON") {
        setToggle(true);
    }

    async function sendOpenHABRequest(toggle) {
        if (toggle) {
            axios
                .post(openHAB.url + "/rest/items/" + id, "OFF", config)
                .then((response) => {
                    setResponseStatus(response.data);
                    console.log(responseStatus);
                });
        } else {
            axios
                .post(openHAB.url + "/rest/items/" + id, "ON", config)
                .then((response) => {
                    setResponseStatus(response.data);
                    console.log(responseStatus);
                });
        }
    }

    // Initialize a boolean state
    return (
        <div className="vertical-scroll-area">
            <h2 className="title">{openHABItem.label}</h2>
            <ToggleButton
                value={toggle}
                onToggle={() => {
                    setToggle(!toggle);
                    sendOpenHABRequest(toggle);
                }}
            />
        </div>
    );
};

export default DetailedSwitch;
