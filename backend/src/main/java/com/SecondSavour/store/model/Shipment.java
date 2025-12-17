package com.SecondSavour.store.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "order_id", nullable = false)
    private UUID orderId; // Links to Order's internal UUID id

    @Column(name = "fulfillment_uid")
    private String fulfillmentUid;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "tracking_url")
    private String trackingUrl;

    @Column(name = "carrier")
    private String carrier;

    @Column(name = "shipment_status")
    private String shipmentStatus; // "pending", "in_transit", "delivered", "failed"

    @Column(name = "shipped_at")
    private LocalDateTime shippedAt;

    @Column(name = "estimated_delivery")
    private LocalDateTime estimatedDelivery;

    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "recipient_address")
    private String recipientAddress;

    @Column(name = "recipient_city")
    private String recipientCity;

    @Column(name = "recipient_state")
    private String recipientState;

    @Column(name = "recipient_postal_code")
    private String recipientPostalCode;

    @Column(name = "recipient_country")
    private String recipientCountry;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (shipmentStatus == null) {
            shipmentStatus = "pending";
        }
        // Set default system user ID if not set
        if (userId == null) {
            userId = java.util.UUID.fromString("00000000-0000-0000-0000-000000000000");
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Shipment() {}

    public Shipment(UUID orderId, String trackingNumber, String carrier) {
        this.orderId = orderId;
        this.trackingNumber = trackingNumber;
        this.carrier = carrier;
    }

    // Getters and Setters
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

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public String getFulfillmentUid() {
        return fulfillmentUid;
    }

    public void setFulfillmentUid(String fulfillmentUid) {
        this.fulfillmentUid = fulfillmentUid;
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

    public String getShipmentStatus() {
        return shipmentStatus;
    }

    public void setShipmentStatus(String shipmentStatus) {
        this.shipmentStatus = shipmentStatus;
    }

    public LocalDateTime getShippedAt() {
        return shippedAt;
    }

    public void setShippedAt(LocalDateTime shippedAt) {
        this.shippedAt = shippedAt;
    }

    public LocalDateTime getEstimatedDelivery() {
        return estimatedDelivery;
    }

    public void setEstimatedDelivery(LocalDateTime estimatedDelivery) {
        this.estimatedDelivery = estimatedDelivery;
    }

    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientAddress() {
        return recipientAddress;
    }

    public void setRecipientAddress(String recipientAddress) {
        this.recipientAddress = recipientAddress;
    }

    public String getRecipientCity() {
        return recipientCity;
    }

    public void setRecipientCity(String recipientCity) {
        this.recipientCity = recipientCity;
    }

    public String getRecipientState() {
        return recipientState;
    }

    public void setRecipientState(String recipientState) {
        this.recipientState = recipientState;
    }

    public String getRecipientPostalCode() {
        return recipientPostalCode;
    }

    public void setRecipientPostalCode(String recipientPostalCode) {
        this.recipientPostalCode = recipientPostalCode;
    }

    public String getRecipientCountry() {
        return recipientCountry;
    }

    public void setRecipientCountry(String recipientCountry) {
        this.recipientCountry = recipientCountry;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
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
        return "Shipment{" +
                "id='" + id + '\'' +
                ", orderId='" + orderId + '\'' +
                ", fulfillmentUid='" + fulfillmentUid + '\'' +
                ", trackingNumber='" + trackingNumber + '\'' +
                ", carrier='" + carrier + '\'' +
                ", shipmentStatus='" + shipmentStatus + '\'' +
                ", shippedAt=" + shippedAt +
                ", estimatedDelivery=" + estimatedDelivery +
                ", deliveredAt=" + deliveredAt +
                ", recipientName='" + recipientName + '\'' +
                ", recipientCity='" + recipientCity + '\'' +
                '}';
    }
}
