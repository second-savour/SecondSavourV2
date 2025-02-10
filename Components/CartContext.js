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

  // alert system
  const [popup, setPopup] = useState(false);
  const [purchase, setPurchase] = useState(false);

  // Protects from react strict mode
  const initalLoad = useRef(true);

  const calculateCartSummary = useCallback(() => {
    let totalCost = 0;
    let totalShipping = cart.length > 0 ? 2 : 0;
    let totalTax = 0;

    cart.forEach((item) => {
      totalCost += item.quantity * item.price;
    });

    // Example: tax is currently set to 0
    totalTax = parseFloat((totalCost * 0).toFixed(2));
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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedCart", JSON.stringify(cart));
    calculateCartSummary();
  }, [cart, calculateCartSummary]);

  // -- NEW CLEAR CART FUNCTION --
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("savedCart"); // remove from localStorage if you want it truly cleared
  };

  // Removes item from cart by name
  const removeItem = (name) => {
    if (cart) {
      const newCart = cart.filter((item) => item.name !== name);
      setCart(newCart);
    }
  };

  // Add or update an item in the cart
  const updateCart = (name, quantity, newQuantity, img, altText, iD, price) => {
    const existingItem = cart.find((item) => item.name === name);
    let newCart;

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
    }

    setName(name);
    setImg(img);
    setCart(newCart);
    console.log("quantity", newQuantity);
    console.log("new Num", numNewQuantity);
  };

  // Update cart item quantity
  const updateCartQuantity = (name, newQuantity) => {
    if (name) {
      const numQuantity = Math.max(1, Number(newQuantity) || 1);
      const newItem = cart.map((item) =>
        name === item.name ? { ...item, quantity: numQuantity } : item
      );
      setCart(newItem);
      setQuantity(numQuantity);
    }
  };

  // Keyboard listener example (if used)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // your logic here
      submitValue(inputValue);
    }
  };

  // Timers for alert system
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
  }, [purchase]);

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
        // EXPOSE CLEAR CART
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
