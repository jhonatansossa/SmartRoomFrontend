import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
      <footer className="text-center text-white fixed-bottom">
          <div className="text-center p-3" style={{backgroundColor: "#ef962e"}}>
              Copyright &copy; SmartRoom
          </div>
      </footer>
  );
};

export default Footer;
