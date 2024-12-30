"use client";

import React, { useEffect, useState } from "react";

function Page() {
  // useState to instaniate the array, which we'll be modifying later
  const [itemList, setItemList] = useState([]);

  //function to allow you to add an item to the list, and also add an item
  const addItem = (itemName, quantity) => {
    const existingItem = itemList.find((item) => item.name === itemName);
    let updatedItems;

    if (!existingItem) {
      //creates a new list, appending itemList with a name and quantity.
      updatedItems = [...itemList, { name: itemName, quantity: 1 }];
    } else {
      updatedItems = itemList.map((item) =>
        item.name === itemName
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    updatedItems = updatedItems.map((item) => ({
      ...item,
      quantity: Math.max(item.quantity, 1),
    }));

    localStorage.setItem("itemList", JSON.stringify(updatedItems));
    setItemList(updatedItems);
  };

  const updateItem = (itemName) => {
    const existingItem = itemList.find((item) => item.name === itemName);

    if (!existingItem) {
      const updatedItems = [...itemList, { name: itemName, quantity: 1 }];
      localStorage.setItem("itemList", JSON.stringify(updatedItems));
      setItemList(updatedItems);
    }
  };

  const clearItem = () => {
    setItemList([]);
    localStorage.removeItem("itemList");
  };

  useEffect(() => {
    const cartItem = localStorage.getItem("itemList");

    if (cartItem) {
      try {
        const parsedItemList = JSON.parse(cartItem);

        if (Array.isArray(parsedItemList)) {
          setItemList(parsedItemList);
        } else {
        }
      } catch (error) {
        console.error("Error parsing stored item list:", error);
        setItemList([]); // If parsing fails, reset to empty array
      }
    } else {
      setItemList([]); // If no item list in localStorage, initialize as empty array
    }
  }, []); // Empty array means this effect runs once when the component mounts

  return (
    <div className="w-[100vw] h-[100vh] overscroll-none flex flex-col gap-[10rem]">
      <div className="mx-auto flex flex-row gap-[1rem]">
        <section className="border-2 border-black flex flex-col gap-[3rem]">
          <button
            className=" p-[1rem] text-4xl h-fit w-fit mx-auto"
            onClick={() => updateItem("Citrus Treats")}
          >
            Citrus Treats
          </button>

          {Array.isArray(itemList) &&
          itemList.some((item) => item.name === "Citrus Treats") ? (
            <div className="flex flex-row gap-[2rem] h-fit justify-center place-content-center">
              <button
                className="px-[1rem] w-fit h-fit text-4xl"
                onClick={() => addItem("Citrus Treats", 1)}
              >
                +{" "}
              </button>
              <button
                className=" px-[1rem] w-fit h-fit text-4xl "
                onClick={() => addItem("Citrus Treats", -1)}
              >
                -{" "}
              </button>
            </div>
          ) : (
            <p className="text-center">Select to edit quantity</p>
          )}
        </section>

        <section className="border-2 border-black flex flex-col gap-[3rem]">
          <button
            className=" p-[1rem] text-4xl h-fit w-fit mx-auto"
            onClick={() => updateItem("Sloppy Seconds")}
          >
            Sloppy Seconds
          </button>

          {Array.isArray(itemList) &&
          itemList.some((item) => item.name === "Sloppy Seconds") ? (
            <div className="flex flex-row gap-[2rem] h-fit justify-center place-content-center">
              <button
                className="px-[1rem] w-fit h-fit text-4xl"
                onClick={() => addItem("Sloppy Seconds", 1)}
              >
                +{" "}
              </button>
              <button
                className=" px-[1rem] w-fit h-fit text-4xl "
                onClick={() => addItem("Sloppy Seconds", -1)}
              >
                -{" "}
              </button>
            </div>
          ) : (
            <p className="text-center">Select to edit quantity</p>
          )}
        </section>

        <button
          className=" p-[1rem] text-4xl h-fit w-fit mx-auto"
          onClick={clearItem}
        >
          Clear
        </button>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col text-center gap-[1rem]">
          <h1>Here is what is in your cart</h1>
          <div>
            {Array.isArray(itemList) && itemList.length === 0 ? (
              <p className="border-2 border-black p-[1rem]">
                Your cart is empty
              </p>
            ) : (
              itemList.map((item, index) => (
                <p className="border-2 border-black p-[1rem]" key={index}>
                  {item.name}, {item.quantity}
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
