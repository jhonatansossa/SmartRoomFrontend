import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './screens/Login';
import Overview from './screens/Overview';
import Detailed from './screens/Detailed';
import AllDevices from './screens/AllDevices';
import HomeScreen from './screens/HomeScreen';



const App = () => {
  return (
    <Router>
          <Header/>
          <main className='py-3'>
          <Container>
              <Routes>
                <Route path="/" element={<HomeScreen/>} exact/>       
                <Route path="/overview" element={<Overview/>}/>                 
                <Route path="/devices" element={<AllDevices/>}/>                 
                <Route path="/detailed" element={<Detailed/>}/>
                <Route path="/login" element={<Login/>}/>                 
                 


          
              </Routes>
            </Container>
          </main> 
          <Footer/>
    </Router>
  )
}

export default App;
