"use client";

import React, { useState, useEffect } from "react";
import Hyperlink from "./Hyperlink";
import { useCart } from "../Components/CartContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CheckoutComponent from "../Components/CheckoutComponent";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { isLowerMainlandCity } from "../utils/shippingValidation";

function Navbar() {
  const {
    cart,
    totalPrice,
    discount,
    discountedSubtotal,
    tax,
    shipping,
    estTotal,
    setCart,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    popup,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    purchase,
    setPurchase,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    quantity,
    isCartOpen,
    setIsCartOpen,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    shippingLocation,
    setShippingLocation,
    shippingCity,
    setShippingCity,
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cityValidation, setCityValidation] = useState({ isValid: null, message: "" });

  // Initialize enteredCity from context on mount
  const [enteredCity, setEnteredCity] = useState("");
  
  useEffect(() => {
    if (shippingCity) {
      setEnteredCity(shippingCity);
      // Validate the saved city
      const isValid = isLowerMainlandCity(shippingCity);
      if (isValid) {
        setCityValidation({ 
          isValid: true, 
          message: "✓ Eligible for free local shipping!" 
        });
      } else {
        setCityValidation({ 
          isValid: false, 
          message: "This location requires a $10 shipping fee (or free shipping on orders $15+)" 
        });
      }
    }
  }, [shippingCity]);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setEnteredCity(city);
    setShippingCity(city); // Save to context/localStorage
    
    if (city.trim() === "") {
      setCityValidation({ isValid: null, message: "" });
      setShippingLocation("outside"); // Default to shipping fee
      return;
    }
    
    const isValid = isLowerMainlandCity(city);
    
    if (isValid) {
      setCityValidation({ 
        isValid: true, 
        message: "✓ Eligible for free local shipping!" 
      });
      setShippingLocation("lowerMainland");
    } else {
      setCityValidation({ 
        isValid: false, 
        message: "This location requires a $10 shipping fee (or free shipping on orders $15+)" 
      });
      setShippingLocation("outside");
    }
  };

  const handleCheckout = async () => {
    // Only require city if below free shipping threshold
    if (discountedSubtotal < 15 && !enteredCity.trim()) {
      alert("Please enter your city to calculate shipping costs.");
      return;
    }

    // Validate that shipping location matches entered city
    const isLowerMainland = isLowerMainlandCity(enteredCity);
    const actualShipping = discountedSubtotal >= 15 ? 0 : (isLowerMainland ? 0 : 10);

    setLoading(true);
    try {
      const response = await fetch("/api/createPaymentLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart, // Send individual cart items
          subtotal: totalPrice, // Subtotal before tax and shipping
          discount: discount, // Discount amount from cart
          tax: tax, // Tax amount
          shipping: actualShipping, // Validated shipping amount
          total: estTotal, // Final total
          shippingCity: enteredCity.trim(), // Include city for reference
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error:", errorText);
        throw new Error("Failed to create payment link");
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        window.location.assign(data.paymentLink.url, "_blank");
      } else {
        const text = await response.text();
        console.error("Unexpected response format:", text);
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the payment link");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1020);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = (set, val) => set(!val);

  return (
    <nav className=" mb-[8vh] md:mb-[5vh] lg:mb-[3%] ">
      <div
        className=" z-20 flex flex-row justify-between fixed h-[fit] lg:h-[6%] 
        top-0 left-0 bg---color-black backdrop-blur-[8px]"
      ></div>

      <div className=" flex flex-row justify-center lg:mt-[1%]">
        <div
          className={`flex flex-col lg:flex-row justify-between lg:w-[60vw] w-[100vw] lg:rounded-full h-[fit] z-[100] lg:py-[1%] lg:pb-[1%] pb-[10vh] lg:px-[3%] fixed lg:mt-[0%] mt-[-3%] lg:pt-[21] pt-[5%] rounded-[0.5rem] ease-in-out duration-[500ms] lg:bg-my-beige  ${
            isOpen ? "bg-green-700" : "bg-[#fef7e6]"
          }`}
        >
          <div
            className={`flex flex-row lg:w-fit w-full h-fit justify-between lg:relative  fixed lg:px-0  pr-[1%] pl-[5%]
              isOpen ? "bg-none" : "bg-[#fef7e6]"`}
          >
            <div className="flex flex-col justify-center">
                <Link
                    href="/"
                    className="text-2xl lg:text-xl font-bold tracking-wide"
                    style={{ color: "var(--color-black)" }}
                >
                    SECOND SAVOUR
                </Link>
            </div>


            <button
              className="lg:hidden lg:bg-transparent lg:w-0 w-fit bg-transparent group-hover:bg-transparent hover:bg-transparent active:bg-transparent"
              onClick={() => toggle(setIsOpen, isOpen)}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <span
                className={`text-3xl font-sans lg:hidden bg-transparent font-bold ease-in-out duration-300 h-full mt-[-1vh] flex flex-col justify-center  ${
                  isOpen ? "text-black" : "text-black"
                }`}
              >
                {isOpen ? (
                  "x"
                ) : (
                  <IoMenu className="w-[10] h-[10] text-3xl lg:text-4xl" />
                )}
              </span>
            </button>
          </div>
          <div
            className={`flex flex-col lg:flex-row lg:gap-[1rem] gap-[1rem] min-w-[50%] lg:w-[20%]  lg:px-0 px-[7%] lg:mt-0 justify-end z-10 ease-in-out duration-300 ${
              isOpen ? "mt-[10vh] " : "mt-[-30vh] "
            }`}
          >
            <Hyperlink
              Text={"About"}
              Link={"/about"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <Hyperlink
              Text={"Locations"}
              Link={"/map"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <Hyperlink
              Text={"Shop"}
              Link={"/shop"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <div className="w-fit">
              <button
                className="relative w-fit h-full p-0 shadow-none hover:bg-transparent hover:text-my-green text-xl bg-transparent"
                onClick={() => setIsCartOpen(true)}
              >
                <FaCartShopping className="w-[10] h-[10] text-[8vw] lg:text-[1.2vw]" />
                {cart.length > 0 && (
                  <div className="absolute top-0 right-0 bg-red-700 text-sm w-fit h-fit px-[0.4rem] rounded-full -mt-[0.6rem] -mr-[0.8rem]">
                    <p className="text-sm text-white">{cart.length}</p>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="pb-[3%]"></div>
      </div>

      {/* cart drawer */}
      <div
        className={`lg:w-[24vw] lg:right-0 w-full h-[100vh] lg:h-[96vh] overflow-auto overscroll-y-auto fixed rounded-[0.5rem] lg:py-[2rem] px-[2rem] pb-[8rem] bg-white opacity-full z-[100] flex flex-col gap-[2rem] ease-in-out duration-300 transition-all lg:my-[0] lg:top-[2vh] top-0 py-[2rem]
          ${isCartOpen && !isMobile ? "mr-[2vh]" : "-mr-[100vw]"} ${
          isCartOpen && isMobile ? "-mt-[0vh]" : "-mt-[100vh]"
        }`}
      >
        <div>
          <div className="flex flex-row justify-between z-[100] ">
            <h2>Your cart</h2>
            <button
              className="text-xl w-fit h-fit flex flex-col justify-center py-[0.5rem] px-[1rem] rounded-full text-white bg-red-600 hover:bg-red-800"
              onClick={() => {
                setIsCartOpen(false);
                setPurchase(false);
              }}
            >
              x
            </button>
          </div>
          <p className="mt-[0.85rem]">
            You have {cart.length} items in your cart.
          </p>
        </div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <CheckoutComponent
              key={index}
              name={item.name}
              quantity={item.quantity}
              img={item.img}
              altText={item.altText}
              price={item.price}
              totalPrice={totalPrice}
              setArrF={setCart}
              arrF={cart}
            />
          ))
        )}

        <div className="flex flex-col gap-[1.25rem]">
          {/* Minimal counter for next free bag */}
          {cart.length > 0 && (() => {
            const qty = cart.reduce((s, i) => s + Number(i.quantity || 0), 0);
            const remainder = qty % 6;
            const toFree = remainder === 0 ? 6 : 6 - remainder;
            const progress = (remainder / 6) * 100;
            
            return (
              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-gray-600">Next free bag:</p>
                  <p className="text-xs font-semibold text-my-green">
                    {qty === 0 ? '6 bags needed' : `${toFree} more`}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-my-green h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })()}
          {/* City Input for Shipping Validation - hidden when free shipping threshold is met */}
          {discountedSubtotal < 15 && (
            <div className="pt-1">
              <h3 className="mb-2 font-semibold text-gray-800 text-sm">Shipping City</h3>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter your city (e.g., Vancouver)"
                  value={enteredCity}
                  onChange={handleCityChange}
                  className={`w-full p-2.5 rounded-lg border-2 transition-colors text-sm ${
                    cityValidation.isValid === true 
                      ? "border-green-500 bg-green-50" 
                      : cityValidation.isValid === false 
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-300"
                  }`}
                />
                {cityValidation.message && (
                  <div className={`p-2 rounded-md text-xs font-medium ${
                    cityValidation.isValid 
                      ? "bg-green-50 text-green-700" 
                      : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {cityValidation.message}
                  </div>
                )}
                <div className="text-xs text-gray-500 space-y-0.5">
                  <p>Free in Lower Mainland • $10 elsewhere • Free on $15+</p>
                  <Link href="/map" className="text-my-green hover:text-green-700 inline-block mt-1">
                    View eligible cities →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Free Shipping Qualified - Minimal */}
          {discountedSubtotal >= 15 && (
            <div className="bg-green-50 rounded-md p-2 border-l-4 border-my-green">
              <p className="text-xs text-green-800 font-medium">
                ✓ Free shipping unlocked ($15+ order)
              </p>
            </div>
          )}

          {/* Discount applied - Minimal */}
          {discount > 0 && (
            <div className="bg-green-50 rounded-md p-2 border-l-4 border-green-500 flex items-center justify-between">
              <p className="text-xs text-green-800 font-medium">
                ✓ Free bag discount applied
              </p>
              <p className="text-sm font-bold text-green-700">-${discount.toFixed(2)}</p>
            </div>
          )}

          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <h3>Subtotal</h3>
              {shipping > 0 && (
                <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded-full">
                  + Shipping
                </span>
              )}
              <button
                onClick={() => toggle(setPrice, price)}
                className="w-fit p-[0.2rem] bg-transparent h-fit shadow-none hover:bg-transparent hover:text-black"
              >
                {price ? (
                  <IoIosArrowDown className="m-0 p-0 h-fit w-fit" />
                ) : (
                  <IoIosArrowUp />
                )}
              </button>
            </div>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
                      <div
            className={`flex flex-col gap-[1rem] overflow-hidden ease-in-out duration-300 transition-all ${
              price ? "h-0" : "h-[25vh]"
            }`}
          >
            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-between">
                <h3>Items Subtotal</h3>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              {discount > 0 && (
                <div className="flex flex-row justify-between bg-green-50 p-2 rounded">
                  <h3 className="text-green-900 font-semibold">Buy 6 Get 1 FREE Discount</h3>
                  <p className="text-green-700 font-semibold">-${discount.toFixed(2)}</p>
                </div>
              )}
              <div className="flex flex-row justify-between font-semibold">
                <h3>Subtotal (after promos)</h3>
                <p>${(discountedSubtotal || Math.max(0, totalPrice - (discount || 0))).toFixed(2)}</p>
              </div>
              <div className="flex flex-row justify-between">
                <h3>Tax (5% GST)</h3>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className="flex flex-row justify-between">
                <h3>Shipping</h3>
                <div className="flex items-center gap-2">
                  {shipping > 0 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      +$10.00
                    </span>
                  )}
                  <p className={shipping > 0 ? "text-my-green font-semibold" : ""}>
                    {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex flex-row justify-between font-semibold">
                  <h3>Subtotal (with tax & shipping)</h3>
                  <p>${(discountedSubtotal + tax + shipping).toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <h3>Total</h3>
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold">${estTotal.toFixed(2)}</p>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">includes $10.00 shipping</p>
                )}
              </div>
            </div>
          </div>
          <p className="-mt-[1rem] text-sm text-gray-600">
            {enteredCity.trim() === "" 
              ? "Enter your city above to calculate shipping" 
              : cityValidation.isValid 
              ? "✓ Free local shipping applied!" 
              : shipping > 0 
              ? `$${shipping.toFixed(2)} shipping fee applies`
              : "Free shipping on orders $15+!"
            }
          </p>
        </div>

        <button
          className="w-full h-fit bg-my-green text-white border-b-2 border-black px-[1rem] py-[1rem] rounded-full hover:border-b-0 ease-out duration-[100ms] trasition-all mb-4"
          onClick={() => {
            if (cart.length > 0) handleCheckout();
          }}
          disabled={loading}
        >
          {loading ? <p>Loading...</p> : <p>Proceed to checkout - ${estTotal.toFixed(2)}</p>}
        </button>
      </div>

      {/* backdrop */}
      <button
        className={`min-w-[100vw] min-h-[100vh] top-0 ${
          !isCartOpen
            ? "opacity-0 bg-transparent -z-100 hidden"
            : "bg-black opacity-[80%] z-20 fixed"
        }`}
        onClick={() => setIsCartOpen(false)}
      ></button>

      {/* Alerts */}
    </nav>
  );
}

export default Navbar;
