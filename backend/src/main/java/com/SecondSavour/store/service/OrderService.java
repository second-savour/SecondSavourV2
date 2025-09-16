package com.SecondSavour.store.service;

import com.SecondSavour.store.model.Order;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {
    
    private List<Order> orders = new ArrayList<>();
    
    public OrderService() {
        // Initialize with sample data
        initializeSampleOrders();
    }
    
    private void initializeSampleOrders() {
        orders.add(new Order(
            "ORD-001", 
            "LEMON CITRUS", 
            "/static/images/CitrusCandie.png",
            1,
            LocalDate.of(2024, 6, 3),
            LocalDate.of(2024, 6, 8),
            "shipped",
            12.99,
            "customer@example.com"
        ));
        
        orders.add(new Order(
            "ORD-002", 
            "ORANGE CITRUS", 
            "/static/images/CitrusCandie.png",
            2,
            LocalDate.of(2024, 6, 5),
            LocalDate.of(2024, 6, 10),
            "processing",
            25.98,
            "customer@example.com"
        ));
        
        orders.add(new Order(
            "ORD-003", 
            "MIXED CITRUS PACK", 
            "/static/images/CitrusCandie.png",
            3,
            LocalDate.of(2024, 6, 1),
            LocalDate.of(2024, 6, 6),
            "delivered",
            38.97,
            "customer@example.com"
        ));
    }
    
    public List<Order> getAllOrders() {
        return new ArrayList<>(orders);
    }
    
    public List<Order> getOrdersByCustomerEmail(String customerEmail) {
        return orders.stream()
                .filter(order -> order.getCustomerEmail().equals(customerEmail))
                .toList();
    }
    
    public Optional<Order> getOrderById(String orderId) {
        return orders.stream()
                .filter(order -> order.getOrderId().equals(orderId))
                .findFirst();
    }
    
    public Order createOrder(Order order) {
        if (order.getOrderId() == null || order.getOrderId().isEmpty()) {
            order.setOrderId("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (order.getOrderDate() == null) {
            order.setOrderDate(LocalDate.now());
        }
        if (order.getEstimatedDeliveryDate() == null) {
            order.setEstimatedDeliveryDate(LocalDate.now().plusDays(5));
        }
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("processing");
        }
        
        orders.add(order);
        return order;
    }
    
    public Optional<Order> updateOrderStatus(String orderId, String newStatus) {
        Optional<Order> orderOpt = getOrderById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(newStatus);
            return Optional.of(order);
        }
        return Optional.empty();
    }
    
    public boolean deleteOrder(String orderId) {
        return orders.removeIf(order -> order.getOrderId().equals(orderId));
    }
    
    public List<String> getAvailableStatuses() {
        return List.of("processing", "shipped", "delivered", "cancelled");
    }
}


