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
        // Order 1: Delivered order with complete information
        orders.add(new Order(
            "ORD-001",
            "Orange Citrus Candies",
            "/static/images/CitrusCandie.png",
            2,
            LocalDate.of(2025, 10, 15),
            LocalDate.of(2025, 10, 22),
            LocalDate.of(2025, 10, 21), // delivered early
            "delivered",
            12.99,
            "john.smith@example.com",
            "John Smith",
            "Toronto, ON",
            8.50
        ));

        // Order 2: Currently shipped order
        orders.add(new Order(
            "ORD-002",
            "Lemon Citrus Delights",
            "/static/images/CitrusCandie.png",
            3,
            LocalDate.of(2025, 11, 1),
            LocalDate.of(2025, 11, 8),
            null, // not delivered yet
            "shipped",
            14.99,
            "sarah.johnson@example.com",
            "Sarah Johnson",
            "Montreal, QC",
            12.00
        ));

        // Order 3: Processing order
        orders.add(new Order(
            "ORD-003",
            "Mixed Citrus Pack",
            "/static/images/CitrusCandie.png",
            1,
            LocalDate.of(2025, 11, 5),
            LocalDate.of(2025, 11, 12),
            null,
            "processing",
            18.99,
            "michael.brown@example.com",
            "Michael Brown",
            "Calgary, AB",
            15.50
        ));

        // Order 4: Another delivered order
        orders.add(new Order(
            "ORD-004",
            "Grapefruit Citrus Treats",
            "/static/images/CitrusCandie.png",
            4,
            LocalDate.of(2025, 10, 20),
            LocalDate.of(2025, 10, 27),
            LocalDate.of(2025, 10, 26),
            "delivered",
            11.99,
            "emily.davis@example.com",
            "Emily Davis",
            "Ottawa, ON",
            8.50
        ));

        // Order 5: Large shipped order
        orders.add(new Order(
            "ORD-005",
            "Citrus Variety Bundle",
            "/static/images/CitrusCandie.png",
            5,
            LocalDate.of(2025, 11, 3),
            LocalDate.of(2025, 11, 10),
            null,
            "shipped",
            16.99,
            "david.wilson@example.com",
            "David Wilson",
            "Edmonton, AB",
            15.50
        ));

        // Order 6: Recent processing order
        orders.add(new Order(
            "ORD-006",
            "Tangerine Citrus Gems",
            "/static/images/CitrusCandie.png",
            2,
            LocalDate.of(2025, 11, 8),
            LocalDate.of(2025, 11, 15),
            null,
            "processing",
            13.99,
            "lisa.anderson@example.com",
            "Lisa Anderson",
            "Winnipeg, MB",
            12.00
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


