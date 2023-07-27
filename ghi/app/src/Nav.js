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
            Service
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><h6 class="dropdown-header">Technicians</h6></li>
            <li><NavLink className="dropdown-item" to="/technicians/">List All</NavLink></li>
            <li><NavLink className="dropdown-item" to="/technicians/create/">Create</NavLink></li>
            <li><hr class="dropdown-divider"/></li>
            <li><h6 class="dropdown-header">Appointments</h6></li>
            <li><NavLink className="dropdown-item" to="/appointments/">List Active</NavLink></li>
            <li><NavLink className="dropdown-item" to="/appointments/create/">Create</NavLink></li>
            <li><hr class="dropdown-divider"/></li>
            <li><h6 class="dropdown-header">Service History</h6></li>
            <li><NavLink className="dropdown-item" to="/appointments/history/">List All</NavLink></li>
          </ul>
        </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/salespeople-create">Create salesperson</NavLink>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink className="nav-link" to="/salespeople-list">Salespeople</NavLink>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink className="nav-link" to="/customer-form">Create customer</NavLink>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink className="nav-link" to="/customer-list">Customers</NavLink>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink className="nav-link" to="/sale-form">Create a sale</NavLink>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink className="nav-link" to="/sale-list">Sales</NavLink>
            </li>
            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink className="nav-link" to="/salesperson-history">Salesperson History</NavLink>
            </li>
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown-techs" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Inventory
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><h6 class="dropdown-header">Inventory</h6></li>
            <li><NavLink className="dropdown-item" to="/automobile-list/">List All</NavLink></li>
            <li><NavLink className="dropdown-item" to="/automobile-form/">Create</NavLink></li>
            <li><hr class="dropdown-divider"/></li>
            <li><h6 class="dropdown-header">Models</h6></li>
            <li><NavLink className="dropdown-item" to="/models/">List All</NavLink></li>
            <li><NavLink className="dropdown-item" to="/models/create/">Create</NavLink></li>
            <li><hr class="dropdown-divider"/></li>
            <li><h6 class="dropdown-header">Manufacturers</h6></li>
            <li><NavLink className="dropdown-item" to="/manufacturer-list/">List All</NavLink></li>
            <li><NavLink className="dropdown-item" to="/manufacturer-form/">Create</NavLink></li>
          </ul>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
