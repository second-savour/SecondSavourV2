import { Client } from "square";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(req) {
  try {
    const { cartItems, discount, subtotal, tax, shipping, total } = await req.json();

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      // environment: "production", // Use 'sandbox' for testing, 'production' for live payments
      // environment: "sandbox",
    });

    // Calculate total items before discount
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalBeforeDiscount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Apply discount proportionally to each item's price
    // This way the discount is baked into the prices shown in Square
    const discountRatio = discount > 0 ? (totalBeforeDiscount - discount) / totalBeforeDiscount : 1;

    const lineItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        // Apply the discount ratio to each item's price
        amount: Math.round(item.price * discountRatio * 100), // Convert to cents with discount applied
        currency: "CAD",
      },
      ...(discount > 0 ? {
        note: `Original: $${item.price.toFixed(2)} (Buy 6 Get 1 FREE applied)`
      } : {})
    }));

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(), // Ensure idempotency
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        lineItems: lineItems,
        // No discount field - prices already include discount
        taxes: [
          {
            name: 'GST (5%)',
            percentage: '5',
          },
        ],
      },
      checkoutOptions: {
        //allowTipping: true,
        redirectUrl: "https://www.secondsavour.ca/checkoutConfirm", // Redirect URL after payment
        merchantSupportEmail: "sales@secondsavour.ca",
        askForShippingAddress: true,
        acceptedPaymentMethods: {
          apple_pay: true,
          google_pay: true,
        },
        enableCoupon: true, // Moved inside checkoutOptions
      },

      paymentNote: "Thank you for your purchase!", // Payment note for the link
    });

    // Log the payment link URL to the console
    console.log("Payment link created:", response.result.paymentLink.longUrl);

    return new Response(
      JSON.stringify({ paymentLink: response.result.paymentLink }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    console.error("Full error details:", error); // Log full error object
    return new Response(
      JSON.stringify({ error: "Failed to create payment link" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
