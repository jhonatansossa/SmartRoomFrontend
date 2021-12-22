import React, {useEffect, useState} from "react";
import Axios from "axios";
import {generatePath, useNavigate} from "react-router-dom";
import openHAB from "../openHAB/openHAB";
import ReactTooltip from "react-tooltip";

const updateColor = (kwh) => {
    let color;
    if (kwh <= 0) {
        color = "#818181";
    } else {
        color = "#ef962e";
    }
    return {color};
};

const updateColorSwitch = (state) => {
    let color;
    if (state === "OFF") {
        color = "#818181";
    } else {
        color = "#ef962e";
    }
    return {color};
};

const Overview = () => {
    let navigate = useNavigate();

    const redirectToDevices = () => {
        navigate("/devices");
    };

    function redirectToDetailedDevice(id) {
        let path = generatePath("/devices/:id/details", {id});
        navigate(path);
    }

    function redirectToDetailedSwitch(id) {
        let path = generatePath("/switches/:id/details", {id});
        navigate(path);
    }

    let kwh = 26;

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
            turnedOnDevices.push(item)
            console.log(item.label + item.state)
            totalConsumption = parseFloat(totalConsumption) + parseFloat(item.state);
        }
    });

    function containsDevices(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].stateDescription.options[2].value === val) return true;
        }
        return false;
    }

    function containsSwitches(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === val) return true;
        }
        return false;
    }

    return (
        <>
            <div>
                <div className="flex-container">
                    <div id="circle"
                         data-tip
                         data-for='roundTableToolTip'/>
                    <ReactTooltip id='roundTableToolTip'>
                        <span>Round table</span>
                    </ReactTooltip>
                    <div id="horRectangle"
                         data-tip
                         data-for='tableToolTip'/>
                    <ReactTooltip id='tableToolTip'>
                        <span>Table</span>
                    </ReactTooltip>
                    <div
                        id="server"
                        data-tip
                        data-for='serverToolTip'
                    />
                    <ReactTooltip id='serverToolTip'>
                        <span>Server</span>
                    </ReactTooltip>
                    <div id="door"
                         data-tip
                         data-for='doorToolTip'/>
                    <ReactTooltip id='doorToolTip'>
                        <span>Door</span>
                    </ReactTooltip>

                    {containsDevices(devices, openHAB.devices.WASHING_MACHINE_ID) &&
                        < div
                            onClick={() => redirectToDetailedDevice(openHAB.devices.WASHING_MACHINE_ID)}
                            style={{backgroundColor: updateColor(devices.find(device => device.stateDescription.options[2].value === openHAB.devices.WASHING_MACHINE_ID).state).color}}
                            id="washer"
                            className="square"
                            data-tip
                            data-for='washingMachineToolTip'
                        >
                            <ReactTooltip id='washingMachineToolTip'>
                                <span>Washing machine</span>
                            </ReactTooltip>
                            <div className="deviceData">
                                {devices.find(device => device.stateDescription.options[2].value === openHAB.devices.WASHING_MACHINE_ID).state}
                                <br/> kWh
                            </div>
                        </div>
                    }

                    {containsSwitches(switches, openHAB.switches.LIGHT_SWITCH_ID) &&
                        <div
                            onClick={() => redirectToDetailedDevice(openHAB.switches.LIGHT_SWITCH_ID)}
                            style={{backgroundColor: updateColorSwitch(switches.find(s => s.name === openHAB.switches.LIGHT_SWITCH_ID).state).color}}
                            id="lamp"
                            className="square"
                            data-tip
                            data-for='ZWaveNode004HS2SKZSmartMeteringPlug_SwitchToolTip'
                        >
                            <ReactTooltip id='ZWaveNode004HS2SKZSmartMeteringPlug_SwitchToolTip'>
                                <span>Light switch</span>
                            </ReactTooltip>
                            <div className="deviceData">
                                {switches.find(s => s.name === openHAB.switches.LIGHT_SWITCH_ID).state}<br/>
                            </div>
                        </div>
                    }

                    {containsDevices(devices, openHAB.devices.OVEN_ID) &&
                        <div
                            onClick={() => redirectToDetailedDevice(openHAB.devices.OVEN_ID)}
                            style={{backgroundColor: updateColor(devices.find(device => device.stateDescription.options[2].value === openHAB.devices.OVEN_ID).state).color}}
                            id="oven"
                            className="square"
                            data-tip
                            data-for='ovenToolTip'
                        >
                            <ReactTooltip id='ovenToolTip'>
                                <span>Oven</span>
                            </ReactTooltip>
                            <div>
                                {devices.find(device => device.stateDescription.options[2].value === openHAB.devices.OVEN_ID).state}
                                <br/> kWh
                            </div>
                        </div>
                    }

                    {containsDevices(devices, openHAB.devices.OVEN_FAN_ID) &&
                        <div
                            onClick={() => redirectToDetailedDevice(openHAB.devices.OVEN_FAN_ID)}
                            style={{backgroundColor: updateColor(devices.find(device => device.stateDescription.options[2].value === openHAB.devices.OVEN_FAN_ID).state).color}}
                            id="ovenFan"
                            className="square"
                            data-tip
                            data-for='ovenFanToolTip'
                        >
                            <ReactTooltip id='ovenFanToolTip'>
                                <span>Oven fan</span>
                            </ReactTooltip>
                            <div>
                                <div>
                                    {devices.find(device => device.stateDescription.options[2].value === openHAB.devices.OVEN_FAN_ID).state}
                                    <br/> kWh
                                </div>
                            </div>
                        </div>
                    }

                    {containsDevices(devices, openHAB.devices.MODEM_ID) &&
                        <div
                            onClick={() => redirectToDetailedDevice(openHAB.devices.MODEM_ID)}
                            style={{backgroundColor: updateColor(devices.find(device => device.stateDescription.options[2].value === openHAB.devices.MODEM_ID).state).color}}
                            id="modem"
                            className="square"
                            data-tip
                            data-for='modemToolTip'
                        >
                            <ReactTooltip id='modemToolTip'>
                                <span>Modem</span>
                            </ReactTooltip>
                            <div>
                                {devices.find(device => device.stateDescription.options[2].value === openHAB.devices.MODEM_ID).state}
                                <br/> kWh
                            </div>
                        </div>
                    }

                    {containsDevices(devices, openHAB.devices.REFRIGERATOR_ID) &&
                        <div
                            onClick={() => redirectToDetailedDevice(openHAB.devices.REFRIGERATOR_ID)}
                            style={{backgroundColor: updateColor(devices.find(device => device.stateDescription.options[2].value === openHAB.devices.REFRIGERATOR_ID).state).color}}
                            id="refrigerator"
                            className="square"
                            data-tip
                            data-for='refrigeratorToolTip'
                        >
                            <ReactTooltip id='refrigeratorToolTip'>
                                <span>Refrigerator</span>
                            </ReactTooltip>
                            <div>
                                {devices.find(device => device.stateDescription.options[2].value === openHAB.devices.REFRIGERATOR_ID).state}
                                <br/> kWh
                            </div>
                        </div>
                    }

                    {containsDevices(devices, openHAB.devices.DRYER_ID) &&

                        <div
                            onClick={() => redirectToDetailedDevice(openHAB.devices.DRYER_ID)}
                            style={{backgroundColor: updateColor(devices.find(device => device.stateDescription.options[2].value === openHAB.devices.DRYER_ID).state).color}}
                            id="dryer"
                            className="square"
                            data-tip
                            data-for='dryerToolTip'
                        >
                            <ReactTooltip id='dryerToolTip'>
                                <span>Dryer</span>
                            </ReactTooltip>
                            <div>
                                {devices.find(device => device.stateDescription.options[2].value === openHAB.devices.DRYER_ID).state}
                                <br/> kWh
                            </div>
                        </div>
                    }

                    {containsDevices(devices, openHAB.devices.DISHWASHER_ID) &&

                        <div
                            onClick={() => redirectToDetailedDevice(openHAB.devices.DISHWASHER_ID)}
                            style={{backgroundColor: updateColor(devices.find(device => device.stateDescription.options[2].value === openHAB.devices.DISHWASHER_ID).state).color}}
                            id="dishWasher"
                            className="square"
                            data-tip
                            data-for='dishWasherToolTip'
                        >
                            <ReactTooltip id='dishWasherToolTip'>
                                <span>Dish Washer</span>
                            </ReactTooltip>
                            <div>
                                {devices.find(device => device.stateDescription.options[2].value === openHAB.devices.DISHWASHER_ID).state}
                                <br/> kWh
                            </div>
                        </div>
                    }
                </div>

                <div className="header">
                    <div className="section-header">Turned on</div>
                    <button
                        onClick={redirectToDevices}
                        className="btn-primary-no-background"
                    >
                        View all
                    </button>
                </div>

                <div className="scroll-area">
                    {turnedOnDevices.map((src) => (
                        <button
                            className="card hov-primary horizontal"
                            onClick={() =>
                                redirectToDetailedDevice(src.stateDescription.options[2].value)
                            }
                        >
                            <div
                                key={src.title}
                                className="card-image horizontal"
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

                <div className="header">
                    <div className="section-header">Switches</div>
                </div>
                <div className="scroll-area">
                    {switches.map((src) => (
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
            </div>
        </>
    );
};

export default Overview;
