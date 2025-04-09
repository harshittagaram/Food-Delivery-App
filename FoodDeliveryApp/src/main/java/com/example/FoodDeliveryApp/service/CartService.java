package com.example.FoodDeliveryApp.service;

import com.example.FoodDeliveryApp.io.CartRequest;
import com.example.FoodDeliveryApp.io.CartResponse;

public interface CartService {
    CartResponse addToCart(CartRequest request);
    CartResponse getCart();
    void clearCart( );
    CartResponse removeFromCart(CartRequest cartRequest);

}
