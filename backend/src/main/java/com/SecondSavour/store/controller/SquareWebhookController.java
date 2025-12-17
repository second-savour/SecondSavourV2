package com.SecondSavour.store.controller;

import com.SecondSavour.store.model.Order;
import com.SecondSavour.store.model.Shipment;
import com.SecondSavour.store.service.OrderService;
import com.SecondSavour.store.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/square")
@CrossOrigin(origins = "*")
public class SquareWebhookController {

    @Value("${square.webhook.signature.key:}")
    private String webhookSignatureKey;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ShipmentService shipmentService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> handleWebhook(
            @RequestBody String rawBody,
            @RequestHeader(value = "x-square-hmacsha256-signature", required = false) String signature) {

        System.out.println("\n=== SQUARE WEBHOOK RECEIVED ===");

        try {
            // Verify webhook signature for security (optional for testing)
            if (signature != null && !webhookSignatureKey.isEmpty()) {
                boolean isValid = verifyWebhookSignature(rawBody, signature, webhookSignatureKey);
                if (!isValid) {
                    System.err.println("⚠️ Invalid webhook signature");
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(Map.of("error", "Invalid signature"));
                }
                System.out.println("✅ Webhook signature verified");
            } else {
                System.out.println("⚠️ WARNING: Webhook signature verification skipped (testing mode)");
            }

            // Parse the webhook event (simple JSON parsing)
            System.out.println("Raw webhook body:");
            System.out.println(rawBody);

            // Extract event type from JSON (simple string parsing since we don't have Jackson configured)
            String eventType = extractJsonValue(rawBody, "type");
            String eventId = extractJsonValue(rawBody, "event_id");
            String merchantId = extractJsonValue(rawBody, "merchant_id");
            String createdAt = extractJsonValue(rawBody, "created_at");

            System.out.println("Event Type: " + eventType);
            System.out.println("Event ID: " + eventId);
            System.out.println("Merchant ID: " + merchantId);
            System.out.println("Created At: " + createdAt);

            // Handle different event types
            switch (eventType) {
                case "payment.updated":
                    handlePaymentUpdated(rawBody);
                    break;
                case "payment.created":
                    handlePaymentCreated(rawBody);
                    break;
                case "order.created":
                    handleOrderCreated(rawBody);
                    break;
                case "order.updated":
                    handleOrderUpdated(rawBody);
                    break;
                default:
                    System.out.println("Unhandled event type: " + eventType);
            }

            // Return 200 OK to acknowledge receipt
            return ResponseEntity.ok(Map.of("received", true));

        } catch (Exception e) {
            System.err.println("Webhook processing error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Webhook processing failed"));
        }
    }

    private boolean verifyWebhookSignature(String body, String signature, String signatureKey) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    signatureKey.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            );
            hmac.init(secretKey);
            byte[] hash = hmac.doFinal(body.getBytes(StandardCharsets.UTF_8));
            String calculatedSignature = Base64.getEncoder().encodeToString(hash);
            return calculatedSignature.equals(signature);
        } catch (Exception e) {
            System.err.println("Error verifying signature: " + e.getMessage());
            return false;
        }
    }

    private String extractJsonValue(String json, String key) {
        // Simple JSON value extraction (works for simple string values)
        // Try with no space after colon
        String searchKey = "\"" + key + "\":\"";
        int startIndex = json.indexOf(searchKey);

        // Try with space after colon if not found
        if (startIndex == -1) {
            searchKey = "\"" + key + "\": \"";
            startIndex = json.indexOf(searchKey);
        }

        if (startIndex == -1) {
            return "N/A";
        }
        startIndex += searchKey.length();
        int endIndex = json.indexOf("\"", startIndex);
        if (endIndex == -1) {
            return "N/A";
        }
        return json.substring(startIndex, endIndex);
    }

    private void handlePaymentUpdated(String rawBody) {
        System.out.println("\n=== PAYMENT UPDATED ===");

        // Extract from data.object.payment path
        String paymentSection = extractSection(rawBody, "\"payment\":");
        String paymentId = extractValueFromSection(paymentSection, "id");
        String squareOrderId = extractValueFromSection(paymentSection, "order_id");
        String status = extractValueFromSection(paymentSection, "status");
        String sourceType = extractValueFromSection(paymentSection, "source_type");
        String customerId = extractValueFromSection(paymentSection, "customer_id");
        String receiptUrl = extractValueFromSection(paymentSection, "receipt_url");
        String receiptNumber = extractValueFromSection(paymentSection, "receipt_number");

        System.out.println("Payment ID: " + paymentId);
        System.out.println("Square Order ID: " + squareOrderId);
        System.out.println("Status: " + status);
        System.out.println("Source Type: " + sourceType);

        if ("COMPLETED".equals(status) && squareOrderId != null && !squareOrderId.equals("N/A")) {
            System.out.println("✅ PAYMENT COMPLETED!");
            System.out.println("Customer ID: " + customerId);
            System.out.println("Receipt URL: " + receiptUrl);
            System.out.println("Receipt Number: " + receiptNumber);

            // Update order status to processing (paid)
            try {
                var existingOrder = orderService.getOrderById(squareOrderId);
                if (existingOrder.isPresent()) {
                    Order order = existingOrder.get();
                    order.setStatus("processing");
                    orderService.updateOrder(order);
                    System.out.println("✅ Updated order " + squareOrderId + " to 'processing' status");

                    // Sync shipment data from order
                    shipmentService.syncShipmentFromOrder(order);
                    System.out.println("✅ Synced shipment from order update");
                }
            } catch (Exception e) {
                System.err.println("Error updating order status: " + e.getMessage());
            }
        }
    }

    private void handlePaymentCreated(String rawBody) {
        System.out.println("\n=== PAYMENT CREATED ===");

        String paymentId = extractNestedValue(rawBody, "payment", "id");
        String orderId = extractNestedValue(rawBody, "payment", "order_id");
        String status = extractNestedValue(rawBody, "payment", "status");

        System.out.println("Payment ID: " + paymentId);
        System.out.println("Order ID: " + orderId);
        System.out.println("Status: " + status);
    }

    private void handleOrderCreated(String rawBody) {
        System.out.println("\n=== ORDER CREATED ===");

        try {
            // Extract from data.object.order path
            String orderSection = extractSection(rawBody, "\"order\":");
            String squareOrderId = extractValueFromSection(orderSection, "id");
            String state = extractValueFromSection(orderSection, "state");

            System.out.println("Square Order ID: " + squareOrderId);
            System.out.println("State: " + state);

            // Check if order already exists
            if (orderService.orderExists(squareOrderId)) {
                System.out.println("Order already exists in database, skipping...");
                return;
            }

            // Extract order details
            Order order = new Order();
            order.setOrderId(squareOrderId);
            order.setStatus("processing");
            order.setFulfillmentState(state);

            // Extract line item details (first item)
            String productName = extractFromLineItems(rawBody, "name");
            String quantity = extractFromLineItems(rawBody, "quantity");
            String price = extractFromLineItems(rawBody, "base_price_money", "amount");

            order.setProductName(productName.equals("N/A") ? "Product" : productName);
            order.setQuantity(parseIntSafe(quantity, 1));

            // Price is in cents, convert to dollars
            double priceInDollars = parseDoubleSafe(price, 0) / 100.0;
            order.setPrice(priceInDollars);

            // Extract fulfillment details
            String displayName = extractFromFulfillments(rawBody, "display_name");
            String emailAddress = extractFromFulfillments(rawBody, "email_address");
            String locality = extractFromAddress(rawBody, "locality");
            String fulfillmentUid = extractFromFulfillments(rawBody, "uid");

            order.setCustomerName(displayName.equals("N/A") ? "Customer" : displayName);
            order.setCustomerEmail(emailAddress.equals("N/A") ? "customer@example.com" : emailAddress);
            order.setDestination(locality.equals("N/A") ? "N/A" : locality);
            order.setFulfillmentUid(fulfillmentUid);

            // Set default values
            order.setOrderDate(LocalDate.now());
            order.setProductImage("/static/images/CitrusCandie.png");
            order.setShippingCost(0.0);

            // Save to database
            orderService.createOrder(order);
            System.out.println("✅ Order saved to Supabase: " + squareOrderId);

            // Sync shipment from order data
            shipmentService.syncShipmentFromOrder(order);
            System.out.println("✅ Synced shipment from new order");

        } catch (Exception e) {
            System.err.println("Error saving order to database: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void handleOrderUpdated(String rawBody) {
        System.out.println("\n=== ORDER UPDATED ===");

        // Extract from data.object.order path (same as order.created)
        String orderSection = extractSection(rawBody, "\"order\":");
        String orderId = extractValueFromSection(orderSection, "id");
        String state = extractValueFromSection(orderSection, "state");

        System.out.println("Order ID: " + orderId);
        System.out.println("State: " + state);

        try {
            // Update order fulfillment state
            var existingOrder = orderService.getOrderById(orderId);
            if (existingOrder.isPresent()) {
                Order order = existingOrder.get();
                order.setFulfillmentState(state);

                // Extract and update tracking information
                String trackingNumber = extractFromFulfillments(rawBody, "tracking_number");
                String trackingUrl = extractFromFulfillments(rawBody, "tracking_url");
                String carrier = extractFromFulfillments(rawBody, "carrier");

                if (!trackingNumber.equals("N/A") && !trackingNumber.isEmpty()) {
                    order.setTrackingNumber(trackingNumber);
                    System.out.println("✅ Updated tracking number: " + trackingNumber);
                }
                if (!trackingUrl.equals("N/A") && !trackingUrl.isEmpty()) {
                    order.setTrackingUrl(trackingUrl);
                    System.out.println("✅ Updated tracking URL: " + trackingUrl);
                }
                if (!carrier.equals("N/A") && !carrier.isEmpty()) {
                    order.setCarrier(carrier);
                    System.out.println("✅ Updated carrier: " + carrier);
                }

                // Update status based on fulfillment state
                if ("PREPARED".equals(state) || "PROPOSED".equals(state)) {
                    order.setStatus("shipped");
                } else if ("COMPLETED".equals(state)) {
                    order.setStatus("delivered");
                }

                orderService.updateOrder(order);
                System.out.println("✅ Updated order fulfillment state to: " + state);

                // Sync shipment from updated order data
                shipmentService.syncShipmentFromOrder(order);
                System.out.println("✅ Synced shipment from order update");
            }
        } catch (Exception e) {
            System.err.println("Error updating order: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private String extractNestedValue(String json, String objectKey, String valueKey) {
        // Find the object
        String searchObject = "\"" + objectKey + "\":{";
        int objectStart = json.indexOf(searchObject);
        if (objectStart == -1) {
            return "N/A";
        }

        // Find the value within the object
        String searchKey = "\"" + valueKey + "\":\"";
        int startIndex = json.indexOf(searchKey, objectStart);
        if (startIndex == -1) {
            return "N/A";
        }
        startIndex += searchKey.length();
        int endIndex = json.indexOf("\"", startIndex);
        if (endIndex == -1) {
            return "N/A";
        }
        return json.substring(startIndex, endIndex);
    }

    private String extractFromLineItems(String json, String key) {
        String searchArray = "\"line_items\":[{";
        int arrayStart = json.indexOf(searchArray);
        if (arrayStart == -1) {
            return "N/A";
        }

        String searchKey = "\"" + key + "\":\"";
        int startIndex = json.indexOf(searchKey, arrayStart);
        if (startIndex == -1) {
            return "N/A";
        }
        startIndex += searchKey.length();
        int endIndex = json.indexOf("\"", startIndex);
        if (endIndex == -1) {
            return "N/A";
        }
        return json.substring(startIndex, endIndex);
    }

    private String extractFromLineItems(String json, String nestedObject, String key) {
        String searchArray = "\"line_items\":[{";
        int arrayStart = json.indexOf(searchArray);
        if (arrayStart == -1) {
            return "N/A";
        }

        String searchObject = "\"" + nestedObject + "\":{";
        int objectStart = json.indexOf(searchObject, arrayStart);
        if (objectStart == -1) {
            return "N/A";
        }

        String searchKey = "\"" + key + "\":";
        int startIndex = json.indexOf(searchKey, objectStart);
        if (startIndex == -1) {
            return "N/A";
        }
        startIndex += searchKey.length();

        // Find end (could be number or string)
        int commaIndex = json.indexOf(",", startIndex);
        int braceIndex = json.indexOf("}", startIndex);
        int endIndex = Math.min(commaIndex == -1 ? Integer.MAX_VALUE : commaIndex,
                               braceIndex == -1 ? Integer.MAX_VALUE : braceIndex);

        String value = json.substring(startIndex, endIndex).trim();
        // Remove quotes if present
        if (value.startsWith("\"") && value.endsWith("\"")) {
            value = value.substring(1, value.length() - 1);
        }
        return value;
    }

    private String extractFromFulfillments(String json, String key) {
        // Handle both compact and formatted JSON
        int arrayStart = json.indexOf("\"fulfillments\"");
        if (arrayStart == -1) {
            return "N/A";
        }

        // Look for key with various spacing patterns
        String[] searchPatterns = {
            "\"" + key + "\":\"",      // No spaces
            "\"" + key + "\": \"",     // Space after colon
            "\"" + key + "\" : \"",    // Spaces around colon
            "\"" + key + "\" :\"",     // Space before colon
        };

        int startIndex = -1;
        for (String searchKey : searchPatterns) {
            startIndex = json.indexOf(searchKey, arrayStart);
            if (startIndex != -1) {
                startIndex += searchKey.length();
                break;
            }
        }

        // If not found directly, try in shipment_details
        if (startIndex == -1) {
            int detailsStart = json.indexOf("\"shipment_details\"", arrayStart);
            if (detailsStart != -1) {
                for (String searchKey : searchPatterns) {
                    startIndex = json.indexOf(searchKey, detailsStart);
                    if (startIndex != -1) {
                        startIndex += searchKey.length();
                        break;
                    }
                }
            }
        }

        if (startIndex == -1) {
            return "N/A";
        }
        int endIndex = json.indexOf("\"", startIndex);
        if (endIndex == -1) {
            return "N/A";
        }
        return json.substring(startIndex, endIndex);
    }

    private String extractFromAddress(String json, String key) {
        String searchObject = "\"address\":{";
        int objectStart = json.indexOf(searchObject);
        if (objectStart == -1) {
            return "N/A";
        }

        String searchKey = "\"" + key + "\":\"";
        int startIndex = json.indexOf(searchKey, objectStart);
        if (startIndex == -1) {
            return "N/A";
        }
        startIndex += searchKey.length();
        int endIndex = json.indexOf("\"", startIndex);
        if (endIndex == -1) {
            return "N/A";
        }
        return json.substring(startIndex, endIndex);
    }

    private int parseIntSafe(String value, int defaultValue) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    private double parseDoubleSafe(String value, double defaultValue) {
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    private String extractSection(String json, String sectionKey) {
        int startIndex = json.indexOf(sectionKey);
        if (startIndex == -1) {
            return "";
        }
        startIndex += sectionKey.length();
        // Find the matching closing brace
        int braceCount = 0;
        boolean inString = false;
        for (int i = startIndex; i < json.length(); i++) {
            char c = json.charAt(i);
            if (c == '"' && (i == 0 || json.charAt(i - 1) != '\\')) {
                inString = !inString;
            }
            if (!inString) {
                if (c == '{') braceCount++;
                if (c == '}') {
                    braceCount--;
                    if (braceCount == 0) {
                        return json.substring(startIndex, i + 1);
                    }
                }
            }
        }
        return "";
    }

    private String extractValueFromSection(String section, String key) {
        if (section.isEmpty()) return "N/A";

        // Try with no space after colon
        String searchKey = "\"" + key + "\":\"";
        int startIndex = section.indexOf(searchKey);

        // Try with space after colon if not found
        if (startIndex == -1) {
            searchKey = "\"" + key + "\": \"";
            startIndex = section.indexOf(searchKey);
        }

        if (startIndex == -1) {
            return "N/A";
        }
        startIndex += searchKey.length();
        int endIndex = section.indexOf("\"", startIndex);
        if (endIndex == -1) {
            return "N/A";
        }
        return section.substring(startIndex, endIndex);
    }
}
