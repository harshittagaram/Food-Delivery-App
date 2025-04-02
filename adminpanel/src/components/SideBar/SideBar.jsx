import React from "react";
import { Link } from "react-router-dom";
import {assets} from "../../assets/assets"

const SideBar = ({sidebarVisible}) => {
  return (
    <div
      className={`border-end bg-white ${sidebarVisible ? "" : "d-none"}`}
      id="sidebar-wrapper"
    >
      <div className="sidebar-heading border-bottom bg-light">
        <img src={assets.deliveryboy} alt="" height={70} width={70} className="mx-auto h-32 w-32"/>
      </div>
      <div className="list-group list-group-flush">
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/add"
        >
          <i className="bi bi-plus-square m-2"></i> Add Food
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/list"
        >
          <i className="bi bi-list-ul m-2"></i>List Food
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/orders"
        >
          <i className="bi bi-truck m-2"></i> Orders
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
