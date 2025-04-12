import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';
import "./AddFood.css";



const AddFood = () => {
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:'',
    description:'',
    price:'',
    category:'Biryani'
  });

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const onSubmitHandler= async(event)=>{
    event.preventDefault();
    if(!image){
        toast.error("Please select an image.");
      return;
    }
    try{
        await addFood(data,image);
        toast.success('Food added successfully.');
        setData({name:'',description:'',category:'Biryani',price:''});
        setImage(null);
    }catch(error){
        toast.error('Error adding food.');
    }
  }

  

  
  return (
    <div className="add-food-container">
      <div className="row justify-content-center">
        <div className="card food-form-card col-md-6 col-lg-5">
          <form className="card-body" onSubmit={onSubmitHandler}>
            <h2 className="form-title">Add New Food</h2>

            <div className="form-group text-center mb-4">
              <label htmlFor="image" className="image-upload-label">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload}
                  alt="Upload Preview"
                  className="image-preview"
                />
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                placeholder="Chicken Biryani"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                required
                name="description"
                onChange={onChangeHandler}
                value={data.description}
                placeholder="Enter description here..."
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-control"
                onChange={onChangeHandler}
                value={data.category}
              >
                <option value="">Select category</option>
                <option value="Biryani">Biryani</option>
                <option value="Dessert">Dessert</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Rolls">Rolls</option>
                <option value="Salad">Salad</option>
                <option value="Ice Cream">Ice Cream</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                name="price"
                onChange={onChangeHandler}
                value={data.price}
                placeholder="₹200"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default AddFood
