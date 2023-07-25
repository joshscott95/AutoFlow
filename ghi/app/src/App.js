import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonList from './SalesPersonsList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople-create" element={<SalesPersonForm />} />
          <Route path="/salespeople-list" element={<SalesPersonList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
