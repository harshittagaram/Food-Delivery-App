package com.example.FoodDeliveryApp.repository;

import com.example.FoodDeliveryApp.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends MongoRepository<FoodEntity,String> {
}
