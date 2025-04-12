import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';
import { deleteFood, getFoodList } from '../../services/foodService';


const ListFoods = () => {
  const[list,setList]=useState([]);
  const fetchList = async()=>{
    try{
      const data = await getFoodList();
      setList(data);
    }
    catch(error){
      toast.error('Error while reading the foods.')
    }
  }

  const removeFood = async (foodId)=>{
    try {
      const success = await deleteFood(foodId);
      if(success){
        toast.success('Food removed.');
        await fetchList();
      }
      else{
      toast.error("Error occured while removing the food.");
      }
    } catch (error) {
      toast.error("Error occured while removing the food.");
    }
    
  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className="food-list-container">
      <div className="food-list-card">
        <h2 className="food-list-title">Food Items</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="food-img"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>&#8377;{item.price}.00</td>
                <td>
                  <i
                    className="bi bi-trash delete-icon"
                    onClick={() => removeFood(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default ListFoods
