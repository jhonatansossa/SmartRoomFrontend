import {React} from "react";
import {useParams} from "react-router-dom";
import Graphs from "../components/Graphs";

const DetailedDevice = () => {
    const {id} = useParams();

    return (
        <div className="vertical-scroll-area">
            <h2 className="title">{id}</h2>
            <div className="card vertical">
                <div
                    key={id}
                    className="card-image vertical"
                    style={{
                        backgroundImage: `url('/resources/${id}.png'`,
                    }}
                />
                <div className="card-title card-content">
                    <p>
                        Current voltage: 30V<br/>
                        Current power: 240W
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
