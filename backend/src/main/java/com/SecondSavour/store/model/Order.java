package com.SecondSavour.store.model;

import java.time.LocalDate;

public class Order {
    private String orderId;
    private String productName;
    private String productImage;
    private int quantity;
    private LocalDate orderDate;
    private LocalDate estimatedDeliveryDate;
    private LocalDate deliveredDate;
    private String status; // "processing", "shipped", "delivered", "cancelled"
    private double price;
    private String customerEmail;
    private String customerName;
    private String destination;
    private Double shippingCost;

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

    @Override
    public String toString() {
        return "Order{" +
                "orderId='" + orderId + '\'' +
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
                '}';
    }
}


