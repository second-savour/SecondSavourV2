# Test Orders Created for Kurtis123@gmail.com

## Summary

✅ Successfully created **3 test orders** in the Supabase database for testing the frontend.

## Order Details

### Order 1: Citrus Candies Variety Pack 🎁
- **Order Number**: WH-KURTIS-ORDER-001
- **Product**: Citrus Candies Variety Pack
- **Quantity**: 3
- **Price**: $89.97
- **Status**: Shipped ✅
- **Carrier**: UPS
- **Tracking**: 1Z999AA10123456789
- **Customer**: Kurtis Johnson
- **Email**: Kurtis123@gmail.com
- **Destination**: Portland, OR

### Order 2: Lemon Citrus Candies 🍋
- **Order Number**: WH-KURTIS-ORDER-002
- **Product**: Lemon Citrus Candies - Small Box
- **Quantity**: 1
- **Price**: $14.99
- **Status**: Shipped ✅
- **Carrier**: USPS
- **Tracking**: 9400111899562892345678
- **Customer**: Kurtis Johnson
- **Email**: Kurtis123@gmail.com
- **Destination**: Portland, OR

### Order 3: Orange Gift Box 🍊
- **Order Number**: WH-KURTIS-ORDER-003
- **Product**: Orange Citrus Candies Gift Box
- **Quantity**: 2
- **Price**: $49.98
- **Status**: Processing ⏳
- **Carrier**: Not yet shipped
- **Customer**: Kurtis Johnson
- **Email**: Kurtis123@gmail.com
- **Destination**: Portland, OR

## Testing the Frontend

You should now be able to see these orders in your frontend when you:

1. **View all orders** - Shows all 3 orders
2. **Filter by email** - Search for `Kurtis123@gmail.com`
3. **View order details** - Click on any order to see full details
4. **Track shipments** - Orders 1 and 2 have tracking numbers
5. **Check order status** - Mix of "shipped" and "processing" statuses

## Order Statistics

- **Total Orders**: 3
- **Total Revenue**: $154.94
- **Shipped**: 2 orders
- **Processing**: 1 order
- **Carriers Used**: UPS, USPS

## Database Query

To view these orders in the database:

```sql
SELECT
  order_number,
  product_name,
  quantity,
  price,
  status,
  carrier,
  tracking_number
FROM orders
WHERE email = 'Kurtis123@gmail.com'
ORDER BY created_at ASC;
```

## Recreating Orders

To delete and recreate these test orders:

```bash
# Delete existing test orders
PGPASSWORD='hW6YOa2tJ9Xp7xtt' psql -h db.jrmgouykfgubpiqrynbh.supabase.co -p 6543 -U postgres -d postgres -c "DELETE FROM orders WHERE email = 'Kurtis123@gmail.com';"

# Recreate orders
cd /Users/kurtis/Desktop/SecondSavour2/SecondSavourV2/backend/test-webhooks
./create-kurtis-orders.sh
```

## Files Created

- `kurtis-order-1.json` - Variety Pack order payload
- `kurtis-order-2.json` - Lemon Candies order payload
- `kurtis-order-3.json` - Orange Gift Box order payload
- `create-kurtis-orders.sh` - Script to create all 3 orders

## Notes

- All orders use the same shipping address (456 Oak Avenue, Portland, OR)
- Order dates are set to Dec 10, 12, and 13, 2025 respectively
- Tracking numbers are realistic formats for UPS and USPS
- Order 3 is intentionally left in "processing" status to show different states

Enjoy testing your frontend! 🎉
