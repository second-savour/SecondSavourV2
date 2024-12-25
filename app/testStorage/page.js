"use client"; // Add this at the top of the file

import React, { useEffect, useState } from "react";

function Page() {
  const [quantity, setQuantity] = useState(0);
  const [itemList, setItemList] = useState([]);

  const updateCart = (number) => {
    const newNumber =
      Number(localStorage.getItem("storedQuantity")) + Number(number);
    if (newNumber >= 0) {
      localStorage.setItem("storedQuantity", newNumber);
      setQuantity(localStorage.getItem("storedQuantity"));
    }
  };

  const updateItem = (item) => {
    if (!itemList.includes(item)) {
      const updatedItems = [...itemList, item];
      localStorage.setItem("itemList", JSON.stringify(updatedItems));
      setItemList(updatedItems);
    }
  };

  const clearItem = (item) => {
    setItemList([]);
    localStorage.removeItem("itemList");
    localStorage.removeItem(item);
    setQuantity(0);
  };

  useEffect(() => {
    // Retrieve quantity from localStorage when the component mounts
    const cart = localStorage.getItem("storedQuantity");
    const cartItem = localStorage.getItem("itemList");

    if (cart) {
      setQuantity(Number(cart));
    }

    if (cartItem) {
      setItemList(JSON.parse(cartItem));
    }
  }, []); // Empty array means this effect runs once when the component mounts

  return (
    <div className="w-[100vw] h-[100vh] overscroll-none flex flex-col gap-[10rem]">
      <div className=" mx-auto flex flex-row gap-[1rem]">
        <section className="border-2 border-black flex flex-col gap-[3rem]">
          <button
            className="text-4xl h-fit w-fit mx-auto"
            onClick={() => updateItem("Citrus Treats")}
          >
            Citrus Treats
          </button>

          {itemList.includes("Citrus Treats") ? (
            <div className="flex flex-row gap-[2rem] h-fit justify-center place-content-center">
              <button
                className="w-fit h-fit text-4xl"
                onClick={() => updateCart(1)}
              >
                {" "}
                +{" "}
              </button>
              <button
                className="w-fit h-fit text-4xl "
                onClick={() => updateCart(-1)}
              >
                {" "}
                -{" "}
              </button>
            </div>
          ) : (
            <p className="text-center"> Selet to edit quantity </p>
          )}
        </section>

        <button
          className="text-4xl h-fit w-fit mx-auto"
          onClick={() => updateItem("Sloppy Seconds")}
        >
          Sloppy Seconds
        </button>

        <button
          className="text-4xl h-fit w-fit mx-auto"
          onClick={() => clearItem("storedQuantity")}
        >
          Clear
        </button>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col text-center gap-[1rem]">
          <h1> Here's whats in your cart </h1>
          <div className="">
            {itemList.length === 0 ? (
              <p className="border-2 border-black p-[1rem]">
                your cart is empty
              </p>
            ) : (
              itemList.map((item, index) => (
                <p className="border-2 border-black p-[1rem]" key={index}>
                  {item}, {quantity}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
