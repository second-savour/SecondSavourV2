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
    tax,
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
          name: "Citrus Treats",
          amount: estTotal, // Send total with GST included
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
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <h3>Subtotal</h3>
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
              price ? "h-0" : "h-[15vh]"
            }`}
          >
            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-between">
                <h3>Tax (5% GST)</h3>
                <p>${tax.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <h3>Total</h3>
              <p>${estTotal.toFixed(2)}</p>
            </div>
          </div>
          <p className="-mt-[1rem]">
            Free shipping within Greater Vancouver Area!
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
