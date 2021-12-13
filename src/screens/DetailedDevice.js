import {React} from "react";
import {useParams} from "react-router-dom";
import Graphs from "../components/Graphs";

const DetailedDevice = () => {
    const {id} = useParams();

    const src = {
        title: "device1",
        image: "/logo192.png",
        voltage: 30,
        power: 240,
        switchOn: true,
    };

    return (
        <div className="vertical-scroll-area">
            <div className="card vertical">
                <div className="card-title">JUST FOR DEMO: {id}</div>
            </div>
            <div className="card vertical">
                <div
                    key={src.title}
                    className="card-image vertical"
                    style={{
                        backgroundImage: `url(${src.image})`,
                    }}
                />
                <div className="card-title card-content">
                    <p>
                        Current voltage: {src.voltage}V<br/>
                        Current power: {src.power}W
                    </p>
                </div>
            </div>
            <div className="card vertical">
                <Graphs/>
            </div>
        </div>
    );
};

export default DetailedDevice;
