import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import "./FoodItem.css";

const FoodItem = ({name,description,id, imageUrl,price}) => {
  const {increaseQty,decreaseQty,quantities} = useContext(StoreContext);
 return (
   <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
     <div
       className="card h-100 shadow border-0"
       style={{
         width: "100%",
         maxWidth: "300px",
         overflow: "hidden",
         transition: "transform 0.3s ease",
       }}
     >
       <Link
         to={`/food/${id}`}
         style={{ textDecoration: "none", color: "black" }}
         className="d-flex flex-column flex-grow-1"
       >
         <div style={{ overflow: "hidden" }}>
           <img
             src={imageUrl}
             className="card-img-top"
             alt="Product Image"
             style={{
               width: "100%",
               height: "160px",
               objectFit: "cover",
               transition: "transform 0.3s ease",
             }}
             onMouseOver={(e) =>
               (e.currentTarget.style.transform = "scale(1.05)")
             }
             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
           />
         </div>

         <div
           className="card-body d-flex flex-column"
           style={{ minHeight: "180px" }}
         >
           <h5 className="card-title fw-semibold">{name}</h5>
           <p
             className="card-text flex-grow-1 text-muted small"
             style={{ fontSize: "0.9rem" }}
           >
             {description}
           </p>
           <div className="d-flex justify-content-between align-items-center">
             <span className="h5 text-success mb-0">&#8377;{price}</span>
             <div>
               <i className="bi bi-star-fill text-warning"></i>
               <i className="bi bi-star-fill text-warning"></i>
               <i className="bi bi-star-fill text-warning"></i>
               <i className="bi bi-star-fill text-warning"></i>
               <i className="bi bi-star-half text-warning"></i>
               <small className="text-muted">(4.5)</small>
             </div>
           </div>
         </div>
       </Link>

       <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center px-3 py-2">
         <Link
           className="btn btn-outline-primary btn-sm rounded-pill"
           to={`/food/${id}`}
         >
           View Food
         </Link>
         {quantities[id] > 0 ? (
           <div className="d-flex align-items-center ms-2">
             <button
               className="btn btn-sm btn-outline-danger"
               onClick={() => decreaseQty(id)}
             >
               <i className="bi bi-dash-circle"></i>
             </button>
             <span className="mx-2 fw-semibold">{quantities[id]}</span>
             <button
               className="btn btn-sm btn-outline-success"
               onClick={() => increaseQty(id)}
             >
               <i className="bi bi-plus-circle"></i>
             </button>
           </div>
         ) : (
           <button
             className="btn btn-outline-success btn-sm rounded-pill"
             onClick={() => increaseQty(id)}
           >
             <i className="bi bi-plus-circle text-success"></i> Add
           </button>
         )}
       </div>
     </div>
   </div>
 );



}

export default FoodItem;
