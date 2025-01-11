"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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

  // Load cart from localStorage on initial render
  useEffect(() => {
    console.log("Preparing to load save");
    const savedCart = localStorage.getItem("savedCart");
    if (initalLoad) {
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          console.log("Saved Cart Found:", savedCart);
        } catch (error) {
          console.error("Failed to parse savedCart:", error);
          // localStorage.removeItem("savedCart");
        }
        initalLoad.current = false;
      }
    }
    if (!savedCart) {
      console.log("No cart found saved");
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
    // const savedCart = localStorage.getItem("savedCart");
    calculateCartSummary();
  }, [cart]);

  const calculateCartSummary = () => {
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
  };

  const removeItem = (name) => {
    if (cart) {
      const newCart = cart.filter((item) => item.name !== name); //creates a new array that doesn't include name
      setCart(newCart);
    }
  };

  const updateCart = (name, quantity, img, altText, iD, price) => {
    const existingItem = cart.find((item) => item.name === name);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + quantity,
              totalPrice: (item.quantity + quantity) * price,
            }
          : item
      );
    } else {
      const newItem = {
        name,
        quantity,
        img,
        altText,
        iD,
        price,
        totalPrice: quantity * price,
      };
      newCart = [...cart, newItem];
    }

    setQuantity(quantity);
    setName(name);
    setImg(img);
    setPurchase(true);
    setCart(newCart);
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
        setCart,
        removeItem,
        purchase,
        setPurchase,
        popup,
        setPopup,
        name,
        img,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
