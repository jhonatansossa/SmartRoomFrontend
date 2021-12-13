import React from "react";
import {generatePath, useNavigate} from "react-router-dom";

const AllDevices = () => {
    let navigate = useNavigate();

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [devices, setDevices] = React.useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    React.useEffect(() => {
        fetch("https://6a3619a8-5eb6-49fe-8061-829b4d1de332.mock.pstmn.io/allDevices")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDevices(result.devices);
                    console.log(result)
                    console.log(result.lastMeasurements)
                    console.log(result.device)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    console.log(devices)

    function redirectToDetailed(id) {
        let path = generatePath("/details/:id", {id});
        navigate(path);
    }


    return (
        <div className="vertical-scroll-area">
            {devices.map((src) => (
                <button
                    className="card hov-primary vertical"
                    onClick={() => redirectToDetailed(src.name)}
                >
                    {/* <div
            key={src.title}
            className="card-image vertical"
            style={{
              backgroundImage: `url(${src.image})`,
            }}
          ></div> */}
                    <div className="card-title vertical">{src.name}</div>
                </button>
            ))}
        </div>
    );
};

// const devices = [
//   { title: "device1", image: "/logo192.png" },
//   { title: "device2", image: "/logo192.png" },
//   { title: "device3", image: "/logo192.png" },
//   { title: "device4", image: "/logo192.png" },
//   { title: "device5", image: "/logo192.png" },
//   { title: "device6", image: "/logo192.png" },
//   { title: "device7", image: "/logo192.png" },
//   { title: "device8", image: "/logo192.png" },
//   { title: "device9", image: "/logo192.png" },
//   { title: "device10", image: "/logo192.png" },
//   { title: "device11", image: "/logo192.png" },
//   { title: "device12", image: "/logo192.png" },
// ];

export default AllDevices;
