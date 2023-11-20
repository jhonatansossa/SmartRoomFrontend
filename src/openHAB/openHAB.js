const openHAB = {
    token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5OTgwODM1OSwianRpIjoiZjVjMzllOTMtZDlhYS00ODc5LWIyMDItOGMyYTI2MDNjODBjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NiwibmJmIjoxNjk5ODA4MzU5LCJleHAiOjE3MDAwNjc1NTl9.IEeV-LdMjWi-XcaI9wPZzDFjMCaTV5BRXl5vP_vBebE",
    username:
        "dsd@.com",
    password:
        "",
    url: "https://smart-room.fly.dev",
    devices: {
        OVEN_ID: "13",
        DISHWASHER_ID: "26",
        REFRIGERATOR_ID: "30",
        MODEM_ID: "27",
        OVEN_FAN_ID: "29",
        DRYER_ID: "31",
        WASHING_MACHINE_ID: "25",
    },
    switches: {
        LIGHT_SWITCH_ID: "ZWaveNode004HS2SKZSmartMeteringPlug_Switch"
    }
};

module.exports = openHAB;