"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../../Components/CartContext";

export default function Page() {
  const { updateCart } = useCart();

  // This now always adds 1 item to cart—no quantity input
  const handleAddToCart = () => {
    updateCart(
      "Orange Treats",
      1,
      1, // always add 1
      "/static/images/Stand-Up Pouch Bag Mockup label.png",
      "A bag of orange citrus treats, tangy & refreshing",
      "CT-1",
      7.99,
      7.99
    );
  };

  return (
    <main
      className="bg-[#FEF7E6] min-h-screen w-full text-black pt-[6rem] pb-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto w-[90%] max-w-[1600px]">
        {/* =========================================
            MOBILE LAYOUT ( < 1024px )
        ========================================== */}
        <div className="flex lg:hidden flex-col w-full">
          {/* Page Title */}
          <section className="text-left mb-8">
            <h1
              className="text-4xl font-bold mb-1"
              style={{ fontFamily: "Tanker, sans-serif" }}
            >
              OUR PRODUCT
            </h1>
            <p className="text-gray-700 text-sm">
              Second Savour crafts sustainable, delicious candy by upcycling fruits
            </p>
          </section>

          {/* Bag (left) + Icons (right) in one row */}
          <section className="flex flex-row items-start justify-center gap-4 w-full mb-8">
            {/* Orange BG + Bag */}
            <div className="bg-[#FF9B50] w-[198px] h-[362px] rounded-3xl flex items-center justify-center">
              <Image
                src="/static/images/Stand-Up Pouch Bag Mockup label.png"
                alt="Citrus Treats Bag"
                width={110}
                height={191}
                className="object-contain"
              />
            </div>

            {/* Three Icons, stacked */}
            <div className="flex flex-col gap-4 items-center justify-start">
              {/* High Fiber */}
              <div className="bg-[#FFECC2] w-[110px] h-[110px] rounded-3xl shadow-md flex flex-col items-center justify-center">
                <Image
                  src="/static/images/fiber.png"
                  alt="High Fiber"
                  width={30}
                  height={30}
                  className="object-contain"
                />
                <span className="font-semibold text-xs mt-1">High Fiber</span>
              </div>

              {/* Low Calories */}
              <div className="bg-[#FFECC2] w-[110px] h-[110px] rounded-3xl shadow-md flex flex-col items-center justify-center">
                <Image
                  src="/static/images/lowCalorie.png"
                  alt="Low Calories"
                  width={30}
                  height={40}
                  className="object-contain"
                />
                <span className="font-semibold text-xs mt-1">Low Calories</span>
              </div>

              {/* Vitamin C */}
              <div className="bg-[#FFECC2] w-[110px] h-[110px] rounded-3xl shadow-md flex flex-col items-center justify-center">
                <Image
                  src="/static/images/VitaminC.png"
                  alt="Vitamin C"
                  width={34}
                  height={34}
                  className="object-contain"
                />
                <span className="font-semibold text-xs mt-1">Vitamin C</span>
              </div>
            </div>
          </section>

          {/* CITRUS TREATS Text + Button (left-aligned) */}
          <section className="mb-12 text-left">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "Tanker, sans-serif" }}
            >
              CITRUS TREATS
            </h2>
            <p className="text-base mb-2">$7.99 per Package</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Nutritious, vitamin‐filled, citrus delicacies hand‐made from
              repurposed juiced oranges. Made to enjoy in class, on a drive,
              during study sessions, basically anywhere!
            </p>
            {/* ==== NEW GREEN BUTTON (Mobile) ==== */}
            <button
              onClick={handleAddToCart}
              className="
                bg-[#0D6A3D]
                text-white
                font-semibold
                w-[235px]
                h-[38px]
                rounded-full
                border-2
                border-black
                shadow-[4px_4px_0px_rgba(0,0,0,0.6)]
                hover:brightness-110
                transition-all
                duration-200
                flex
                items-center
                justify-center
              "
            >
              Add to Cart
            </button>
          </section>

          {/* ORANGE + NUTRITION LABEL (stacked) */}
          <section className="mb-12 flex flex-col gap-4">
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "Tanker, sans-serif" }}
            >
              ORANGE
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
            Bright and invigorating, our Citrus Treats are a vibrant 
            celebration of flavor. Each bite delivers a perfectly 
            balanced combination of zesty citrus and just the right 
            amount of natural sweetness. The fresh, tangy notes awaken 
            the senses, while a subtle sweetness rounds out the experience, 
            leaving a lingering, refreshing finish. Soft and aromatic with a 
            delicate texture, these treats offer the perfect burst of sunshine 
            for your palate, making every moment feel a little brighter and more 
            delightful.
            </p>
            <div className="flex justify-center mt-4">
              <Image
                src="/static/images/NutritionLabel.jpg"
                alt="Nutrition Facts"
                width={207}
                height={516}
                className="object-contain"
              />
            </div>
          </section>

          {/* HOW OUR PRODUCT IS MADE (text + centered image) */}
          <section className="mb-12 flex flex-col items-start gap-4">
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "Tanker, sans-serif" }}
            >
              HOW OUR PRODUCT IS MADE
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
            Our Citrus Treats are crafted with care using fresh 
            citrus peels that would have otherwise gone to waste, 
            giving them new life in a delicious way. We carefully 
            cut these peels, adding tangy citric acid to create a 
            perfect balance of tart and sweet flavors. Each batch is  
            made with sustainability in mind, turning leftover ingredients 
            into fragrant, refreshing treats that capture the essence of 
            sun-ripened citrus in every bite.
            </p>
            <div className="w-full flex justify-center">
              <Image
                src="/static/images/HowProductMade.png"
                alt="How Our Product is Made"
                width={313}
                height={281}
                className="object-contain"
              />
            </div>
          </section>
        </div>

        {/* =========================================
            DESKTOP LAYOUT ( >= 1024px )
        ========================================== */}
        <div className="hidden lg:flex flex-col w-full">
          {/* Page Title + Subtitle */}
          <section className="text-center mb-12">
            <h1
              className="text-6xl font-bold mb-2"
              style={{ fontFamily: "Tanker, sans-serif" }}
            >
              OUR PRODUCT
            </h1>
            <p className="text-gray-700 text-lg">
              Second Savour crafts sustainable, delicious candy by upcycling fruits
            </p>
          </section>

          {/* 3 Columns: Bag, Icons, Product Info */}
          <section className="w-full flex flex-row items-start justify-between mb-40">
            {/* Bag BG + Bag */}
            <div
              className="flex items-center justify-center rounded-3xl"
              style={{ width: "646px", height: "857px", backgroundColor: "#FF9B50" }}
            >
              <Image
                src="/static/images/Stand-Up Pouch Bag Mockup label.png"
                alt="Citrus Treats Bag"
                width={366}
                height={636}
                className="object-contain"
              />
            </div>

            {/* Icons */}
            <div
              className="flex flex-col items-center justify-between rounded-3xl"
              style={{
                width: "249px",
                height: "857px",
                padding: "1rem",
              }}
            >
              {/* High Fiber */}
              <div
                className="bg-[#FFECC2] flex flex-col items-center justify-center shadow-md rounded-3xl"
                style={{ width: "249px", height: "232px" }}
              >
                <Image
                  src="/static/images/fiber.png"
                  alt="High Fiber"
                  width={92}
                  height={79}
                />
                <span className="font-semibold mt-2">High Fiber</span>
              </div>

              {/* Low Calories */}
              <div
                className="bg-[#FFECC2] flex flex-col items-center justify-center shadow-md rounded-3xl"
                style={{ width: "249px", height: "232px" }}
              >
                <Image
                  src="/static/images/lowCalorie.png"
                  alt="Low Calories"
                  width={69}
                  height={90}
                />
                <span className="font-semibold mt-2">Low Calories</span>
              </div>

              {/* Vitamin C */}
              <div
                className="bg-[#FFECC2] flex flex-col items-center justify-center shadow-md rounded-3xl"
                style={{ width: "249px", height: "232px" }}
              >
                <Image
                  src="/static/images/VitaminC.png"
                  alt="Vitamin C"
                  width={87}
                  height={88}
                />
                <span className="font-semibold mt-2">Vitamin C</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-start" style={{ width: "300px" }}>
              <h2
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: "Tanker, sans-serif" }}
              >
                CITRUS TREATS
              </h2>
              <p className="text-lg mb-4">$7.99 per Package</p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Nutritious, vitamin‐filled, citrus delicacies hand‐made from
                repurposed juiced oranges. Made to enjoy in class, on a drive,
                during study sessions, basically anywhere!
              </p>
              {/* ==== NEW GREEN BUTTON (Desktop) ==== */}
              <button
                onClick={handleAddToCart}
                className="
                  bg-[#0D6A3D]
                  text-white
                  font-semibold
                  px-6
                  py-3
                  rounded-full
                  border-2
                  border-black
                  shadow-[4px_4px_0px_rgba(0,0,0,0.6)]
                  hover:brightness-110
                  transition-all
                  duration-200
                  w-full
                  text-center
                  text-lg
                "
              >
                Add to Cart
              </button>
            </div>
          </section>

          {/* ORANGE + NUTRITION LABEL */}
          <section className="w-full flex flex-row items-start justify-between mb-16">
            <div className="max-w-[50%] pr-8">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: "Tanker, sans-serif" }}
              >
                ORANGE
              </h2>
              <p className="text-gray-700 leading-relaxed">
              Bright and invigorating, our Citrus Treats are a vibrant 
            celebration of flavor. Each bite delivers a perfectly 
            balanced combination of zesty citrus and just the right 
            amount of natural sweetness. The fresh, tangy notes awaken 
            the senses, while a subtle sweetness rounds out the experience, 
            leaving a lingering, refreshing finish. Soft and aromatic with a 
            delicate texture, these treats offer the perfect burst of sunshine 
            for your palate, making every moment feel a little brighter and more 
            delightful.
              </p>
            </div>
            <div>
              <Image
                src="/static/images/NutritionLabel.jpg"
                alt="Nutrition Facts"
                width={441}
                height={1119}
                className="object-contain"
              />
            </div>
          </section>

          {/* HOW OUR PRODUCT IS MADE */}
          <section className="mb-40 w-full flex flex-row items-start justify-between">
            <div className="w-[50%] pr-8">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: "Tanker, sans-serif" }}
              >
                HOW OUR PRODUCT IS MADE
              </h2>
              <p className="text-gray-700 leading-relaxed">
              Our Citrus Treats are crafted with care using fresh 
              citrus peels that would have otherwise gone to waste, 
              giving them new life in a delicious way. We carefully 
              cut these peels, adding tangy citric acid to create a 
              perfect balance of tart and sweet flavors. Each batch is 
              made with sustainability in mind, turning leftover ingredients 
              into fragrant, refreshing treats that capture the essence of 
              sun-ripened citrus in every bite.
              </p>
            </div>
            <div className="w-[50%] flex justify-end">
              <Image
                src="/static/images/HowProductMade.png"
                alt="How Our Product is Made"
                width={657}
                height={646}
                className="object-contain"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
