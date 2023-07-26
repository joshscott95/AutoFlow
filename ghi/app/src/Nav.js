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
            <li><NavLink className="dropdown-item" to="/technicians/create">Create</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown-appts" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Appointments
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to="/appointments/">List All</NavLink></li>
            <li><NavLink className="dropdown-item" to="/appointments/create">Create</NavLink></li>
          </ul>
        </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
