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
  const [discount, setDiscount] = useState(0);
  const [discountedSubtotal, setDiscountedSubtotal] = useState(0);
  const [img, setImg] = useState("");
  const [quantity, setQuantity] = useState();
  const [shippingLocation, setShippingLocation] = useState("lowerMainland"); // "lowerMainland" or "outside"
  const [shippingCity, setShippingCity] = useState(""); // Store the entered city

  //state to track if cart is open
  const [isCartOpen, setIsCartOpen] = useState(false);

  //alert system
  const [popup, setPopup] = useState(false);
  const [purchase, setPurchase] = useState(false);

  //Protects from react strictmode
  const initalLoad = useRef(true);

  // Move calculateCartSummary before the useEffect that uses it
  const calculateCartSummary = useCallback(() => {
    let grossSubtotal = 0;
    let totalShipping = 0;
    let totalTax = 0;

    // Subtotal before promos
    cart.forEach((item) => {
      grossSubtotal += item.quantity * item.price;
    });

    // Buy 6 get 1 free promo (across all bags)
    const totalQuantity = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const freeItems = Math.floor(totalQuantity / 6);
    const minUnitPrice = cart.length > 0 ? Math.min(...cart.map((i) => Number(i.price || 0))) : 0;
    const promoDiscount = parseFloat((freeItems * minUnitPrice).toFixed(2));

    const netSubtotal = Math.max(0, parseFloat((grossSubtotal - promoDiscount).toFixed(2)));

    // Shipping rules - free shipping if subtotal (after promos, before tax) >= $50 anywhere
    if (netSubtotal >= 50) {
      totalShipping = 0.0; // Free shipping for orders $50+ (pre-tax)
    } else if (shippingLocation === "outside") {
      totalShipping = 10.0; // $10 shipping fee for outside Lower Mainland
    } else {
      totalShipping = 0.0; // Free shipping within Lower Mainland
    }

    // 5% GST on discounted subtotal
    totalTax = parseFloat((netSubtotal * 0.05).toFixed(2));

    const totalEstTotal = parseFloat((netSubtotal + totalShipping + totalTax).toFixed(2));

    setTotalPrice(grossSubtotal);
    setDiscount(promoDiscount);
    setDiscountedSubtotal(netSubtotal);
    setTax(totalTax);
    setShipping(totalShipping);
    setEstTotal(totalEstTotal);
  }, [cart, shippingLocation]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    console.log("Preparing to load save");
    const savedCart = localStorage.getItem("savedCart");
    const savedShippingLocation = localStorage.getItem("savedShippingLocation");
    const savedShippingCity = localStorage.getItem("savedShippingCity");
    
    if (initalLoad.current) {
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          // Migrate old product names and prices
          const migratedCart = parsedCart.map(item => {
            let updatedItem = { ...item };

            // Migrate old product names
            if (item.name === "Citrus Treats" || item.name === "Orange Citrus Treats") {
              updatedItem.name = "Orange Treats";
            }

            // Migrate old prices - update any item with price 7.99 or 4.24 to 4.99
            if (Number(item.price) === 7.99 || Number(item.price) === 4.24) {
              updatedItem.price = 4.99;
              updatedItem.totalPrice = updatedItem.quantity * 4.99;
            }

            return updatedItem;
          });
          setCart(migratedCart);
          console.log("Saved Cart Found and migrated:", savedCart);
        } catch (error) {
          console.error("Failed to parse savedCart:", error);
        }
      }
      
      if (savedShippingLocation) {
        setShippingLocation(savedShippingLocation);
      }
      
      if (savedShippingCity) {
        setShippingCity(savedShippingCity);
      }
      
      initalLoad.current = false;
    }
  }, []);

  // //log prices
  // useEffect(() => {
  //   console.log("Cart updated:", cart);
  //   console.log("Total price:", totalPrice);
  //   console.log("Shipping:", shipping);
  //   console.log("Estimated Total:", estTotal);
  // }, [cart, totalPrice, shipping, estTotal]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedCart", JSON.stringify(cart));
    calculateCartSummary();
  }, [cart, shippingLocation, calculateCartSummary]);

  // Save shipping location to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedShippingLocation", shippingLocation);
  }, [shippingLocation]);

  // Save shipping city to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedShippingCity", shippingCity);
  }, [shippingCity]);

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
      setQuantity(numNewQuantity);
      setIsCartOpen(true); // Open cart drawer automatically
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
  }, [purchase]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);  

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        discount,
        discountedSubtotal,
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
        isCartOpen,
        setIsCartOpen,
        shippingLocation,
        setShippingLocation,
        shippingCity,
        setShippingCity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
