import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const NotFoundComponent = () => {
    let navigate = useNavigate();


    useEffect(() => {
        navigate("/404");
    }, []);

    return(
        <div>
        </div>
    );
}

export default NotFoundComponent