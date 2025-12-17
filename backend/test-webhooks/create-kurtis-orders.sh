#!/bin/bash

# Script to create test orders for Kurtis123@gmail.com

WEBHOOK_URL="http://localhost:8080/api/webhooks/square"

echo "🛍️  Creating Test Orders for Kurtis123@gmail.com"
echo "=================================================="
echo ""

# Order 1 - Variety Pack (3 items)
echo "📦 Order 1: Creating Citrus Candies Variety Pack (3 items, $89.97)..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @kurtis-order-1.json
echo " ✅"
sleep 1

# Payment for Order 1
echo "💳 Order 1: Processing payment..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
  "merchant_id": "ML6K8T0VGT9KZ",
  "type": "payment.updated",
  "event_id": "kurtis-payment-001",
  "created_at": "2025-12-10T14:31:00Z",
  "data": {
    "type": "payment",
    "id": "kurtis-payment-event-001",
    "object": {
      "payment": {
        "id": "KURTIS-PAYMENT-001",
        "order_id": "KURTIS-ORDER-001",
        "status": "COMPLETED",
        "source_type": "CARD",
        "customer_id": "CUSTOMER-KURTIS",
        "receipt_url": "https://squareup.com/receipt/preview/KURTIS-RECEIPT-001",
        "receipt_number": "KURTIS-001",
        "total_money": {
          "amount": 8997,
          "currency": "USD"
        }
      }
    }
  }
}'
echo " ✅"
sleep 1

# Ship Order 1
echo "🚚 Order 1: Adding tracking (UPS)..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
  "merchant_id": "ML6K8T0VGT9KZ",
  "type": "order.updated",
  "event_id": "kurtis-order-001-shipped",
  "created_at": "2025-12-11T09:00:00Z",
  "data": {
    "type": "order",
    "id": "kurtis-event-001-update",
    "object": {
      "order": {
        "id": "KURTIS-ORDER-001",
        "state": "COMPLETED",
        "fulfillments": [
          {
            "uid": "fulfillment-001",
            "type": "SHIPMENT",
            "state": "PREPARED",
            "tracking_number": "1Z999AA10123456789",
            "tracking_url": "https://www.ups.com/track?tracknum=1Z999AA10123456789",
            "shipment_carrier": "UPS"
          }
        ]
      }
    }
  }
}'
echo " ✅"
sleep 1

echo ""

# Order 2 - Small Box (1 item)
echo "📦 Order 2: Creating Lemon Citrus Candies (1 item, $14.99)..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @kurtis-order-2.json
echo " ✅"
sleep 1

# Payment for Order 2
echo "💳 Order 2: Processing payment..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
  "merchant_id": "ML6K8T0VGT9KZ",
  "type": "payment.updated",
  "event_id": "kurtis-payment-002",
  "created_at": "2025-12-12T10:16:00Z",
  "data": {
    "type": "payment",
    "id": "kurtis-payment-event-002",
    "object": {
      "payment": {
        "id": "KURTIS-PAYMENT-002",
        "order_id": "KURTIS-ORDER-002",
        "status": "COMPLETED",
        "source_type": "CARD",
        "customer_id": "CUSTOMER-KURTIS",
        "receipt_url": "https://squareup.com/receipt/preview/KURTIS-RECEIPT-002",
        "receipt_number": "KURTIS-002",
        "total_money": {
          "amount": 1499,
          "currency": "USD"
        }
      }
    }
  }
}'
echo " ✅"
sleep 1

# Ship Order 2
echo "🚚 Order 2: Adding tracking (USPS)..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
  "merchant_id": "ML6K8T0VGT9KZ",
  "type": "order.updated",
  "event_id": "kurtis-order-002-shipped",
  "created_at": "2025-12-13T08:30:00Z",
  "data": {
    "type": "order",
    "id": "kurtis-event-002-update",
    "object": {
      "order": {
        "id": "KURTIS-ORDER-002",
        "state": "COMPLETED",
        "fulfillments": [
          {
            "uid": "fulfillment-002",
            "type": "SHIPMENT",
            "state": "PREPARED",
            "tracking_number": "9400111899562892345678",
            "tracking_url": "https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899562892345678",
            "shipment_carrier": "USPS"
          }
        ]
      }
    }
  }
}'
echo " ✅"
sleep 1

echo ""

# Order 3 - Gift Box (2 items) - Just created, no payment yet
echo "📦 Order 3: Creating Orange Citrus Candies Gift Box (2 items, $49.98)..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @kurtis-order-3.json
echo " ✅"
sleep 1

# Payment for Order 3
echo "💳 Order 3: Processing payment..."
curl -s -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
  "merchant_id": "ML6K8T0VGT9KZ",
  "type": "payment.updated",
  "event_id": "kurtis-payment-003",
  "created_at": "2025-12-13T16:46:00Z",
  "data": {
    "type": "payment",
    "id": "kurtis-payment-event-003",
    "object": {
      "payment": {
        "id": "KURTIS-PAYMENT-003",
        "order_id": "KURTIS-ORDER-003",
        "status": "COMPLETED",
        "source_type": "CARD",
        "customer_id": "CUSTOMER-KURTIS",
        "receipt_url": "https://squareup.com/receipt/preview/KURTIS-RECEIPT-003",
        "receipt_number": "KURTIS-003",
        "total_money": {
          "amount": 4998,
          "currency": "USD"
        }
      }
    }
  }
}'
echo " ✅"

echo ""
echo "=================================================="
echo "✅ Created 3 orders for Kurtis123@gmail.com"
echo ""
echo "Order Summary:"
echo "  1. Variety Pack (3 items) - $89.97 - SHIPPED (UPS)"
echo "  2. Lemon Candies (1 item) - $14.99 - SHIPPED (USPS)"
echo "  3. Orange Gift Box (2 items) - $49.98 - PROCESSING"
echo ""
echo "Checking database..."
echo ""

PGPASSWORD='hW6YOa2tJ9Xp7xtt' psql -h db.jrmgouykfgubpiqrynbh.supabase.co -p 6543 -U postgres -d postgres <<EOF
SELECT
  order_number,
  product_name,
  quantity,
  price,
  status,
  carrier,
  LEFT(tracking_number, 20) as tracking
FROM orders
WHERE email = 'Kurtis123@gmail.com'
ORDER BY created_at DESC;
EOF
