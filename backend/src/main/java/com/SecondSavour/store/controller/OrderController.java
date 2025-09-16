package com.SecondSavour.store.controller;

import com.SecondSavour.store.model.Order;
import com.SecondSavour.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Allow CORS for frontend
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    // Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    
    // Get orders by customer email
    @GetMapping("/customer/{customerEmail}")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable String customerEmail) {
        List<Order> orders = orderService.getOrdersByCustomerEmail(customerEmail);
        return ResponseEntity.ok(orders);
    }
    
    // Get specific order by ID
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        Optional<Order> order = orderService.getOrderById(orderId);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    // Track order status
    @GetMapping("/{orderId}/track")
    public ResponseEntity<Map<String, Object>> trackOrder(@PathVariable String orderId) {
        Optional<Order> orderOpt = orderService.getOrderById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            Map<String, Object> trackingInfo = Map.of(
                "orderId", order.getOrderId(),
                "productName", order.getProductName(),
                "status", order.getStatus(),
                "orderDate", order.getOrderDate().toString(),
                "estimatedDeliveryDate", order.getEstimatedDeliveryDate().toString(),
                "quantity", order.getQuantity()
            );
            return ResponseEntity.ok(trackingInfo);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Create new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        try {
            Order createdOrder = orderService.createOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Update order status
    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String orderId, 
                                                   @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        if (newStatus == null || newStatus.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        Optional<Order> updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
        if (updatedOrder.isPresent()) {
            return ResponseEntity.ok(updatedOrder.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete order
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String orderId) {
        boolean deleted = orderService.deleteOrder(orderId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Get available order statuses
    @GetMapping("/statuses")
    public ResponseEntity<List<String>> getAvailableStatuses() {
        List<String> statuses = orderService.getAvailableStatuses();
        return ResponseEntity.ok(statuses);
    }
    
    // Health check for orders service
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> health = Map.of(
            "service", "Orders Service",
            "status", "healthy",
            "totalOrders", orderService.getAllOrders().size(),
            "timestamp", System.currentTimeMillis()
        );
        return ResponseEntity.ok(health);
    }
}


