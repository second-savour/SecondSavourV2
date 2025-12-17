package com.SecondSavour.store.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "square_order_id", unique = true, nullable = false)
    private String orderId;

    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_image")
    private String productImage;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "estimated_delivery_date")
    private LocalDate estimatedDeliveryDate;

    @Column(name = "delivered_date")
    private LocalDate deliveredDate;

    @Column(name = "status")
    private String status; // "processing", "shipped", "delivered", "cancelled"

    @Column(name = "price")
    private double price;

    @Column(name = "customer_email", nullable = false)
    private String customerEmail;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "destination")
    private String destination;

    @Column(name = "shipping_cost")
    private Double shippingCost;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "tracking_url")
    private String trackingUrl;

    @Column(name = "carrier")
    private String carrier;

    @Column(name = "fulfillment_uid")
    private String fulfillmentUid;

    @Column(name = "fulfillment_state")
    private String fulfillmentState;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (orderDate == null) {
            orderDate = LocalDate.now();
        }
        // Set default system user ID for webhook orders if not set
        if (userId == null) {
            userId = UUID.fromString("00000000-0000-0000-0000-000000000000");
        }
        // Generate order number from Square order ID if not set
        if (orderNumber == null && orderId != null) {
            orderNumber = "WH-" + orderId;
        }
        // Set email from customer_email if not set
        if (email == null && customerEmail != null) {
            email = customerEmail;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Order() {}

    public Order(String orderId, String productName, String productImage, int quantity,
                LocalDate orderDate, LocalDate estimatedDeliveryDate, String status,
                double price, String customerEmail) {
        this.orderId = orderId;
        this.productName = productName;
        this.productImage = productImage;
        this.quantity = quantity;
        this.orderDate = orderDate;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.status = status;
        this.price = price;
        this.customerEmail = customerEmail;
    }

    public Order(String orderId, String productName, String productImage, int quantity,
                LocalDate orderDate, LocalDate estimatedDeliveryDate, LocalDate deliveredDate,
                String status, double price, String customerEmail, String customerName,
                String destination, Double shippingCost) {
        this.orderId = orderId;
        this.productName = productName;
        this.productImage = productImage;
        this.quantity = quantity;
        this.orderDate = orderDate;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.deliveredDate = deliveredDate;
        this.status = status;
        this.price = price;
        this.customerEmail = customerEmail;
        this.customerName = customerName;
        this.destination = destination;
        this.shippingCost = shippingCost;
    }
    
    // Getters and Setters
    public String getOrderId() {
        return orderId;
    }
    
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public String getProductImage() {
        return productImage;
    }
    
    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    public LocalDate getOrderDate() {
        return orderDate;
    }
    
    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }
    
    public LocalDate getEstimatedDeliveryDate() {
        return estimatedDeliveryDate;
    }
    
    public void setEstimatedDeliveryDate(LocalDate estimatedDeliveryDate) {
        this.estimatedDeliveryDate = estimatedDeliveryDate;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        this.price = price;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public LocalDate getDeliveredDate() {
        return deliveredDate;
    }

    public void setDeliveredDate(LocalDate deliveredDate) {
        this.deliveredDate = deliveredDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getTrackingUrl() {
        return trackingUrl;
    }

    public void setTrackingUrl(String trackingUrl) {
        this.trackingUrl = trackingUrl;
    }

    public String getCarrier() {
        return carrier;
    }

    public void setCarrier(String carrier) {
        this.carrier = carrier;
    }

    public String getFulfillmentUid() {
        return fulfillmentUid;
    }

    public void setFulfillmentUid(String fulfillmentUid) {
        this.fulfillmentUid = fulfillmentUid;
    }

    public String getFulfillmentState() {
        return fulfillmentState;
    }

    public void setFulfillmentState(String fulfillmentState) {
        this.fulfillmentState = fulfillmentState;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", orderId='" + orderId + '\'' +
                ", productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", orderDate=" + orderDate +
                ", estimatedDeliveryDate=" + estimatedDeliveryDate +
                ", deliveredDate=" + deliveredDate +
                ", status='" + status + '\'' +
                ", price=" + price +
                ", customerEmail='" + customerEmail + '\'' +
                ", customerName='" + customerName + '\'' +
                ", destination='" + destination + '\'' +
                ", shippingCost=" + shippingCost +
                ", trackingNumber='" + trackingNumber + '\'' +
                ", carrier='" + carrier + '\'' +
                ", fulfillmentUid='" + fulfillmentUid + '\'' +
                '}';
    }
}


