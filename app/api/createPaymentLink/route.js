import { Client } from "square";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(req) {
  try {
    const { name, amount } = await req.json();

    // Amount already includes 12% GST from the frontend
    const totalWithTax = amount;

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: "production", // Use 'production' for live payments
      // environment: "sandbox",
    });

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(), // Ensure idempotency
      quickPay: {
        name,
        priceMoney: {
          amount: Math.round(totalWithTax * 100), // Convert dollars to cents (total already includes GST)
          currency: "CAD",
        },
        locationId: process.env.SQUARE_LOCATION_ID,
      },
      // order: {
      //   locationId: process.env.SQUARE_LOCATION_ID,
      //   taxes: [
      //       {
      //           name: 'Sales Tax',
      //           percentage: '5',
      //       },
      //   ],
      //   discounts: [
      //       {
      //           name: '10% off',
      //           percentage: '10',
      //       },
      //   ],
      // },
      checkoutOptions: {
        //allowTipping: true,
        customFields: [
          {
            title: "Located within GVA?"
          },
        ],
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
