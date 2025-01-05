"use client";

import React, { useState, useEffect } from "react";
import ItemCheckout from "../../Components/ItemCheckout";
function Page() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [estTotal, setEstTotal] = useState(0);

  //Handle save

  // Load the cart from localStorage on initial render
  useEffect(() => {
    const retrievedCart = localStorage.getItem("savedCart");
    if (retrievedCart) {
      try {
        const parsedCart = JSON.parse(retrievedCart);
        setCart(parsedCart);
        console.log("Cart loaded from localStorage:", parsedCart);
        console.log("Cart from cart", cart);
      } catch (error) {
        console.error("Failed to parse savedCart:", error);
        localStorage.removeItem("savedCart"); // Remove corrupted data
      }
    }
  }, []);

  //saves cart
  useEffect(() => {
    if (cart) {
      localStorage.setItem("savedCart", JSON.stringify(cart));
      console.log("Cart saved to localStorage:", cart);
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      if (cart.length > 0) {
        let totalCost = 0;
        let totalTax = tax;
        let totalEstTotal = estTotal;
        let totalShipping = shipping;

        const updatedCart = cart.map((item) => {
          const totalPrice = item.quantity * item.price;
          totalCost += totalPrice;
          return { ...item, totalPrice: parseFloat(totalPrice.toFixed(2)) }; // Create a new object with the updated totalPrice
        });

        totalTax = parseFloat((totalCost * 0.05).toFixed(2));
        totalShipping = 2;
        totalEstTotal = parseFloat(
          (totalTax + totalCost + totalShipping).toFixed(2)
        );
        setTotalPrice(totalCost);
        setTax(totalTax);
        setShipping(totalShipping);
        setEstTotal(totalEstTotal);

        const previouscart = localStorage.getItem("savedCart");
        if (previouscart !== JSON.stringify(cart)) setCart(updatedCart);
      }
    }

    if (!cart) {
      setShipping(0);
    }
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
          {console.log("Latest Cart:", cart)}

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
                    keyF={index}
                    name={item.name}
                    quantity={item.quantity}
                    img={item.img}
                    altText={item.altText}
                    iD={item.iD}
                    price={item.price}
                    totalPrice={totalPrice}
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
                  <p>${shipping}</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Tax </h3>
                  <p>${tax}</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <h3> Estimated Total Order</h3>
                  <p>${estTotal}</p>
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
