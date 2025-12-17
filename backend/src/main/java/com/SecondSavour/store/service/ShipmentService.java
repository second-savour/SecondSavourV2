package com.SecondSavour.store.service;

import com.SecondSavour.store.model.Order;
import com.SecondSavour.store.model.Shipment;
import com.SecondSavour.store.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    public List<Shipment> getShipmentsByOrderId(UUID orderId) {
        return shipmentRepository.findByOrderId(orderId);
    }

    public Optional<Shipment> getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber);
    }

    public Optional<Shipment> getShipmentByFulfillmentUid(String fulfillmentUid) {
        return shipmentRepository.findByFulfillmentUid(fulfillmentUid);
    }

    public Shipment createShipment(Shipment shipment) {
        if (shipment.getShipmentStatus() == null || shipment.getShipmentStatus().isEmpty()) {
            shipment.setShipmentStatus("pending");
        }
        return shipmentRepository.save(shipment);
    }

    public Optional<Shipment> updateShipmentStatus(String trackingNumber, String newStatus) {
        Optional<Shipment> shipmentOpt = shipmentRepository.findByTrackingNumber(trackingNumber);
        if (shipmentOpt.isPresent()) {
            Shipment shipment = shipmentOpt.get();
            shipment.setShipmentStatus(newStatus);

            // Update timestamps based on status
            if ("in_transit".equals(newStatus) && shipment.getShippedAt() == null) {
                shipment.setShippedAt(LocalDateTime.now());
            } else if ("delivered".equals(newStatus) && shipment.getDeliveredAt() == null) {
                shipment.setDeliveredAt(LocalDateTime.now());
            }

            return Optional.of(shipmentRepository.save(shipment));
        }
        return Optional.empty();
    }

    public Shipment updateShipment(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    public boolean deleteShipment(String shipmentId) {
        if (shipmentRepository.existsById(shipmentId)) {
            shipmentRepository.deleteById(shipmentId);
            return true;
        }
        return false;
    }

    public boolean shipmentExistsForOrder(UUID orderId) {
        return shipmentRepository.existsByOrderId(orderId);
    }

    public List<String> getAvailableStatuses() {
        return List.of("pending", "in_transit", "delivered", "failed");
    }

    /**
     * Create or update shipment from Order data
     */
    public Shipment syncShipmentFromOrder(Order order) {
        // Check if shipment already exists for this order's internal ID
        List<Shipment> existingShipments = shipmentRepository.findByOrderId(order.getId());

        Shipment shipment;
        if (!existingShipments.isEmpty()) {
            // Update existing shipment
            shipment = existingShipments.get(0);
        } else {
            // Create new shipment
            shipment = new Shipment();
            shipment.setOrderId(order.getId());
            shipment.setUserId(order.getUserId());
        }

        // Sync data from order
        shipment.setCarrier(order.getCarrier());
        shipment.setTrackingNumber(order.getTrackingNumber());
        shipment.setTrackingUrl(order.getTrackingUrl());
        shipment.setFulfillmentUid(order.getFulfillmentUid());
        shipment.setRecipientName(order.getCustomerName());
        shipment.setRecipientCity(order.getDestination());

        // Map order status to shipment status
        String shipmentStatus = "pending";
        if ("shipped".equals(order.getStatus())) {
            shipmentStatus = "in_transit";
            if (shipment.getShippedAt() == null) {
                shipment.setShippedAt(LocalDateTime.now());
            }
        } else if ("delivered".equals(order.getStatus())) {
            shipmentStatus = "delivered";
            if (shipment.getDeliveredAt() == null) {
                shipment.setDeliveredAt(LocalDateTime.now());
            }
        }
        shipment.setShipmentStatus(shipmentStatus);

        return shipmentRepository.save(shipment);
    }
}
