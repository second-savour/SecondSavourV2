#!/bin/bash

# Test webhook script for Square webhooks
# This script sends test webhook payloads to the local endpoint

WEBHOOK_URL="http://localhost:8080/api/webhooks/square"

echo "🧪 Testing Square Webhooks"
echo "=========================="
echo ""

# Test 1: Order Created
echo "📦 Test 1: Sending order.created webhook..."
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @order-created.json \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq .
echo ""
sleep 2

# Test 2: Payment Created
echo "💳 Test 2: Sending payment.created webhook..."
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @payment-created.json \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq .
echo ""
sleep 2

# Test 3: Payment Updated (COMPLETED)
echo "✅ Test 3: Sending payment.updated webhook (COMPLETED)..."
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @payment-updated.json \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq .
echo ""
sleep 2

# Test 4: Order Updated with Tracking
echo "🚚 Test 4: Sending order.updated webhook (with tracking)..."
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @order-updated-with-tracking.json \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq .
echo ""

echo "=========================="
echo "✅ All webhook tests completed!"
echo ""
echo "Check the Spring Boot logs at: /tmp/spring-boot.log"
echo "Or run: tail -f /tmp/spring-boot.log"
