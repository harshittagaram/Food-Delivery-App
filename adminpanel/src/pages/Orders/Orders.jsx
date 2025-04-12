import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Orders.css";

const Orders = () => {
  const [data,setData]= useState([]);
  const fetchOrders = async()=>{
    const response = await axios.get("http://localhost:8080/api/orders/all");
    setData(response.data);
  }

  const updateStatus = async(event , orderId)=>{
    const response = await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`);
    if(response.status===200){
      await fetchOrders();
    }
  };


  useEffect(()=>{
    fetchOrders();
  },[]);
  return (
    <div className="order-container">
      <h2 className="order-title">Order Dashboard</h2>
      <div className="order-wrapper">
        {data.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-header">
              <img
                src={assets.deliveryboy}
                alt="Delivery Boy"
                className="delivery-img"
              />
              <div className="order-info">
                <div className="order-items">
                  {(order.orderItems || [])
                    .map((item) => `${item.name} × ${item.quantity}`)
                    .join(", ")}
                </div>

                

                <div className="order-address">{order.userAddress}</div>
              </div>
            </div>
            <div className="order-details">
              <div className="order-amount">
                &#x20B9;{order.amount.toFixed(2)}
              </div>
              <div className="order-items-length text-muted small">
                Items: {order.orderItems?.length || 0}
              </div>
              <select
                className="order-status"
                onChange={(event) => updateStatus(event, order.id)}
                value={order.orderStatus}
              >
                <option value="Food Preparing">Food Preparing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Orders;
