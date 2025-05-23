// src/pages/OrderDetails.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const statusSteps = ["Order Placed", "Processed", "Shipped", "Delivered"];

const OrderDetails = () => {
  const navigate = useNavigate();
  

  const { state } = useLocation();
  const item = state?.item;

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-500">
        No order found.
      </div>
    );
  }

  // Determine current status step index
  const currentStatusIndex = statusSteps.indexOf(item.status);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10  shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-200">Order Details</h1>
      
      {/* STATUS TRACKER */}
      <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 border border-green-900 rounded-2xl bg-green-900 text-white p-2">Order Status</h2>
          <button
            onClick={() => navigate('/orders')}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600 transition"
          >
            Back
          </button>
        </div>
        <div className="flex items-center justify-between ">
          {statusSteps.map((step, index) => (
            <div key={index} className="flex-1 relative flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-6 h-6 rounded-full z-10 
                ${index <= currentStatusIndex ? "bg-green-500" : "bg-gray-300"}`}
              ></div>

              {/* Label */}
              <p className="text-sm mt-2 text-center text-gray-600 dark:text-gray-200">{step}</p>

              {/* Connecting Line */}
              {index !== statusSteps.length - 1 && (
                <div className={`absolute top-3 left-1/2 w-full h-1 z-0 
                  ${index < currentStatusIndex ? "bg-green-500" : "bg-gray-300"}`}
                  style={{ width: "100%" }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Info Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image[0]}
            alt={item.name}
            className="w-60 h-60 object-cover rounded-lg border border-gray-200 shadow"
          />
        </div>

        {/* Order Info */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.name}</p>
          {item.description && (
            <p className="text-gray-600 dark:text-gray-200 mb-4">{item.description}</p>
          )}

          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p><span className="font-medium">Price:</span> ₹{item.price}</p>
            <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
            <p><span className="font-medium">Size:</span> {item.size}</p>
            <p><span className="font-medium">Payment Method:</span> {item.paymentMethod}</p>
            <p><span className="font-medium">Order Date:</span> {new Date(item.date).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
