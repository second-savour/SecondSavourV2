"use client";
import React from "react";

function ManageButton({ name, quantity, setArrF, arrF }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const inputValue = e.target.value;
      const numericValue = parseFloat(inputValue) || 1;
      updateCartQuantity(name, numericValue);
    }
  };

  const updateCartQuantity = (name, newQuantity) => {
    if (arrF) {
      const validQuantity = Math.max(1, isNaN(newQuantity) ? 1 : newQuantity);
      const newItem = arrF.map((item) =>
        name === item.name
          ? {
              ...item,
              quantity: validQuantity,
              totalPrice: (item.price * validQuantity).toFixed(2),
            }
          : item
      );
      setArrF(newItem);
    }
  };

  const manageCart = (nameF, quantityF, isIncreasing) => {
    const newCart = arrF.map((item) => {
      if (item.name === nameF) {
        let newQuantity;
        if (isIncreasing) {
          newQuantity = item.quantity + quantityF;
        } else {
          newQuantity = Math.max(1, item.quantity - quantityF);
        }
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: (item.price * newQuantity).toFixed(2),
        };
      }
      return item;
    });

    setArrF(newCart);
  };

  return (
    <div className="flex flex-row border-[2.1px] border-gray-300 rounded-[0.5rem] justify-between overflow-hidden">
      <button
        className="w-fit h-fit bg-transparent hover:bg-transparent hover:text-gray-400 px-[1rem] py-[0.75rem] rounded-none"
        onClick={() => manageCart(name, 1, true)}
      >
        <p className="2xl">+</p>
      </button>
      <input
        className="min-w-[5vw] max-w-[5rem] text-center"
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          const numericValue = parseFloat(e.target.value) || 1;
          updateCartQuantity(name, numericValue);
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        className="w-fit h-fit bg-transparent hover:bg-transparent hover:text-gray-400 px-[1rem] py-[0.75rem] border-l-2 rounded-none"
        onClick={() => manageCart(name, 1, false)}
      >
        <p className="2xl">-</p>
      </button>
    </div>
  );
}

export default ManageButton;
