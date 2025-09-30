"use client";

import React, { useState, useEffect } from "react";
import Hyperlink from "./Hyperlink";
import { useCart } from "../Components/CartContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CheckoutComponent from "../Components/CheckoutComponent";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";

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
    shippingLocation,
    setShippingLocation,
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/createPaymentLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart, // Send individual cart items
          subtotal: totalPrice, // Subtotal before tax and shipping
          tax: tax, // Tax amount
          shipping: shipping, // Shipping amount
          total: estTotal, // Final total
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
        className={`lg:w-[24vw] lg:right-0 w-full h-[100vh] lg:h-[96vh] overflow-auto overscroll-y-auto fixed rounded-[0.5rem] lg:py-[2rem] px-[2rem] bg-white opacity-full z-[100] flex flex-col gap-[5rem] ease-in-out duration-300 transition-all lg:my-[0] lg:top-[2vh] top-0 py-[2rem]
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

        <div className="flex flex-col gap-[1rem]">
          {/* Promotions messaging */}
          {cart.length > 0 && (
            <div className="space-y-2">
              {/* B6G1 progress */}
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                {(() => {
                  const qty = cart.reduce((s, i) => s + Number(i.quantity || 0), 0);
                  const toFree = 6 - (qty % 6 || 6);
                  return (
                    <p className="text-xs text-green-900">
                      Buy 6 bags, get 1 free. {qty > 0 ? `Add ${toFree} more for another free bag.` : 'Add 6 bags to get 1 free.'}
                    </p>
                  );
                })()}
              </div>
              {/* Free shipping threshold messaging */}
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-900">
                  Spend $50+ (before tax) to get free shipping anywhere in Canada!
                </p>
              </div>
            </div>
          )}
          {/* Shipping Location Selector */}
          <div className="border-t-2 border-gray-200 pt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="mb-3 font-semibold text-gray-800">Shipping Location</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors border border-gray-200 hover:border-my-green">
                <input
                  type="radio"
                  name="shippingLocation"
                  value="lowerMainland"
                  checked={shippingLocation === "lowerMainland"}
                  onChange={(e) => setShippingLocation(e.target.value)}
                  className="w-4 h-4 text-my-green focus:ring-my-green"
                />
                <span className="text-sm font-medium">Located in the Lower Mainland</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors border border-gray-200 hover:border-my-green">
                <input
                  type="radio"
                  name="shippingLocation"
                  value="outside"
                  checked={shippingLocation === "outside"}
                  onChange={(e) => setShippingLocation(e.target.value)}
                  className="w-4 h-4 text-my-green focus:ring-my-green"
                />
                <span className="text-sm font-medium">Located outside the Lower Mainland</span>
              </label>
            </div>
            {shippingLocation === "outside" && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 Shipping fee of $10.00 will be added to your total
                </p>
              </div>
            )}
          </div>

          {/* Free Shipping Qualified Banner */}
          {discountedSubtotal >= 50 && (
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
              <div className="flex flex-row items-center gap-2">
                <span className="text-2xl">🎉</span>
                <div className="flex flex-col">
                  <h3 className="text-blue-900 font-bold">You've qualified for FREE SHIPPING!</h3>
                  <p className="text-xs text-blue-800 mt-1">
                    Your order is over $50 (before tax) - shipping is free anywhere in Canada!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Highlighted discount section BEFORE breakdown */}
          {discount > 0 && (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-green-900 font-bold">🎉 Buy 6 Get 1 FREE Applied!</h3>
                  <p className="text-xs text-green-800 mt-1">
                    {(() => {
                      const qty = cart.reduce((s, i) => s + Number(i.quantity || 0), 0);
                      const free = Math.floor(qty / 6);
                      return `You're getting ${free} free bag${free > 1 ? 's' : ''}!`;
                    })()}
                  </p>
                </div>
                <p className="text-lg font-bold text-green-700">-${discount.toFixed(2)}</p>
              </div>
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
          <p className="-mt-[1rem]">
            {shippingLocation === "lowerMainland" 
              ? "Free shipping within Greater Vancouver Area!" 
              : "Shipping fee applies for locations outside Lower Mainland"
            }
          </p>
        </div>

        <button
          className="w-full h-fit bg-my-green text-white border-b-2 border-black px-[1rem] py-[1rem] rounded-full hover:border-b-0 ease-out duration-[100ms] trasition-all"
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
