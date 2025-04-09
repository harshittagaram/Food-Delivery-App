package com.example.FoodDeliveryApp.repository;

import com.example.FoodDeliveryApp.entity.CartEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepositort extends MongoRepository<CartEntity,String> {

    Optional<CartEntity> findByUserId(String userId);

    void deleteByUserId(String userId);
}
