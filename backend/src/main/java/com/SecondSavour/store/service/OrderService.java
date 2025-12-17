package com.SecondSavour.store.service;

import com.SecondSavour.store.model.Order;
import com.SecondSavour.store.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByCustomerEmail(String customerEmail) {
        return orderRepository.findByCustomerEmail(customerEmail);
    }

    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByEmail(email);
    }

    public Optional<Order> getOrderById(String orderId) {
        return orderRepository.findByOrderId(orderId);
    }

    public Order createOrder(Order order) {
        if (order.getOrderDate() == null) {
            order.setOrderDate(LocalDate.now());
        }
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("processing");
        }

        return orderRepository.save(order);
    }

    public Optional<Order> updateOrderStatus(String orderId, String newStatus) {
        Optional<Order> orderOpt = orderRepository.findByOrderId(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(newStatus);

            // Update delivery date based on status
            if ("shipped".equals(newStatus) && order.getEstimatedDeliveryDate() == null) {
                order.setEstimatedDeliveryDate(LocalDate.now().plusDays(5));
            } else if ("delivered".equals(newStatus)) {
                order.setDeliveredDate(LocalDate.now());
            }

            return Optional.of(orderRepository.save(order));
        }
        return Optional.empty();
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public boolean deleteOrder(String orderId) {
        Optional<Order> orderOpt = orderRepository.findByOrderId(orderId);
        if (orderOpt.isPresent()) {
            orderRepository.delete(orderOpt.get());
            return true;
        }
        return false;
    }

    public List<String> getAvailableStatuses() {
        return List.of("processing", "shipped", "delivered", "cancelled");
    }

    public boolean orderExists(String squareOrderId) {
        return orderRepository.existsByOrderId(squareOrderId);
    }
}
