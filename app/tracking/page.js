"use client";

import React, { useState, useEffect } from "react";
import ProtectedRoute from "../../Components/ProtectedRoute";
import { useAuth } from "../../Components/AuthContext";

function OrderTrackingPage() {
  const { signOut, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

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
        // Sort by most recent and take only the first 3 orders
        const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders.slice(0, 3));
      } else {
        setError("Failed to load orders");
      }
    } catch (err) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef7e6] py-4 sm:py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Greeting */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800">
            Hello, {user?.fullName || 'User'}!
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-gradient-to-b from-green-800 to-green-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-lg">
                {/* Header: Order ID and Status */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold">ORDER ID: {order.orderId}</h2>
                  <div className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    order.status.toLowerCase() === 'delivered' ? 'bg-green-600' :
                    order.status.toLowerCase() === 'shipped' ? 'bg-blue-600' :
                    'bg-yellow-600'
                  }`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                {/* Shipping Route - Responsive Layout */}
                <div className="mb-4">
                  {/* Mobile: Vertical Layout */}
                  <div className="flex flex-col items-center gap-2 sm:hidden text-xs">
                    <div className="px-3 py-2 border-2 border-white rounded-full">
                      Vancouver, BC
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="h-8 border-l-2 border-dashed border-white"></div>
                    </div>
                    <div className="px-3 py-2 border-2 border-white rounded-full text-center">
                      Est. Arrival: {new Date(order.estimatedDeliveryDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-8 border-l-2 border-dashed border-white"></div>
                      <div className="text-lg">↓</div>
                    </div>
                    <div className="px-3 py-2 border-2 border-white rounded-full">
                      {order.destination || 'Toronto, ON'}
                    </div>
                  </div>

                  {/* Desktop: Horizontal Layout */}
                  <div className="hidden sm:flex items-center justify-center gap-3 text-sm">
                    <div className="px-4 py-2 border-2 border-white rounded-full">
                      Vancouver, BC
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-12 md:w-16 border-t-2 border-dashed border-white"></div>
                    </div>
                    <div className="px-3 md:px-4 py-2 border-2 border-white rounded-full whitespace-nowrap">
                      Est. Arrival: {new Date(order.estimatedDeliveryDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 md:w-16 border-t-2 border-dashed border-white"></div>
                      <div className="text-lg">→</div>
                    </div>
                    <div className="px-4 py-2 border-2 border-white rounded-full">
                      {order.destination || 'Toronto, ON'}
                    </div>
                  </div>
                </div>

                {/* Frame/Order Reference */}
                <div className="mb-3 sm:mb-4 text-xs sm:text-sm opacity-80">
                  Frame {order.orderId}
                </div>

                {/* Product Info Section - Clickable */}
                <div
                  onClick={() => setSelectedOrder(order)}
                  className="border-2 border-white/40 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 cursor-pointer hover:border-white/60 hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={order.productImage || "/static/images/CitrusCandie.png"}
                      alt={order.productName}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold mb-1 truncate">{order.productName.toUpperCase()}</h3>
                      <p className="text-xs sm:text-sm md:text-base mb-0.5">PRICE: ${order.price}</p>
                      <p className="text-xs sm:text-sm md:text-base">QUANTITY: {order.quantity}</p>
                    </div>
                    <div className="text-2xl sm:text-3xl text-white/50 flex-shrink-0">›</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-white/20 mb-3 sm:mb-4"></div>

                {/* Footer: Total and Details Button */}
                <div className="flex justify-between items-center gap-2 sm:gap-3">
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                    Total: ${(order.price * order.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1.5 sm:px-6 sm:py-2 bg-[#d4c5a9] text-gray-700 rounded-full text-xs sm:text-base font-semibold hover:bg-[#c4b599] transition-colors whitespace-nowrap"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logout Button at Bottom */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={signOut}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            Logout
          </button>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-20 sm:pt-4"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-lg w-full shadow-2xl max-h-[75vh] sm:max-h-[80vh] overflow-y-auto relative my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center gap-4 mb-4 pr-6">
                <h3 className="text-lg sm:text-xl font-bold text-green-800">Order History</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Order Information */}
              <div className="space-y-3">
                {/* Order ID and Status */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Order ID</p>
                      <p className="text-sm sm:text-base font-bold text-gray-900">{selectedOrder.orderId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Status</p>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${
                        selectedOrder.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' :
                        selectedOrder.status.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="border-2 border-gray-200 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Product Information</h4>
                  <div className="flex gap-3">
                    <img
                      src={selectedOrder.productImage || "/static/images/CitrusCandie.png"}
                      alt={selectedOrder.productName}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h5 className="text-sm sm:text-base font-bold text-gray-900 mb-1">{selectedOrder.productName.toUpperCase()}</h5>
                      <div className="space-y-0.5 text-xs sm:text-sm text-gray-700">
                        <p>Price: <span className="font-semibold">${selectedOrder.price}</span></p>
                        <p>Quantity: <span className="font-semibold">{selectedOrder.quantity}</span></p>
                        <p>Subtotal: <span className="font-semibold">${(selectedOrder.price * selectedOrder.quantity).toFixed(2)}</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="border-2 border-gray-200 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Shipping Information</h4>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origin:</span>
                      <span className="font-medium text-gray-900">Vancouver, BC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Destination:</span>
                      <span className="font-medium text-gray-900">{selectedOrder.destination || 'Toronto, ON'}</span>
                    </div>
                    {selectedOrder.shippingCost && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping Cost:</span>
                        <span className="font-medium text-gray-900">${selectedOrder.shippingCost}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="border-2 border-gray-200 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Important Dates</h4>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedOrder.orderDate).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedOrder.estimatedDeliveryDate).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    {selectedOrder.deliveredDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivered Date:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedOrder.deliveredDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-semibold text-gray-700">Total Amount:</span>
                    <span className="text-lg sm:text-xl font-bold text-green-800">
                      ${(selectedOrder.price * selectedOrder.quantity + (selectedOrder.shippingCost || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Customer Info (if available) */}
                {(selectedOrder.customerName || selectedOrder.customerEmail) && (
                  <div className="border-2 border-gray-200 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">Customer Information</h4>
                    <div className="space-y-1.5 text-xs sm:text-sm">
                      {selectedOrder.customerName && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium text-gray-900">{selectedOrder.customerName}</span>
                        </div>
                      )}
                      {selectedOrder.customerEmail && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium text-gray-900">{selectedOrder.customerEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
