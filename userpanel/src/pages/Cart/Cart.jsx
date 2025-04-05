import{ React , useContext} from 'react'
import '../Cart/Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const Cart = () => {

    const {foodList, increaseQty, decreaseQty,quantities,removeFromCart} = useContext(StoreContext);
    const cartItems = foodList.filter(food => quantities[food.id]>0);

    const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);

    const shipping = subtotal === 0? 0.00:10;
    const tax = subtotal *0.1;
    const grandTotal = subtotal + shipping + tax;
    const totalItems = cartItems.reduce((acc, food) => acc + quantities[food.id], 0);

    

  return (
    <div className="cart-wrapper">
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                         <h4 className="mb-0">Shopping Cart</h4>
                            {totalItems > 0 && (
                                <span className="text-muted">Total items: {totalItems}</span>
                            )}
                    </div>
                    {
                        cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : 
                        <div className="d-flex flex-column gap-3">

                        <div className="product-card p-3 shadow-sm mb-3">
                           {cartItems.map((food) => (
                            <div key={food.id} className="row align-items-center mb-4">
                                <div className="col-md-2 mb-3">
                                    <img src={food.imageUrl} alt={food.name} className="product-image"/>
                                </div>
                                <div className="col-md-4">
                                    <h6 className="mb-1">{food.name}</h6>
                                    <p className="text-muted">Category: {food.category}</p>                                
                                    </div>
                                <div className="col-md-3">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <button className="quantity-btn" onClick={()=>decreaseQty(food.id)}>-</button>
                                        <input type="number" value={quantities[food.id]} readOnly className="quantity-input"  min="1"/>
                                        <button className="quantity-btn" onClick={()=>increaseQty(food.id)}>+</button>
                                    </div>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <span className="fw-bold">&#8377;{(food.price * quantities[food.id]).toFixed(2)}</span>
                                </div>
                                <div className="col-md-1">
                                    <i className="bi bi-trash remove-btn" onClick={()=>{removeFromCart(food.id)}}></i>
                                </div>
                            </div>
                           ))}
                        </div>
                    </div>
                    }

                    <div className="text-start mb-4">
                <Link to={"/"} className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
            </div>
                </div>

                <div className="col-lg-4">
                    <div className="summary-card p-4 shadow-sm">
                        <h5 className="mb-4">Order Summary</h5>
                        
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Subtotal</span>
                            <span>&#8377;{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Tax</span>
                            <span >&#8377;{tax.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Shipping</span>
                            <span>&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between mb-4">
                            <span className="fw-bold">Grand Total</span>
                            <span className="fw-bold">&#8377;{subtotal === 0 ? 0.0 : grandTotal.toFixed(2)}</span>
                        </div>

                        <div className="mb-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code"/>
                                <button className="btn btn-outline-secondary" type="button">Apply</button>
                            </div>
                        </div>

                        <button className="btn btn-primary checkout-btn w-100 mb-3" disabled={cartItems.length === 0}>
                            Proceed to Checkout
                        </button>
                        
                        <div className="d-flex justify-content-center gap-2">
                            <i className="bi bi-shield-check text-success"></i>
                            <small className="text-muted">Secure checkout</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart
