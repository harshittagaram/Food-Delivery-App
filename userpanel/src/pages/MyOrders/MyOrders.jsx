import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets';
import "../MyOrders/MyOrders.css";

const MyOrders = () => {
    const {token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.get("http://localhost:8080/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`},
        });
        setData(response.data);
    };


    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]);

    

 return (
   <div className="container py-5">
     <h3 className="mb-4 text-center fw-bold">My Orders</h3>
     <div className="row g-4">
       {data.map((order, index) => (
         <div className="col-md-6 col-lg-4" key={index}>
           <div className="card border-0 shadow rounded-4 h-100">
             <div className="card-body d-flex flex-column">
               {/* Header Section */}
               <div className="d-flex align-items-center mb-3">
                 <div className="me-3">
                   <img
                     src={assets.deliveryboy}
                     alt="Delivery Icon"
                     width={48}
                     height={48}
                     className="rounded-2 border"
                   />
                 </div>
                 <div>
                   <h6 className="mb-1 text-capitalize fw-semibold">
                     &#x25cf; {order.orderStatus}
                   </h6>
                   <span className="text-muted small">
                     ₹{order.amount.toFixed(2)} •{" "}
                     {order.orderItems?.length || 0} item(s)
                   </span>
                 </div>
               </div>

               {/* Items List */}
               <div className="mb-3">
                 <p className="fw-bold mb-1">Items Ordered:</p>
                 <ul className="list-unstyled small text-secondary mb-0">
                   {(order.orderItems || []).map((item, itemIndex) => (
                     <li key={itemIndex}>
                       <span className="text-dark">{item.name}</span> ×{" "}
                       {item.quantity}
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Action Button */}
               <div className="mt-auto text-end">
                 <button
                   className="btn btn-sm btn-outline-warning rounded-pill"
                   onClick={fetchOrders}
                 >
                   <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                 </button>
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );












}

export default MyOrders
