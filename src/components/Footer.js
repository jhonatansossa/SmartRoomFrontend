import React from "react";
import {useLocation} from "react-router-dom";

const Footer = () => {
    var location = useLocation()

    if(location.pathname === "/login" || location.pathname === "/404" || location.pathname === "/" ){
        return (
            <footer className="text-center text-white fixed-bottom">
                <div className="text-center p-3" style={{backgroundColor: "#ef962e"}}>
                    Copyright &copy; SmartRoom
                </div>
            </footer>
        );
    }else {
        return <div></div>
    }
};

export default Footer;
