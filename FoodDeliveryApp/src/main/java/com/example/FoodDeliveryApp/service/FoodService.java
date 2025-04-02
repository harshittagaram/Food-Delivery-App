package com.example.FoodDeliveryApp.service;

import com.example.FoodDeliveryApp.io.FoodRequest;
import com.example.FoodDeliveryApp.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {
    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    boolean deleteFile(String id);

    void deleteFood(String id);
}
