package com.example.FoodDeliveryApp.service;

import com.example.FoodDeliveryApp.entity.UserEntity;
import com.example.FoodDeliveryApp.io.UserRequest;
import com.example.FoodDeliveryApp.io.UserResponse;
import com.example.FoodDeliveryApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse registerUser(UserRequest request) {
       UserEntity newUser = convertToEntity(request);
       newUser = userRepository.save(newUser);
       return convertToResponse(newUser);

    }
    private UserEntity convertToEntity(UserRequest request){
        return UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();
    }

    private UserResponse convertToResponse(UserEntity registeredUser){
        return UserResponse.builder()
                .id(registeredUser.getId())
                 .name(registeredUser.getName())
                 .email(registeredUser.getEmail())
                 .build();
    }

}
