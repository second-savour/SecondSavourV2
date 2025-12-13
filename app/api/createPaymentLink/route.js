import { Client } from "square";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(req) {
  try {
    const { cartItems } = await req.json();

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: "production", // Use 'sandbox' for testing, 'production' for live payments
      // environment: "sandox"
    });

    // Create line items from cart
    const lineItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: Math.round(item.price * 100), // Convert to cents
        currency: "CAD",
      },
    }));

    // Calculate 15% discount on cart subtotal
    const cartSubtotal = cartItems.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
    const discountCents = Math.round(cartSubtotal * 0.15 * 100); // 15% discount in cents

    // Free shipping - do not add shipping as a line item
    // Shipping is free for all orders during Christmas promotion

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(), // Ensure idempotency
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        lineItems: lineItems,
        ...(discountCents > 0
          ? {
              discounts: [
                {
                  name: "Christmas Special - 15% Off + Free Shipping",
                  amountMoney: { amount: discountCents, currency: "CAD" },
                  scope: "ORDER",
                },
              ],
            }
          : {}),
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
