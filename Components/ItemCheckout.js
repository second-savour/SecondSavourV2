"use client";

import React from "react";
import Image from "next/image";

function ItemCheckout({
  img,
  altText,
  name,
  price,
  // iD,
  quantity,
  // key,
  // nameF,
  // quantityF,
  setArrF,
  arrF,
  totalPrice,
}) {
  //Keyboard listener
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     // Perform your desired action here, e.g., call a function
  //     submitValue(inputValue);
  //   }
  // };

  const updateCartQuantity = (name, newQuantity) => {
    if (arrF) {
      const newItem = arrF.map((item) =>
        name === item.name ? { ...item, quantity: newQuantity } : item
      );
      setArrF(newItem);
    }
  };

  const manageCart = (nameF, quantityF, state, setArrF, arrF) => {
    let newCart;
    if (state) {
      arrF.map((item) =>
        item.name === nameF
          ? (newCart = [
              {
                ...item,
                quantity: item.quantity + quantityF,
                totalPrice: item.price * (item.quantity + quantityF),
              },
            ])
          : item
      );
    }
    if (!state) {
      arrF.map((item) =>
        item.name === name && item.quantity > 1
          ? (newCart = [
              {
                ...item,
                quantity: item.quantity - quantityF,
                totalPrice: item.price * (item.quantity - quantityF),
              },
            ])
          : (newCart = [{ ...item, quantity: 1 }])
      );
    }

    setArrF(newCart);
  };

  return (
    <section className="flex flex-col gap-[1rem]">
      <div className="bg-my-green rounded-[0.5rem] p-[1rem] lg:min-w-[30vw] max-w-full max-h-[55vh] lg:max-w-[40vh] overflow-hidden">
        <Image
          src={img}
          alt={altText}
          className="hidden lg:block h-full w-full object-contain rounded-[1rem]"
          width={1080}
          height={1080}
        />
      </div>

      <div className=" flex flex-col gap-[1rem] w-full lg:max-w-[30vw]">
        <div className="flex flex-col lg:flex-row justify-between">
          <p>{name} </p>
          <p> ${price}</p>
        </div>
        <div className="flex flex-col gap-[1rem] text-left">
          <p> ${totalPrice}</p>
          <div className="flex flex-row gap-[0.5rem]">
            <button
              className=" w-fit px-[1rem] p-[0.5rem] bg-my-green text-white rounded-[0.25rem]"
              onClick={() => manageCart(name, 1, true, setArrF, arrF)}
            >
              <p> +</p>
            </button>
            <input
              placeholder={quantity}
              value={quantity}
              onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = parseFloat(inputValue) || ""; // Convert to number or empty string
                updateCartQuantity(name, numericValue);
                // onKeyDown = { handleKeyDown };
              }}
            />
            <button
              className=" w-fit px-[1rem] p-[0.5rem] bg-my-green text-white rounded-[0.25rem]"
              onClick={() => manageCart(name, 1, false, setArrF, arrF)}
            >
              <p> - </p>
            </button>
            <div className="flex flex-row justify-between w-full h-fit">
              <button
                onClick={() => updateCartQuantity(name, 10)}
                className=" w-fit px-[1rem] p-[0.5rem] bg-my-green text-white rounded-[0.25rem]"
              >
                x10
              </button>
              <button
                onClick={() => updateCartQuantity(name, 20)}
                className=" w-fit px-[1rem] p-[0.5rem] bg-my-green text-white rounded-[0.25rem]"
              >
                x20
              </button>
              <button
                onClick={() => updateCartQuantity(name, 50)}
                className=" w-fit px-[1rem] p-[0.5rem] bg-my-green text-white rounded-[0.25rem]"
              >
                x100
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemCheckout;
