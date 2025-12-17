package com.SecondSavour.store.repository;

import com.SecondSavour.store.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    // Find all orders by customer email
    List<Order> findByCustomerEmail(String customerEmail);

    // Find all orders by email
    List<Order> findByEmail(String email);

    // Find order by Square order ID
    Optional<Order> findByOrderId(String orderId);

    // Find orders by status
    List<Order> findByStatus(String status);

    // Check if order exists by Square order ID
    boolean existsByOrderId(String orderId);
}
