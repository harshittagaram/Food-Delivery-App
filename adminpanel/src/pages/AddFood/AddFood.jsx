import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';



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
    <div className="mx-2 mt-4">
      <div className="row p-1">
        <div className="card col-md-4 col-lg-4">
          <form className="card-body" onSubmit={onSubmitHandler}>
            <h2 className=" mb-4"> Add Food </h2>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload}
                  alt=""
                  width={70}
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
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
                <option value="Biryani">Biryani</option>
                <option value="Cake">Cake</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Rolls">Rolls</option>
                <option value="Salad">Salad</option>
                <option value="Ice Cream">Ice Cream</option>
              </select>
            </div>
            <div className="mb-3">
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
              <button type="submit" className="btn btn-primary btn-sm">
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
