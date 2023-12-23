import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./screens/Login/Login";
import Overview from "./screens/Overview";
import DetailedDevice from "./screens/DetailedDevice";
import DetailedSwitch from "./screens/DetailedSwitch";
import AllDevices from "./screens/AllDevices";
import NotFoundComponent from "./components/NotFoundComponent";
import NotFound from "./screens/NotFound";
import AllSwitches from "./screens/AllSwitches";
import ControlPanel from "./screens/ControlPanel";
import NotificationHandler from "./components/Notification";


const App = () => {
        return (
            <Router>
                <Header/>
                <NotificationHandler/>
                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route path="/overview" element={<Overview/>}/>
                            <Route path="/devices" element={<AllDevices/>}/>
                            <Route path="/switches" element={<AllSwitches/>}/>
                            <Route path="/control" element={<ControlPanel/>}/>
                            <Route path="/devices/:id/details" element={<DetailedDevice/>}/>
                            <Route path="/switches/:id/details" element={<DetailedSwitch/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/" element={<Login/>}/>
                            <Route path='/404' element={<NotFound/>} />
                            <Route path='*' exact={true} element={<NotFoundComponent/>} />
                        </Routes>
                    </Container>
                </main>
                <Footer/>
            </Router>
        );
};

export default App;
