import {React, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom"
import ToggleButton from "react-toggle-button";
import Axios from "axios";
import axios from "axios";
import openHAB from "../openHAB/openHAB";

const DetailedSwitch = () => {
    const navigate = useNavigate();
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
        document.title = "SmartRoom – " + openHABItem.label;
        let auth = sessionStorage.getItem("auth")
        if(auth !== "true"){
            navigate("/login");
        }else {
            fetchOpenHABItem();
        }
    }, []);

    const fetchOpenHABItem = async () => {
        const response = await Axios(openHAB.url + "/rest/items/" + id, config);
        setOpenHABItem(response.data)
        setToggle(response.data.state)
    };

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
