"use client";

import React, { useState, useEffect } from "react";
import ItemCheckout from "../../Components/ItemCheckout";
function Page() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const updateCartQuantity = (name, newQuantity) => {
    if (cart) {
      const newItem = cart.map((item) =>
        name === item.name ? { ...item, quantity: newQuantity } : item
      );
      setCart(newItem);
    }
  };

  useEffect(() => {
    let totalCost;

    if (cart) {
      cart.length === 0
        ? 0
        : cart.map((item) => {
            item.totalPrice = item.quantity * item.price;
            totalCost = item.totalPrice;
            console.log(item.quantity);
            console.log(item.price);
            console.log(item.totalPrice);
          });
    }

    setTotalPrice(totalCost);
    setCart(cart);
    console.log("cart updated");
  }, [cart]);

  const updateCart = (name, quantity, img, altText, iD, price, totalPrice) => {
    const existingItem = cart.find((item) => item.name === name);
    let newItem;
    if (!existingItem) {
      newItem = [
        ...cart,
        { name, quantity, img, altText, iD, price, totalPrice },
      ];
    }
    if (existingItem) {
      newItem = cart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + quantity,
              totalPrice: (item.quantity + quantity) * price,
            }
          : item
      );
    }
    setCart(newItem);
  };

  return (
    <div className="w-[100%] bg-[#FEF7E6] flex justify-center">
      <div className="flex flex-col gap-[3vh] lg:gap-[10vh] min-h-fit text-center w-[90%]">
        <section className="lg:text-left text-center w-full h-fit">
          <h2> Order </h2>
          <p> Review Your Order (__ Items) </p>
          <h2> Your items </h2>

          {cart.length === 0
            ? "0"
            : cart.map((item, index) => (
                <p key={index}>
                  {" "}
                  {item.name}, {item.quantity},
                </p>
              ))}

          <button
            className="w-fit h-fit"
            onClick={() =>
              updateCart(
                "Citrus Treats",
                1,
                "/static/images/Stand-Up Pouch Bag Mockup label.png",
                "A bag of citrus treats, filled with tangy, refreshing fruit snacks",
                "ID",
                6.99,
                6.99
              )
            }
          >
            Add citrus treat
          </button>
        </section>
        <section>
          <div className="flex flex-col lg:flex-row gap-[2rem] ">
            {cart.length === 0
              ? "Your cart is empty"
              : cart.map((item, index) => (
                  <ItemCheckout
                    retkey={index}
                    name={item.name}
                    quantity={item.quantity}
                    img={item.img}
                    altText={item.altText}
                    iD={item.iD}
                    price={item.price}
                    totalPrice={item.totalPrice}
                    nameF={item.name}
                    quantityF={1}
                    setArrF={setCart}
                    arrF={cart}
                  ></ItemCheckout>
                ))}
            <section className="flex flex-col gap-[3rem] w-full rounded-[0.5rem] border-2 border-black p-[2rem] h-full lg:h-[70vh] justify-between">
              <h2 className="text-left w-full h-fit"> Checkout Summary </h2>
              <div className=" flex flex-col lg:h-fit gap-[2rem]">
                <div className=" flex flex-row justify-between">
                  <h3> Subtotal</h3>
                  <p>${totalPrice}</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Shipping </h3>
                  <p>$6.99</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Tax </h3>
                  <p>$6.99</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Estimated Total Order</h3>
                  <p>$6.99</p>
                </div>
              </div>
              <button className="mx-auto"> Continue to payment </button>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
