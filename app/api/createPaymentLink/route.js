import { Client } from "square";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(req) {
  try {
    const { name, amount } = await req.json();

    // Amount includes 5% GST from the frontend
    const totalWithTax = amount;

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      //environment: "production",
      environment: "sandbox",
    });

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(), // Ensure idempotency
      quickPay: {
        name,
        priceMoney: {
          amount: Math.round(totalWithTax * 100), // Convert dollars to cents (total includes GST)
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

    // Return detailed error for debugging
    const errorDetails = {
      error: "Failed to create payment link",
      message: error.message,
      details: error.errors || error.body || "No additional details",
      statusCode: error.statusCode
    };

    return new Response(
      JSON.stringify(errorDetails),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Update fulfillment with shipment tracking information
export async function PATCH(req) {
  try {
    const { orderId, fulfillmentUid, trackingNumber, trackingUrl, carrier, shippingNote } = await req.json();

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: "sandbox",
      // environment: "sandbox",
    });

    // First, retrieve the current order to get its version
    const getOrderResponse = await client.ordersApi.retrieveOrder(orderId);
    const order = getOrderResponse.result.order;

    // Update the order with fulfillment tracking details
    const updateResponse = await client.ordersApi.updateOrder(orderId, {
      order: {
        version: order.version,
        locationId: process.env.SQUARE_LOCATION_ID,
        fulfillments: [
          {
            uid: fulfillmentUid,
            state: "COMPLETED", // Mark as shipped
            shipmentDetails: {
              trackingNumber: trackingNumber,
              trackingUrl: trackingUrl,
              carrier: carrier,
              shippingNote: shippingNote,
              shippedAt: new Date().toISOString(), // Current timestamp in RFC 3339 format
            },
          },
        ],
      },
    });

    console.log("Fulfillment updated with tracking:", trackingNumber);

    return new Response(
      JSON.stringify({
        success: true,
        order: updateResponse.result.order
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Fulfillment update error:", error.message);
    console.error("Full error details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update fulfillment tracking" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Create order with fulfillment capability (alternative approach)
export async function PUT(req) {
  try {
    const { name, amount, lineItems, customerName, customerEmail } = await req.json();

    console.log("PUT request data:", { name, amount, customerName, customerEmail });

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      //environment: "production",
      environment: "sandbox",
    });

    const orderData = {
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        lineItems: [
          {
            name: name || "Product",
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(Math.round(amount * 100)),
              currency: "CAD",
            },
          },
        ],
        fulfillments: [
          {
            type: "SHIPMENT",
            state: "PROPOSED",
            shipmentDetails: {
              recipient: {
                displayName: customerName,
                emailAddress: customerEmail,
              },
              // Tracking info will be added later via PATCH
            },
          },
        ],
      },
      idempotencyKey: crypto.randomUUID(),
    };

    console.log("Creating order with data:", JSON.stringify(orderData, null, 2));

    // Create an order with fulfillment
    const orderResponse = await client.ordersApi.createOrder(orderData);

    const order = orderResponse.result.order;

    // Create payment link for the order
    const paymentLinkResponse = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        orderId: order.id,
        version: order.version,
      },
      checkoutOptions: {
        customFields: [
          {
            title: "Located within GVA?"
          },
        ],
        redirectUrl: "https://www.secondsavour.ca/checkoutConfirm",
        merchantSupportEmail: "sales@secondsavour.ca",
        askForShippingAddress: true,
        acceptedPaymentMethods: {
          apple_pay: true,
          google_pay: true,
        },
        enableCoupon: true,
      },
      paymentNote: "Thank you for your purchase!",
    });

    console.log("Order created with fulfillment:", order.id);
    console.log("Payment link:", paymentLinkResponse.result.paymentLink.longUrl);

    return new Response(
      JSON.stringify({
        paymentLink: paymentLinkResponse.result.paymentLink,
        orderId: order.id,
        fulfillmentUid: order.fulfillments[0].uid
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Order creation error:", error.message);
    console.error("Full error details:", error);

    // Return detailed error for debugging
    const errorDetails = {
      error: "Failed to create order with fulfillment",
      message: error.message,
      details: error.errors || error.body || "No additional details",
      statusCode: error.statusCode
    };

    return new Response(
      JSON.stringify(errorDetails),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
