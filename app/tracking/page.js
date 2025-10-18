"use client";

import React, { useState, useEffect } from "react";
import ProtectedRoute from "../../Components/ProtectedRoute";

function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load sample orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError("Failed to load orders");
      }
    } catch (err) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders([data]);
      } else {
        setError("Order not found");
        setOrders([]);
      }
    } catch (err) {
      setError("Unable to connect to server");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600";
      case "shipped":
        return "text-blue-600";
      case "processing":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressPercentage = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return 33;
      case "shipped":
        return 66;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[#fef7e6] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">ORDER TRACKING</h1>
          <p className="text-gray-700 text-lg">Track your order from the moment it's placed to delivery.</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Order ID (e.g., ORD-001)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </form>
          {error && (
            <p className="text-red-600 mt-2">{error}</p>
          )}
        </div>

        {/* History Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">History</h2>
          
          {loading && orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found. Try searching with a specific Order ID.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.orderId} className="border border-blue-300 rounded-lg p-6 bg-blue-50">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Info */}
                    <div className="flex items-center gap-4">
                      <div className="text-gray-600 text-sm">
                        {order.quantity}x
                      </div>
                      <img
                        src={order.productImage || "/static/images/CitrusCandie.png"}
                        alt={order.productName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-black">
                          {order.productName}
                        </h3>
                        <p className="text-gray-600">Order ID: {order.orderId}</p>
                        <p className="text-gray-600">${order.price}</p>
                      </div>
                    </div>

                    {/* Status Progress */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {new Date(order.orderDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          }).toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-600">
                          {new Date(order.estimatedDeliveryDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          }).toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(order.status)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Ordered</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <span className={`font-semibold text-lg ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}!
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Invoice
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Product Support
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Write Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order ID Display */}
        {orders.length > 0 && (
          <div className="text-center mt-6">
            <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg">
              <span className="font-mono text-sm">
                {orders.length === 1 ? orders[0].orderId : `${orders.length} orders found`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <ProtectedRoute>
      <OrderTrackingPage />
    </ProtectedRoute>
  );
}
