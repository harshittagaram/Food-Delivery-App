import React, { useState } from 'react'
import "../Register/Register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { registerUser } from '../../service/authService';


const Register = () => {
    const navigate = useNavigate();
    const [data,setData]=useState({
        name: '',
        email:'',
        password:''
    });

    const onChangeHandler =(event)=>{
        const name= event.target.name;
        const value = event.target.value;
        setData(data =>({...data,[name]:value}));
    }

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        try {
            const response = await registerUser(data);
            if(response.status === 201){
                toast.success('Registration completed. Please login');
                navigate('/login');
            }
            else{
                toast.error('Unable to register. Please try again');
            }
        } catch (error) {
            toast.error('Unable to register. Please try again');
        }
    };

  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
        <div className="col-md-5">
            <div className="card shadow">
                <div className="card-body">
                    <h3 className="card-title text-center">Register</h3>
                    
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="name" placeholder='Harshit Tagaram' name='name' onChange={onChangeHandler} value={data.name} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder='tagaramharshit@gmail.com' name='email' onChange={onChangeHandler} value={data.email} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' onChange={onChangeHandler} value={data.password} required/>
                        </div>
                        {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe"/>
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary mb-2">Register</button>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-danger">Reset</button>
                        </div>
                        <div className="mt-4">
                            Already have an account? <Link to='/login'>Login</Link>
                        </div>
                        {/* <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none">Forgot password?</a>
                    </div> */}
                    </form>
                    {/* <p className="divider-text">
                        <span className="bg-light">OR</span>
                    </p> */}
                    {/* <div className="d-grid gap-2 mb-3">
                        <a href="#" className="btn btn-social btn-google">
                            <i className="bi bi-google me-2"></i> Sign in with Google
                        </a>
                        <a href="#" className="btn btn-social btn-facebook">
                            <i className="bi bi-facebook me-2"></i> Sign in with Facebook
                        </a>
                        <a href="#" className="btn btn-social btn-twitter">
                            <i className="bi bi-twitter me-2"></i> Sign in with Twitter
                        </a>
                    </div> */}
                    
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Register
