import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./screens/Login/Login";
import Overview from "./screens/Overview";
import DetailedDevice from "./screens/DetailedDevice";
import DetailedSwitch from "./screens/DetailedSwitch";
import AllDevices from "./screens/AllDevices";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/overview" element={<Overview />} />
            <Route path="/devices" element={<AllDevices />} />
            <Route path="/devices/:id/details" element={<DetailedDevice />} />
            <Route path="/switches/:id/details" element={<DetailedSwitch />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
