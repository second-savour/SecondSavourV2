package com.SecondSavour.store.controller;

import com.SecondSavour.store.model.Order;
import com.SecondSavour.store.service.OrderService;
import com.SecondSavour.store.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping("/customer/{email}")
    public ResponseEntity<List<Order>> getOrdersByCustomerEmail(@PathVariable String email) {
        System.out.println("Fetching orders for customer email: " + email);

        try {
            List<Order> orders = orderService.getOrdersByEmail(email.toLowerCase());
            System.out.println("Found " + orders.size() + " orders for " + email);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            System.err.println("Error fetching orders: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            System.err.println("Error fetching all orders: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        try {
            return orderService.getOrderById(orderId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error fetching order: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/sync-shipments")
    public ResponseEntity<Map<String, Object>> syncShipmentsFromOrders() {
        System.out.println("Starting shipment sync from orders...");
        try {
            List<Order> allOrders = orderService.getAllOrders();
            int syncedCount = 0;
            int errorCount = 0;

            for (Order order : allOrders) {
                try {
                    shipmentService.syncShipmentFromOrder(order);
                    syncedCount++;
                    System.out.println("Synced shipment for order: " + order.getOrderId());
                } catch (Exception e) {
                    errorCount++;
                    System.err.println("Failed to sync shipment for order " + order.getOrderId() + ": " + e.getMessage());
                }
            }

            System.out.println("Shipment sync completed. Synced: " + syncedCount + ", Errors: " + errorCount);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "synced", syncedCount,
                "errors", errorCount,
                "message", "Synced " + syncedCount + " shipments from orders"
            ));
        } catch (Exception e) {
            System.err.println("Error during shipment sync: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
