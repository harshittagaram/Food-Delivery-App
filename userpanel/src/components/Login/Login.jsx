import React from 'react'
import '../Login/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
   <div className="container">
    <div className="row justify-content-center mt-5">
        <div className="col-md-5">
            <div className="card shadow">
                <div className="card-body">
                    <h3 className="card-title text-center">Login</h3>
                    
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required/>
                        </div>
                        {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe"/>
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <div className="mt-4">
                            Don't have an account? <Link to='/register'>Register</Link>
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

export default Login
