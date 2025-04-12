package com.example.FoodDeliveryApp.entity;

import com.example.FoodDeliveryApp.io.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.core.annotation.Order;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
@Builder
public class OrderEntity {

    @Id
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private List<OrderItem> orderedItems;
    private double amount;
    private String paymentStatus;
    private String razorpayOrderId;
    private String razorpaySignature;
    private String orderStatus;
    private String razorpayPaymentId;

}

