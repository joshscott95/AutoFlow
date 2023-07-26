import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonList from './SalesPersonsList';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SaleForm from './SaleForm';
import SaleList from './SaleList';
import SalesPersonHistory from './SalesPersonHistory';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople-create" element={<SalesPersonForm />} />
          <Route path="/salespeople-list" element={<SalesPersonList />} />
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/sale-form" element={<SaleForm />} />
          <Route path="/sale-list" element={<SaleList />} />
          <Route path="/salesperson-history" element={<SalesPersonHistory />} />
          <Route path="/automobile-form" element={<AutomobileForm />} />
          <Route path="/automobile-list" element={<AutomobileList />} />
          <Route path="/manufacturer-form" element={<ManufacturerForm />} />
          <Route path="/manufacturer-list" element={<ManufacturerList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
