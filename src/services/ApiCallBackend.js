import measurements from "../dummyData/Measurements"

export default function apiCallBackend(requestbody) {
    let auth = sessionStorage.getItem("auth");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestbody)
    };

    return fetch('http://127.0.0.1:5000/api/v1/devices/getlastmeasurements', requestOptions)
      .then(response => {
          console.log('res' + response.json())
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