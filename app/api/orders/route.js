import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET all orders from Supabase database
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const customerEmail = searchParams.get('customerEmail');
    const userId = searchParams.get('userId'); // Get user ID from query params

    console.log('Fetching orders for:', { customerEmail, userId });

    // Build query
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by user_id if provided (most common case for logged-in users)
    if (userId) {
      query = query.eq('user_id', userId);
    }
    // Otherwise filter by email if provided
    else if (customerEmail) {
      query = query.eq('email', customerEmail.toLowerCase());
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log(`Found ${orders?.length || 0} orders`);

    // Transform database orders to frontend format
    const transformedOrders = (orders || []).map(order => ({
      orderId: order.square_order_id || order.order_number,
      orderNumber: order.order_number,
      productName: order.product_name,
      productImage: order.product_image || "/static/images/CitrusCandie.png",
      quantity: order.quantity,
      price: order.price,
      orderDate: order.order_date || order.created_at,
      estimatedDeliveryDate: order.estimated_delivery_date,
      deliveredDate: order.delivered_date,
      status: order.status,
      destination: order.destination,
      shippingCost: order.shipping_cost || 0,
      customerName: order.customer_name,
      customerEmail: order.customer_email || order.email,

      // Tracking info
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
      carrier: order.carrier,
      fulfillmentUid: order.fulfillment_uid,
      fulfillmentState: order.fulfillment_state
    }));

    return new Response(
      JSON.stringify(transformedOrders),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    console.error("Full error details:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch orders",
        message: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
