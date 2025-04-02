import React, { useState } from 'react';
import { Routes } from 'react-router-dom'
import ListFoods from './pages/ListFoods/ListFoods';
import Orders from './pages/Orders/Orders';
import SideBar from './components/SideBar/SideBar';
import MenuBar from './components/MenuBar/MenuBar';
import { Route } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import { ToastContainer } from "react-toastify";


const App = () => {
  const [sidebarVisible,setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="d-flex" id="wrapper">
      <SideBar sidebarVisible={sidebarVisible} />
      <div id="page-content-wrapper">
        <MenuBar
          toggleSidebar={toggleSidebar}
          sidebarVisible={sidebarVisible}
        />
        <ToastContainer/>
        <div className="container-fluid">
          <Routes>
            <Route path="/add" element={<AddFood />} />
            <Route path="/list" element={<ListFoods />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<ListFoods />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
