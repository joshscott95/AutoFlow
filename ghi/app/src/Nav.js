import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown-techs" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Technicians
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/technicians/">List All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/create/">Create</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown-appts" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Appointments
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/appointments/">List All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/create/">Create</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/history/">Service History</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown-sales" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Salespeople</a>
                  <ul>
                    <li><NavLink className="dropdown-item" to="/salespeople-create">Create salesperson</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/salespeople-list">Salespeople</NavLink></li>
                  </ul>
                </li>
                <li><a className="dropdown-item" href="#">Customers</a>
                  <ul>
                    <li><NavLink className="dropdown-item" to="/customer-form">Create customer</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/customer-list">Customers</NavLink></li>
                  </ul>
                </li>
                <li><a className="dropdown-item" href="#">Sales</a>
                  <ul>
                    <li><NavLink className="dropdown-item" to="/sale-form">Create a sale</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/sale-list">Sales</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/salesperson-history">Salesperson History</NavLink></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown-models" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Models
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/models/">List All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/create/">Create</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown-autos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Autos
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown-autos">
                <li><a className="dropdown-item" href="#">Automobiles</a>
                  <ul>
                    <li><NavLink className="dropdown-item" to="/automobile-form">Automobile Form</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/automobile-list">Automobiles</NavLink></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavLink className="nav-link" to="/manufacturer-form">Manufacturer form</NavLink>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavLink className="nav-link" to="/manufacturer-list">Manufacturers</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
