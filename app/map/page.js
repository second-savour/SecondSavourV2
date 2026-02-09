"use client";
import React, { useState } from "react";
import Segment from "../../Components/Segment.js";
import { getAllLowerMainlandCities } from "../../utils/shippingValidation.js";

function Page() {
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const eligibleCities = getAllLowerMainlandCities();

  return (
    <div className="w-[100%] bg-[#FEF7E6] flex justify-center">
      <div className="flex flex-col min-h-fit text-center w-[90%]">
        <div className="mt-[6vh] lg:mt-[0vh] mb-6">
          <h1> Where to Find Us </h1>
          <p className="mt-[2%] text-gray-800 max-w-[600px] mx-auto">
            Craving our sweet treats? Use the map below to discover stores carrying Second Savour products. Availability may vary by location.
          </p>
          
          {/* Shipping Info Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowShippingInfo(!showShippingInfo)}
              className="bg-my-green text-white px-5 py-2 rounded-full hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm whitespace-nowrap w-auto"
            >
              {showShippingInfo ? "Hide" : "View"} Free Shipping Eligible Cities
            </button>
          </div>
        </div>

        {/* Shipping Information Panel */}
        {showShippingInfo && (
          <div className="bg-white border-2 border-my-green rounded-2xl p-5 lg:p-6 shadow-xl max-w-[800px] w-full mx-auto mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-my-green mb-3">Free Local Shipping Cities</h2>
            <p className="text-base text-gray-700 mb-4">
              <strong>📦 We ship to Canada only.</strong> Enjoy free local shipping if you&apos;re located in any of these Lower Mainland cities:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-left mb-4">
              {eligibleCities.map((city, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-green-50 p-1.5 rounded">
                  <span className="text-green-600 text-sm">✓</span>
                  <span className="text-sm font-medium">{city}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-2 mt-2" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              <h3 className="text-sm font-semibold text-gray-800 mb-1.5">Shipping Rates:</h3>
              <ul className="text-left space-y-0.5 leading-tight text-gray-600">
                <li className="flex items-start gap-1">
                  <span className="text-green-600 text-base">✓</span>
                  <span className="text-base"><strong>Free</strong> for Lower Mainland cities listed above</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-green-600 text-base">✓</span>
                  <span className="text-base"><strong>Free</strong> on orders $15+ (before tax) anywhere in Canada</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-yellow-600 text-base">$</span>
                  <span className="text-base"><strong>$10.00</strong> flat rate for other Canadian cities (orders under $15)</span>
                </li>
              </ul>
            </div>

            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
              <p className="text-xs text-blue-800 leading-tight">
                <strong>Note:</strong> Please ensure the shipping address you provide at checkout matches your city.
              </p>
            </div>
          </div>
        )}

        <div className="border-2 border-black w-[100%] h-auto flex flex-cols justify-center mb-12">
          <iframe 
            className="w-[100%]"
            src="https://www.google.com/maps/d/embed?mid=1YzlyxYbxnGYx4AuzSkG07qeSrERkqi4&ehbc=2E312F"
            width="640" 
            height="480"
          ></iframe>
        </div>

        <Segment
          header={"Check our our virtual selection"}
          Title={"Order Online"}
          Text={
            "At Second Savour, we're expanding our sustainability initiatives to engage people outside of our communities.  Join us in making a positive impact on our planet!"
          }
          ButtonText={"Browse Products"}
          img={"/static/images/boxes.png"}
          clickTo={"/shop"}
        />
      </div>
    </div>
  );
}

export default Page;