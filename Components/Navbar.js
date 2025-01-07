"use client";

import React, { useState, useEffect } from "react";
import Hyperlink from "./Hyperlink";
import { useCart } from "../Components/CartContext";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import CheckoutComponent from "../Components/CheckoutComponent";
import { FaCartShopping } from "react-icons/fa6";

/* Icons */
import { IoMenu } from "react-icons/io5";

function Navbar() {
  const {
    cart,
    totalPrice,
    tax,
    shipping,
    estTotal,
    setCart,
    popup,
    setPopup,
    purchase,
    setPurchase,
    name,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Run on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = (set, name) => {
    set(!name);
  };

  return (
    <nav className=" mb-[8vh] md:mb-[5vh] lg:mb-[3%] ">
      <div
        className=" z-20 flex flex-row justify-between fixed h-[fit] lg:h-[6%] 
        top-0 left-0 bg---color-black backdrop-blur-[8px]"
      ></div>

      <div className=" flex flex-row justify-center lg:mt-[1%]">
        <div
          className={`flex flex-col lg:flex-row justify-between lg:w-[60vw] S w-[100vw] lg:rounded-full h-fit z-30 lg:py-[1%] pb-[6vh] lg:px-[3%] fixed lg:mt-[0%] mt-[-3%] lg:pt-[21] pt-[5%] rounded-[0.5rem]  ease-in-out duration-[500ms]  lg:bg-my-beige  ${
            isOpen ? "bg-green-700" : "bg-[#fef7e6]"
          }`}
        >
          <div className="flex flex-row lg:w-fit w-full h-fit justify-between lg:relative  fixed lg:px-0  pr-[1%] pl-[5%]">
            <div className="flex flex-col justify-center">
              <Hyperlink
                Text={"Second Savour"}
                Link={"/"}
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />
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
                {isOpen ? "x" : <IoMenu className="w-[10] h-[10] text-4xl" />}
              </span>
            </button>
          </div>
          <div
            className={`flex flex-col lg:flex-row lg:gap-[1rem] gap-[1rem] min-w-[50%] lg:w-[20%]  lg:px-0 px-[7%] lg:mt-0 justify-end z-10 ease-in-out duration-300 ${
              isOpen ? "mt-[6vh]" : "mt-[-20vh]"
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
            <button
              className="relative w-fit h-full p-0 shadow-none hover:bg-transparent  hover:text-my-green text-xl bg-transparent"
              onClick={() => toggle(setCheckout, checkout)}
            >
              <FaCartShopping />

              {cart.length !== 0 ? (
                <div className="absolute top-0 right-0 bg-red-700 text-sm w-fit h-fit px-[0.4rem] rounded-full -mt-[1.5vh] -mr-[0.5vw]">
                  <p className="text-sm text-white">{cart.length}</p>
                </div>
              ) : (
                <p></p>
              )}
            </button>
          </div>
        </div>
        <div className="pb-[3%]"></div>
      </div>

      {/* cart */}
      <div
        className={`lg:w-[24vw] lg:right-0 w-full h-[100vh] lg:h-[96vh] overflow-auto overscroll-y-auto fixed  rounded-[0.5rem] lg:py-[2rem] px-[2rem] bg-white opacity-full z-[100] flex flex-col gap-[5rem] ease-in-out duration-300 transition-all lg:my-[0] lg:top-[2vh] py-[2rem]
          ${checkout && !isMobile ? "mr-[2vh]" : "-mr-[30rem]"} ${
            checkout && isMobile ? "-mt-[1vh]" : "-mt-[110vh]"
          }`}
      >
        <div>
          <div className=" flex flex-row justify-between">
            <h2> Your cart </h2>
            <button
              className="text-xl  w-fit h-fit flex flex-col justify-center py-[0.5rem] px-[1rem] rounded-full text-white bg-black"
              onClick={() => toggle(setCheckout, checkout)}
            >
              x
            </button>
          </div>
          <p className="mt-[0.85rem]">
            {" "}
            You have {cart.length} items in your cart.
          </p>
        </div>
        {cart.length === 0 ? (
          <p> Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <CheckoutComponent
              name={item.name}
              quantity={item.quantity}
              img={item.img}
              altText={item.altText}
              key={index}
              iD={item.Id}
              price={item.price}
              totalPrice={totalPrice}
              nameF={item.name}
              quantityF={1}
              setArrF={setCart}
              arrF={cart}
            ></CheckoutComponent>
          ))
        )}

        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row ">
              <h3> Subtotal</h3>
              <button
                onClick={() => toggle(setPrice, price)}
                className="w-fit bg-transparent h-fit shadow-none hover:bg-transparent hover:text-black"
              >
                {price ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
            </div>
            <p>${totalPrice}</p>
          </div>
          <div
            className={`flex flex-col gap-[1rem] overflow-hidden ease-in-out duration-300 transition-all 
            ${price ? "h-0" : "h-[15vh]"}`}
          >
            <div className="flex flex-row justify-between">
              <h3> Tax</h3>
              <p>${tax}</p>
            </div>
            <div className="flex flex-row justify-between">
              <h3> Shipping</h3>
              <p>${shipping}</p>
            </div>
            <div className="flex flex-row justify-between">
              <h3> Estimated Total</h3>
              <p>${estTotal}</p>
            </div>
          </div>
          <p className="-mt-[1rem]"> Message about our shipping or delivery</p>
        </div>
        <button> Proceed to payment </button>
      </div>

      {/* Alerts */}
      <div>
        <div
          className={`absolute px-[1rem] bg-red-200 py-[0.5rem] text-md ease-in-out duration-300 m-[2rem] transition-all right-0 filter flex flex-row gap-[0.5rem]
        ${popup ? "mt-10 opacity-full z-[11]" : "mt-15 opacity-0 z-0"}`}
        >
          This item already exists in your cart!
          <button className="strip" onClick={() => setPopup(!popup)}>
            {" "}
            x
          </button>
        </div>

        <div
          className={`fixed px-[1rem] top-0 bg-green-300 py-[0.5rem] text-md ease-in-out duration-300 m-[2rem] transition-all right-0 filter flex flex-row gap-[0.5rem]
        ${purchase ? "mt-10 opacity-full z-10" : "mt-5 opacity-0 z-0"}`}
        >
          {name} added to your cart!
          <button className="strip" onClick={() => setPurchase(!purchase)}>
            {" "}
            x
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
