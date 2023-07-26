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
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
