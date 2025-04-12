import {React,useContext, useState,useEffect} from 'react'
import './Menubar.css';
import {assets} from '../../assets/assets.js'
import { Link, useNavigate, useLocation } from "react-router-dom";
import {StoreContext} from '../../context/StoreContext.jsx';

const Menubar = () => {
  const [active, setActive] = useState("home");
  const { quantities, token, setToken, setQuantities } =
    useContext(StoreContext);
  const uniqueItemCount = Object.values(quantities).filter(
    (qty) => qty > 0
  ).length;

  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  // Update the active state based on the current route
  useEffect(() => {
    const path = location.pathname;

    // Set active state based on pathname
    if (path === "/") {
      setActive("home");
    } else if (path === "/explore") {
      setActive("explore");
    } else if (path === "/contact") {
      setActive("contact-us");
    } else if (path === "/cart") {
      setActive("cart");
    } else if (path === "/myorders") {
      setActive("myorders");
    } else {
      setActive(""); // Reset if no matching route
    }
  }, [location.pathname]); // Run whenever the location changes

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">
        <Link to="/">
          <img
            src={assets.deliveryboy2}
            alt=""
            className="mx-2"
            height={70}
            width={70}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  active === "home" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  active === "explore" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  active === "contact-us"
                    ? "nav-link fw-bold active"
                    : "nav-link"
                }
                to="/contact"
                onClick={() => setActive("contact-us")}
              >
                Contact us
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-4">
            <Link to={"/cart"} onClick={() => setActive("cart")}>
              <div className="position-relative">
                <img
                  src={assets.cart}
                  alt=""
                  height={32}
                  width={32}
                  className="position-relative"
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {uniqueItemCount}
                </span>
              </div>
            </Link>
            {!token ? (
              <>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={assets.user_green}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu text-small cursor-pointer">
                  <li
                    className="dropdown-item"
                    onClick={() => navigate("/myorders")}
                  >
                    Orders
                  </li>
                  <li className="dropdown-item" onClick={Logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};



export default Menubar;


