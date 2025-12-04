# Shipping Validation System Guide

## Overview
This system prevents shipping fraud by validating customer cities against a whitelist of Lower Mainland locations before creating Square payment links.

## How It Works

### 1. **City Validation at Checkout**
- Users must enter their city in the cart before checkout
- The system validates the city against a list of 19 eligible Lower Mainland cities
- Shipping fees are automatically calculated based on validation:
  - **Free**: Lower Mainland cities
  - **Free**: Any Canadian city with orders $50+ (before tax)
  - **$10**: Other Canadian cities (orders under $50)

### 2. **Eligible Lower Mainland Cities**
The following cities qualify for free local shipping:
- Aldergrove, Anmore, Belcarra, Burnaby
- Coquitlam, Delta
- Langley (city and township)
- Maple Ridge
- New Westminster, North Vancouver
- Pitt Meadows, Port Coquitlam, Port Moody
- Richmond
- Surrey
- Tsawwassen/Ladner
- Vancouver, West Vancouver, White Rock

### 3. **User Experience**
- **Shop Page**: Displays "Canada only" shipping notice
- **Product Pages**: Shows "🇨🇦 Ships to Canada only" badge
- **Cart**: 
  - City input field with real-time validation
  - Visual feedback (green = free shipping, yellow = $10 fee)
  - Link to view eligible cities
- **Locations Page**: 
  - "View Free Shipping Eligible Cities" button
  - Complete list of eligible cities
  - Shipping rate breakdown

### 4. **Technical Implementation**

#### Files Created/Modified:
1. **`utils/shippingValidation.js`** (NEW)
   - City validation functions
   - List of eligible cities
   - Flexible matching (handles "Vancouver, BC", etc.)

2. **`Components/Navbar.js`**
   - Added city input field
   - Real-time validation with visual feedback
   - Prevents checkout without city entry
   - Validates city before creating payment link

3. **`Components/CartContext.js`**
   - Added `shippingCity` state
   - Persists city to localStorage
   - Provides city to all components

4. **`app/map/page.js`**
   - Expandable section with all eligible cities
   - Shipping rates breakdown
   - "Canada only" notice

5. **`app/shop/page.js`**
   - Added "Canada only" banner

6. **`app/citrusTreat/page.js` & `app/lemonTreat/page.js`**
   - Added "Ships to Canada only" badges

#### Key Functions:
```javascript
// Validate a city
isLowerMainlandCity("Vancouver") // returns true
isLowerMainlandCity("Toronto")   // returns false

// Get all cities
getAllLowerMainlandCities() // returns formatted array
```

## Preventing Fraud

### Before This Update:
❌ Users could select "Lower Mainland" to get free shipping, then enter any address at Square checkout

### After This Update:
✅ Users must enter their city upfront
✅ System validates city and calculates correct shipping
✅ Validated shipping amount is sent to Square
✅ Clear messaging about Canada-only shipping
✅ Transparent list of eligible cities

## Testing

### Test Cases:
1. **Lower Mainland City**
   - Enter "Vancouver" → Should show green validation, free shipping
   
2. **Non-Lower Mainland (under $50)**
   - Enter "Toronto" → Should show yellow validation, $10 shipping
   
3. **Non-Lower Mainland ($50+)**
   - Enter "Toronto" with $50+ cart → Should show free shipping message
   
4. **Empty City**
   - Try to checkout without entering city → Should show alert

5. **Variations**
   - "vancouver, bc" → Should recognize as Vancouver
   - "North Van" → Should recognize as North Vancouver

## Future Enhancements (Optional)

1. **Province Validation**: Add BC province check
2. **Postal Code**: Additional validation via postal code
3. **Address Autocomplete**: Use Google Places API
4. **Square Webhooks**: Validate address after payment (advanced)

## Support

If a customer claims incorrect shipping:
1. Check their entered city in Square order details
2. Verify against eligible cities list
3. Confirm order total meets $50+ threshold for free shipping

## Notes
- Only Canada shipping is supported
- Validation is case-insensitive and flexible
- City is saved to localStorage for returning customers
- All pricing in CAD


