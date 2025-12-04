import { Client } from "square";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(req) {
  try {
    const { cartItems, shipping } = await req.json();

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: "productionf", // Use 'production' for live payments
      // environment: "sandbox",
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

    // Compute Buy 6 Get 1 discount (based on cheapest bag)
    const totalQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const freeItems = Math.floor(totalQuantity / 6);
    const minUnitPrice = cartItems.length > 0 ? Math.min(...cartItems.map(i => Number(i.price || 0))) : 0;
    const discountCents = Math.max(0, Math.round(freeItems * minUnitPrice * 100));

    // Add shipping as a line item if applicable
    if (shipping > 0) {
      lineItems.push({
        name: "Shipping",
        quantity: "1",
        basePriceMoney: {
          amount: Math.round(shipping * 100),
          currency: "CAD",
        },
      });
    }

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(), // Ensure idempotency
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        lineItems: lineItems,
        ...(discountCents > 0
          ? {
              discounts: [
                {
                  name: "Buy 6 Get 1 Free",
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
