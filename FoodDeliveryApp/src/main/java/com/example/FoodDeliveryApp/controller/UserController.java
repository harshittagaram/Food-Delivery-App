package com.example.FoodDeliveryApp.controller;

import com.example.FoodDeliveryApp.io.UserRequest;
import com.example.FoodDeliveryApp.io.UserResponse;
import com.example.FoodDeliveryApp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
       return userService.registerUser(request);

    }
}
