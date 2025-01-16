import { Client } from 'square';

export async function POST(req) {
  try {
    const { name, amount } = await req.json();

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: 'sandbox', // Use 'production' for live payments
    });

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(), // Ensure idempotency
      quickPay: {
        name,
        priceMoney: {
          amount: amount * 100, // Convert dollars to cents
          currency: 'CAD',
        },
        locationId: process.env.SQUARE_LOCATION_ID,
      },
    });

    // Log the payment link URL to the console
    console.log('Payment link created:', response.result.paymentLink.url);

    return new Response(
      JSON.stringify({ paymentLink: response.result.paymentLink }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('API Error:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to create payment link' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
