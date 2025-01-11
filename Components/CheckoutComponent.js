"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../Components/CartContext";
import { MdDelete } from "react-icons/md";

function CheckoutComponent({
  img,
  altText,
  name,
  price,
  // iD,
  quantity,
  // nameF,
  // quantityF,
  setArrF,
  arrF,
  // totalPrice,
}) {
  const { removeItem } = useCart();

  //Keyboard listener
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Perform your desired action here, e.g., call a function
      submitValue(inputValue);
    }
  };

  const updateCartQuantity = (name, newQuantity) => {
    if (arrF) {
      const newItem = arrF.map((item) =>
        name === item.name ? { ...item, quantity: newQuantity } : item
      );
      setArrF(newItem);
    }
  };

  const manageCart = (nameF, quantityF, state, setArrF, arrF) => {
    const newCart = arrF.map((item) => {
      if (item.name === nameF) {
        if (state) {
          // Adding to cart
          return {
            ...item,
            quantity: item.quantity + quantityF,
            totalPrice: item.price * (item.quantity + quantityF),
          };
        } else if (item.quantity > 1) {
          // Reducing quantity if more than 1
          return {
            ...item,
            quantity: item.quantity - quantityF,
            totalPrice: item.price * (item.quantity - quantityF),
          };
        } else {
          return { ...item, quantity: 1 };
        }
      }
      return item; // Keep unchanged items
    });

    setArrF(newCart);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <Image
          src={img}
          alt={altText}
          height={500}
          width={500}
          className="max-w-[30%] h-fit "
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-[0.5rem] min-h-[11vh] ">
            <h3>
              {name} x {quantity}
            </h3>
            <p>${price}</p>
          </div>
          <div className="flex flex-col gap-[0.75rem]">
            <div className="flex flex-row border-[2.1px] border-gray-300 rounded-[0.5rem] justify-between overflow-hidden">
              <button
                className="w-fit h-fit bg-transparent hover:bg-transparent hover:text-gray-400 px-[1rem] py-[0.75rem] rounded-none"
                onClick={() => manageCart(name, 1, true, setArrF, arrF)}
              >
                <p className="2xl">+</p>
              </button>
              <p className="w-fit h-full flex flex-col justify-center">
                <input
                  className="min-w-[5vw] max-w-[5rem] text-center"
                  placeholder={quantity}
                  value={quantity}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = parseFloat(inputValue) || ""; // Convert to number or empty string
                    updateCartQuantity(name, numericValue);
                    onKeyDown = { handleKeyDown };
                  }}
                />
              </p>
              <button
                className="w-fit h-fit bg-transparent hover:bg-transparent  hover:text-gray-400 px-[1rem] py-[0.75rem] border-l-2rounded-none"
                onClick={() => manageCart(name, 1, false, setArrF, arrF)}
              >
                <p className="2xl">-</p>
              </button>
            </div>
            <button
              className="  w-fit h-fit flex flex-col justify-end bg-transparent m-0 p-0 text-left  hover:text-red-600 hover:bg-transparent"
              onClick={() => removeItem(name)}
            >
              {" "}
              <div className=" group w-fit text-left m-0 p-0  flex flex-row-reverse gap-[0.75rem]">
                <p className="text-red-600 h-full flex flex-col justify-center group-hover:text-red-900 ease-in-out duration-300">
                  remove item
                </p>
                <MdDelete className="text-2xl text-red-600 group-hover:text-red-900 ease-in-out duration-300"></MdDelete>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComponent;
