import React from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Detailed = () => {
  const { id } = useParams();

  return <div>Detailed screen {id}</div>;
};

export default Detailed;
