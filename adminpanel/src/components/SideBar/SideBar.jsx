import React from "react";
import { Link } from "react-router-dom";
import {assets} from "../../assets/assets"
import "./SideBar.css";

const SideBar = ({sidebarVisible}) => {
  return (
    <div
      className={`custom-sidebar border-end bg-white ${
        sidebarVisible ? "" : "d-none"
      }`}
      id="sidebar-wrapper"
    >
      <div className="sidebar-heading border-bottom bg-light text-center py-4">
        <img
          src={assets.deliveryboy}
          alt="Logo"
          height={70}
          width={70}
          className="sidebar-logo mb-2"
        />
        <h5 className="mb-0 text-muted">Admin Panel</h5>
      </div>

      <div className="list-group list-group-flush">
        <Link
          className="list-group-item list-group-item-action custom-link"
          to="/add"
        >
          <i className="bi bi-plus-square me-2"></i> Add Food
        </Link>
        <Link
          className="list-group-item list-group-item-action custom-link"
          to="/list"
        >
          <i className="bi bi-list-ul me-2"></i> List Food
        </Link>
        <Link
          className="list-group-item list-group-item-action custom-link"
          to="/orders"
        >
          <i className="bi bi-truck me-2"></i> Orders
        </Link>
      </div>
    </div>
  );

};

export default SideBar;
