package com.SecondSavour.store.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/square")
@CrossOrigin(origins = "*")
public class SquareWebhookController {

    @Value("${square.webhook.signature.key:}")
    private String webhookSignatureKey;

    @PostMapping
    public ResponseEntity<Map<String, Object>> handleWebhook(
            @RequestBody String rawBody,
            @RequestHeader(value = "x-square-hmacsha256-signature", required = false) String signature) {

        System.out.println("\n=== SQUARE WEBHOOK RECEIVED ===");

        try {
            // Verify webhook signature for security
            if (signature == null || webhookSignatureKey.isEmpty()) {
                System.err.println("Missing webhook signature or signature key");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Missing signature"));
            }

            boolean isValid = verifyWebhookSignature(rawBody, signature, webhookSignatureKey);
            if (!isValid) {
                System.err.println("Invalid webhook signature");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Invalid signature"));
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
        String searchKey = "\"" + key + "\":\"";
        int startIndex = json.indexOf(searchKey);
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

        String paymentId = extractNestedValue(rawBody, "payment", "id");
        String orderId = extractNestedValue(rawBody, "payment", "order_id");
        String status = extractNestedValue(rawBody, "payment", "status");
        String sourceType = extractNestedValue(rawBody, "payment", "source_type");
        String customerId = extractNestedValue(rawBody, "payment", "customer_id");
        String receiptUrl = extractNestedValue(rawBody, "payment", "receipt_url");
        String receiptNumber = extractNestedValue(rawBody, "payment", "receipt_number");

        System.out.println("Payment ID: " + paymentId);
        System.out.println("Order ID: " + orderId);
        System.out.println("Status: " + status);
        System.out.println("Source Type: " + sourceType);

        if ("COMPLETED".equals(status)) {
            System.out.println("✅ PAYMENT COMPLETED!");
            System.out.println("Customer ID: " + customerId);
            System.out.println("Receipt URL: " + receiptUrl);
            System.out.println("Receipt Number: " + receiptNumber);

            // TODO: Send confirmation email
            // TODO: Update order status in database
            // TODO: Trigger fulfillment process
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

        String orderId = extractNestedValue(rawBody, "order", "id");
        String state = extractNestedValue(rawBody, "order", "state");

        System.out.println("Order ID: " + orderId);
        System.out.println("State: " + state);

        // TODO: Save order to database
    }

    private void handleOrderUpdated(String rawBody) {
        System.out.println("\n=== ORDER UPDATED ===");

        String orderId = extractNestedValue(rawBody, "order", "id");
        String state = extractNestedValue(rawBody, "order", "state");

        System.out.println("Order ID: " + orderId);
        System.out.println("State: " + state);

        if ("COMPLETED".equals(state)) {
            System.out.println("✅ ORDER COMPLETED!");

            // TODO: Process completed order
            // - Update inventory
            // - Send shipping notification
            // - Update order tracking
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
}
