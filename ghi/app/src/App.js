import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList'
import TechnicianForm from './TechnicianForm'
import AppointmentList from './AppointmentList'
import AppointmentForm from './AppointmentForm'
import SalesPersonForm from './SalesPersonForm';
import SalesPersonList from './SalesPersonsList';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import SalesPersonHistory from './SalesPersonHistory';


function App() {
  const [techs, setTechs] = useState([]);
  const [appts, setAppts] = useState([]);

  async function getTechs(){
    const response = await fetch('http://localhost:8080/api/technicians/')
    if(response.ok){
      const data = await response.json();
      setTechs(data.technicians)
    }
    else {
      console.error('An error occurred fetching technician data')
    }
  };

  async function getAppts(){
    const response = await fetch('http://localhost:8080/api/appointments/')
    if(response.ok){
      const data = await response.json();
      setAppts(data.appointments)
    }
    else {
      console.error('An error occurred fetching appointment data')
    }
  };

  useEffect(() => {
    getTechs();
    getAppts();
  }, []);


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/">
            <Route index element={<TechnicianList techs={techs} />} />
            <Route path="create/" element={<TechnicianForm getTechs={getTechs} />} />
          </Route>
          <Route path="/appointments/">
            <Route index element={<AppointmentList appts={appts} getAppts={getAppts} />} />
            <Route path="create/" element={<AppointmentForm techs={techs} getAppts={getAppts} />} />
          </Route>
          <Route path="/salespeople-create" element={<SalesPersonForm />} />
          <Route path="/salespeople-list" element={<SalesPersonList />} />
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/sale-form" element={<SaleForm />} />
          <Route path="/sale-list" element={<SaleList />} />
          <Route path="/salesperson-history" element={<SalesPersonHistory />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
