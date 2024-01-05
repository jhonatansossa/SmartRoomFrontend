import measurements from "../dummyData/Measurements"

export default function apiCallBackend(requestbody) {
    let auth = sessionStorage.getItem("auth");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: sessionStorage.getItem("token") },
      body: JSON.stringify(requestbody)
    };

    return fetch('https://smart-room.fly.dev/api/v1/devices/getlastmeasurements', requestOptions)
      .then(response => {
          if (!response.ok) {
              return measurements
            } else {
              return response.json()
            }
        })
        .catch(e => {
          console.log(e)
          return measurements
        });
}