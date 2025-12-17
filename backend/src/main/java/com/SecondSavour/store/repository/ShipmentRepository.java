package com.SecondSavour.store.repository;

import com.SecondSavour.store.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, String> {

    // Find all shipments for a specific order (by UUID)
    List<Shipment> findByOrderId(UUID orderId);

    // Find shipment by tracking number
    Optional<Shipment> findByTrackingNumber(String trackingNumber);

    // Find shipments by status
    List<Shipment> findByShipmentStatus(String shipmentStatus);

    // Find shipment by fulfillment UID
    Optional<Shipment> findByFulfillmentUid(String fulfillmentUid);

    // Check if shipment exists for an order
    boolean existsByOrderId(UUID orderId);
}
