package com.example.FoodDeliveryApp.service;

import com.example.FoodDeliveryApp.io.UserRequest;
import com.example.FoodDeliveryApp.io.UserResponse;

public interface UserService {
    UserResponse registerUser(UserRequest request);

}
