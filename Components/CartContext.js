"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [estTotal, setEstTotal] = useState(0);
  const [img, setImg] = useState("");
  const [quantity, setQuantity] = useState();

  //alert system
  const [popup, setPopup] = useState(false);
  const [purchase, setPurchase] = useState(false);

  //Protects from react strictmode
  const initalLoad = useRef(true);

  // Move calculateCartSummary before the useEffect that uses it
  const calculateCartSummary = useCallback(() => {
    let totalCost = 0;
    let totalShipping = cart.length > 0 ? 2 : 0;
    let totalTax = 0;

    cart.forEach((item) => {
      totalCost += item.quantity * item.price;
    });

    totalTax = parseFloat((totalCost * 0.05).toFixed(2));
    const totalEstTotal = parseFloat(
      (totalCost + totalShipping + totalTax).toFixed(2)
    );

    setTotalPrice(totalCost);
    setTax(totalTax);
    setShipping(totalShipping);
    setEstTotal(totalEstTotal);
  }, [cart]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    console.log("Preparing to load save");
    const savedCart = localStorage.getItem("savedCart");
    if (initalLoad.current && savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        console.log("Saved Cart Found:", savedCart);
      } catch (error) {
        console.error("Failed to parse savedCart:", error);
      }
      initalLoad.current = false;
    }
  }, []);

  // //log prices
  // useEffect(() => {
  //   console.log("Cart updated:", cart);
  //   console.log("Total price:", totalPrice);
  //   console.log("Tax:", tax);
  //   console.log("Shipping:", shipping);
  //   console.log("Estimated Total:", estTotal);
  // }, [cart, totalPrice, tax, shipping, estTotal]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedCart", JSON.stringify(cart));
    calculateCartSummary();
  }, [cart, calculateCartSummary]);

  const removeItem = (name) => {
    if (cart) {
      const newCart = cart.filter((item) => item.name !== name); //creates a new array that doesn't include name
      setCart(newCart);
    }
  };

  const updateCart = (name, quantity, newQuantity, img, altText, iD, price) => {
    const existingItem = cart.find((item) => item.name === name);
    let newCart;

    // Convert quantity to number if it isn't already
    const numQuantity = Number(quantity);
    const numNewQuantity = Number(newQuantity);

    if (numQuantity === 1) {
      if (existingItem) {
        newCart = cart.map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity + numNewQuantity,
                totalPrice: (item.quantity + numNewQuantity) * price,
              }
            : item
        );
      } else {
        const newItem = {
          name,
          quantity: numNewQuantity,
          img,
          altText,
          iD,
          price,
          totalPrice: numNewQuantity * price,
        };
        newCart = [...cart, newItem];
      }
      setPurchase(true);
      setPopup(false);
      setQuantity(numNewQuantity);

      // setPurchase(false);
      // setPopup(true);
    }

    // Update state
    setName(name);
    setImg(img);
    setCart(newCart);
    console.log("quantity", newQuantity);
    console.log("new Num", numNewQuantity);
  };

  //Update Cart Quantity
  const updateCartQuantity = (name, newQuantity) => {
    if (name) {
      const numQuantity = Math.max(1, Number(newQuantity) || 1); // Ensure it's a number and at least 1
      const newItem = cart.map((item) =>
        name === item.name ? { ...item, quantity: numQuantity } : item
      );
      setCart(newItem);
      setQuantity(numQuantity);
    }
  };

  //Keyboard listener
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Perform your desired action here, e.g., call a function
      submitValue(inputValue);
    }
  };

  // Alert System code

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [popup]);

  useEffect(() => {
    if (purchase) {
      const timer = setTimeout(() => {
        setPurchase(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        tax,
        shipping,
        estTotal,
        updateCart,
        updateCartQuantity,
        setCart,
        removeItem,
        purchase,
        setPurchase,
        popup,
        setPopup,
        name,
        img,
        quantity,
        handleKeyDown,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
