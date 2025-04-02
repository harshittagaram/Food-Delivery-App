import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const FoodDisplay = () => {

  const {foodList} = useContext(StoreContext)
  return (
    <div className='container'>
      <div className="row">
        {foodList.length > 0 ? (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-fles justify-content-center">
              <div className="card" style={{"maxWidth" : "320px"}}>
    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzaG9lfGVufDB8MHx8fDE3MjEwNDEzNjd8MA&ixlib=rb-4.0.3&q=80&w=1080" className="card-img-top" alt="Product Image"/>
    <div className="card-body">
        <h5 className="card-title">Red Nike</h5>
        <p className="card-text">Short product description goes here.</p>
        <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">$99.99</span>
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
    <div className="card-footer d-flex justify-content-between bg-light">
        <button className="btn btn-primary btn-sm">Add to Cart</button>
        <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-heart"></i></button>
    </div>
</div>
            </div>
        ) :( 
          <div className="text-center mt-4">
          <h4> No food found.</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
