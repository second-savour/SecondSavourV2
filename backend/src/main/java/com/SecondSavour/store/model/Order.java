package com.SecondSavour.store.model;

import java.time.LocalDate;

public class Order {
    private String orderId;
    private String productName;
    private String productImage;
    private int quantity;
    private LocalDate orderDate;
    private LocalDate estimatedDeliveryDate;
    private String status; // "processing", "shipped", "delivered", "cancelled"
    private double price;
    private String customerEmail;
    
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
    
    @Override
    public String toString() {
        return "Order{" +
                "orderId='" + orderId + '\'' +
                ", productName='" + productName + '\'' +
                ", quantity=" + quantity +
                ", orderDate=" + orderDate +
                ", estimatedDeliveryDate=" + estimatedDeliveryDate +
                ", status='" + status + '\'' +
                ", price=" + price +
                ", customerEmail='" + customerEmail + '\'' +
                '}';
    }
}


