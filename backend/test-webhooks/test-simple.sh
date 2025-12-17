#!/bin/bash

# Simple test - just order created
WEBHOOK_URL="http://localhost:8080/api/webhooks/square"

echo "Testing order.created webhook..."

curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @order-created.json

echo ""
echo "Checking database..."

sleep 2

PGPASSWORD='hW6YOa2tJ9Xp7xtt' psql -h db.jrmgouykfgubpiqrynbh.supabase.co -p 6543 -U postgres -d postgres <<EOF
SELECT order_number, square_order_id, product_name, status
FROM orders
WHERE square_order_id = 'TEST-ORDER-12345';
EOF

echo ""
echo "Checking logs..."
tail -50 /tmp/spring-boot.log | grep -E "(ERROR|Exception|saved|created)" | tail -10
