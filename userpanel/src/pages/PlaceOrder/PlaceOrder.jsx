import React, { useContext, useState } from 'react'
import './PlaceOrder.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { calculateCartTotals } from '../../util/cartUtils';
import axios from 'axios';
import { toast } from 'react-toastify';
import {RAZORPAY_KEY,RAZORPAY_SECRET} from '../../util/constants';
import {useNavigate} from "react-router-dom";
//import Razorpay from "razorpay";

const PlaceOrder = () => {

    const {foodList,quantities,setQuantities,token}= useContext(StoreContext);
    const navigate = useNavigate();

    const cartItems = foodList.filter((food) => quantities[food.id] > 0);
    
    const{subtotal,shipping,tax,grandTotal,totalItems}= calculateCartTotals(cartItems,quantities);

    const [data,setData] = useState({
      firstName: '',
      lastName:'',
      email:'',
      phoneNumber:'',
      address:'',
      state:'',
      city:'',
      zip:''
    });

    const onChangeHandler = (event) =>{
      const name =event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}));
    }

    const onSubmitHandler =async (event)=>{
      event.preventDefault();
      const orderData={
        userAddress: `${data.firstName}, ${data.lastName}, ${data.address},${data.city},${data.state},${data.zip}`,
        phoneNumber: data.phoneNumber,
        email: data.email,
        orderedItems: cartItems.map(item=>({
          foodId: item.foodId,
          quantity: quantities[item.id],
          price: item.price * quantities[item.id],
          category: item.category,
          imageUrl: item.imageUrl,
          description: item.description,
          name: item.name
        })),
        amount: grandTotal.toFixed(2),
        orderStatus:"Preparing"
      };     
      
      try {
        const response = await axios.post('http://localhost:8080/api/orders/create', orderData,{headers:{'Authorization' : `Bearer ${token}`}});
        if(response.status===201 && response.data.razorpayOrderId){
          //intiate the payment
          intitateRazorpayPayment(response.data);
        }else{
          toast.error("Unable to place the order. Please try again.");
        }
      } catch (error) {
          toast.error("Unable to place the order. Please try again.");
      }
    };

    const intitateRazorpayPayment = (order)=>{
      const options ={
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Food Land",
        description: "Foor order payment",
        order_id: order.razorpayOrderId,
        handler: async function(razorpayResponse){
          await verifyPayment(razorpayResponse);
        },
        prefill:{
          name:`${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phoneNumber
        },
        theme:{color: "#3399cc"},
        modal: {
          ondismiss: async function(){
            toast.error("Payment cancelled.");
            await deleteOrder(order.id);
          }
        }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    const verifyPayment = async (razorpayResponse) =>{
      const paymentData = {
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature
      }
      try {
        const response = await axios.post('http://localhost:8080/api/orders/verify', paymentData,{headers: {'Authorization': `Bearer ${token}`}});
        if(response.status === 200){
          toast.success('Payment Successful!');
          await clearCart();
          navigate('/myorders');
        }else{
          toast.error('Payment failed. Please try again.');
          navigate('/');
        }
      } catch (error) {
        toast.error("Payment failed. Please try again.");
      }
    }

    const deleteOrder = async (orderId) =>{
      try {
       await axios.delete('http://localhost:8080/api/orders/'+orderId, {headers: {'Authorization': `Bearer ${token}`}});
      } catch (error) {
        toast.error('Something went wrong. Contact support team.');
      }
    }

    const clearCart = async()=>{
      try {
        axios.delete("http://localhost:8080/api/cart", {headers: {'Authorization': `Bearer ${token}`}});
        setQuantities({});
      } catch (error) {
        toast.error("Error while clearing the cart.");
      }
    }


  return (
    <div className="container mt-5">
      <main>
        <div className="py-5 text-center">
            <img className="d-block mx-auto " src={assets.logo_main} alt="" width="200" height="200"/>
        </div>
        <div className='container'>
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
              </h4>
             <ul className="list-group mb-3">
                {cartItems.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
                    </div>
                    <span className="text-body-secondary">&#8377;{item.price * quantities[item.id]}</span>
                    </li>
                ))}
                
                <li className="list-group-item d-flex justify-content-between">
                    <div><span>Shipping Charges</span></div>
                    <span className="text-body-secondary">&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
                </li>
                
                <li className="list-group-item d-flex justify-content-between">
                    <div><span>Tax (10%)</span></div>
                    <span className="text-body-secondary">&#8377;{subtotal === 0 ? 0.0 : tax.toFixed(2)}</span>
                </li>
                
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (INR)</span>
                    <strong>&#8377;{subtotal === 0 ? 0.0 : grandTotal.toFixed(2)}</strong>
                </li>
                </ul>


              
            </div>

            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" onSubmit={onSubmitHandler}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder='Harshit' name="firstName" onChange={onChangeHandler} value={data.firstName} required />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder='Tagaram'  name="lastName" onChange={onChangeHandler} value={data.lastName} required />
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com"  name="email" onChange={onChangeHandler} value={data.email} />
                    </div>
                    </div>


                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phone" placeholder="+91 ***** *****"  name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber}required />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Apartment or suite" value={data.address} name='address' onChange={onChangeHandler} />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="state" className="form-label">State</label>
                    <select className="form-select" id="state" name="state" value={data.state} onChange={onChangeHandler} required>
                      <option value="">Choose...</option>
                      <option>Andhra Pradesh</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="city" className="form-label">City</label>
                    <select className="form-select" id="city" name='city' value={data.city} onChange={onChangeHandler}required>
                      <option value="">Choose...</option>
                      <option>Amaravati</option>
                      <option>Vijayawada</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder='507116'  name="zip" value={data.zip} onChange={onChangeHandler} required />
                  </div>
                </div>

                <hr className="my-4" />
                
                <button className="w-60 btn btn-primary mb-5" type="submit" disabled={cartItems.length===0}>Continue to checkout</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PlaceOrder;
