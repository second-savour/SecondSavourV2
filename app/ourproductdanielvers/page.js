"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../../Components/CartContext";

export default function Page() {
  const { updateCart } = useCart();

  const handleAddToCart = () => {
    updateCart(
      "Citrus Treats",
      1,
      1,
      "/static/images/Stand-Up Pouch Bag Mockup label.png",
      "A bag of citrus treats, tangy & refreshing",
      "CT-1",
      7.99,
      7.99
    );
  };

  return (
    <main className="bg-[#FDF6EC] min-h-screen w-full text-black pt-[6rem] pb-8">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        {/* Top heading */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">OUR PRODUCT</h1>
          <p className="text-gray-700">
            Second Savour crafts sustainable, delicious candy by upcycling fruits
          </p>
        </section>

        {/* ------------------------------------------
            MAIN ROW with 3 columns, manually spaced
          ------------------------------------------ */}
        <section className="mb-16 relative hidden lg:flex flex-row items-start">
          {/* (1) The Pouch: Shifted Right via margin-left */}
          <div
            className="
              bg-[#FF9B50] rounded-lg p-4 flex items-center justify-center
              w-[23%] ml-[8rem]
            "
          >
            <Image
              src="/static/images/Stand-Up Pouch Bag Mockup label.png"
              alt="Citrus Treats"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>

          {/* (2) The Three Feature Boxes: Middle column */}
          <div className="w-[25%] ml-[2rem] flex flex-col gap-6 items-center justify-center">
            <div className="bg-[#FFECC2] w-[160px] h-[160px] rounded-md flex flex-col items-center justify-center gap-3 shadow">
              <Image
                src="/static/images/fiber.png"
                alt="High Fiber"
                width={32}
                height={32}
                className="object-cover"
              />
              <span className="font-semibold text-xl">High Fiber</span>
            </div>
            <div className="bg-[#FFECC2] w-[160px] h-[160px] rounded-md flex flex-col items-center justify-center gap-3 shadow">
              <Image
                src="/static/images/lowCalorie.png"
                alt="Low Calories"
                width={32}
                height={32}
                className="object-cover"
              />
              <span className="font-semibold text-xl">Low Calories</span>
            </div>
            <div className="bg-[#FFECC2] w-[160px] h-[160px] rounded-md flex flex-col items-center justify-center gap-3 shadow">
              <Image
                src="/static/images/VitaminC.png"
                alt="Vitamin C"
                width={32}
                height={32}
                className="object-cover"
              />
              <span className="font-semibold text-xl">Vitamin C</span>
            </div>
          </div>

          {/* (3) Citrus Treats Info: Farther right */}
          <div className="w-[25%] ml-[8rem] flex flex-col justify-start space-y-8">
            <div>
              <h2 className="text-5xl font-bold mb-4">CITRUS TREATS</h2>
              <p className="text-gray-700 text-xl mb-2">$7.99 Per Package</p>
              <p className="text-gray-600 leading-relaxed">
                Nutritious, vitamin‐filled, citrus delicacies hand‐made from
                repurposed juiced oranges. Made to enjoy in class, on a drive,
                during study sessions, basically anywhere!
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gray-300 text-black px-12 py-4 rounded-md hover:bg-gray-400 
                         transition-colors duration-200 w-full text-center text-lg font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </section>

        {/* 
          -- Mobile fallback (if you want a stacked layout on small screens). 
          -- This "block" is hidden on large screens (lg:hidden).
          -- The above row is hidden on mobile (hidden lg:flex).
        */}
        <section className="lg:hidden mb-16 flex flex-col gap-8 items-start">
          {/* Pouch */}
          <div className="bg-[#FF9B50] rounded-lg p-4 flex items-center justify-center w-full">
            <Image
              src="/static/images/Stand-Up Pouch Bag Mockup label.png"
              alt="Citrus Treats"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>

          {/* Feature Boxes */}
          <div className="flex flex-row gap-3 items-center justify-center flex-wrap">
            <div className="bg-[#FFECC2] w-[140px] h-[140px] rounded-md flex flex-col items-center justify-center gap-3 shadow">
              <Image
                src="/static/images/fiber.png"
                alt="High Fiber"
                width={32}
                height={32}
                className="object-cover"
              />
              <span className="font-semibold text-md">High Fiber</span>
            </div>
            <div className="bg-[#FFECC2] w-[140px] h-[140px] rounded-md flex flex-col items-center justify-center gap-3 shadow">
              <Image
                src="/static/images/lowCalorie.png"
                alt="Low Calories"
                width={32}
                height={32}
                className="object-cover"
              />
              <span className="font-semibold text-md">Low Calories</span>
            </div>
            <div className="bg-[#FFECC2] w-[140px] h-[140px] rounded-md flex flex-col items-center justify-center gap-3 shadow">
              <Image
                src="/static/images/VitaminC.png"
                alt="Vitamin C"
                width={32}
                height={32}
                className="object-cover"
              />
              <span className="font-semibold text-md">Vitamin C</span>
            </div>
          </div>

          {/* Citrus Treats Info */}
          <div className="w-full flex flex-col justify-start space-y-4 mt-4 px-2">
            <h2 className="text-4xl font-bold">CITRUS TREATS</h2>
            <p className="text-gray-700 text-lg">$7.99 Per Package</p>
            <p className="text-gray-600 leading-relaxed">
              Nutritious, vitamin‐filled, citrus delicacies hand‐made from
              repurposed juiced oranges. Made to enjoy in class, on a drive,
              during study sessions, basically anywhere!
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-gray-300 text-black px-8 py-3 rounded-md hover:bg-gray-400 
                         transition-colors duration-200 w-full text-center text-lg font-semibold mt-4"
            >
              Add to Cart
            </button>
          </div>
        </section>

        {/* ORANGE + Nutrition Label */}
        <section className="grid grid-cols-1 lg:grid-cols-[60%,40%] gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">ORANGE</h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              tortor sapien, dapibus nec tellus id, tristique congue massa. Sed
              ultricies lacus eu viverra elementum. Praesent lobortis viverra
              porta. In mattis, dolor in tristique tincidunt, turpis turpis
              consectetur ligula, tincidunt porttitor ante purus porttitor
              ipsum. Nam pharetra, erat nec bibendum tincidunt, orci enim
              molestie mauris, ut consequat nisi ex ac tellus. Donec hendrerit
              risus augue, at porta odio semper quis.
            </p>
          </div>
          <div className="flex items-start justify-center lg:justify-end">
            <Image
              src="/static/images/NutritionLabel.jpg"
              alt="Nutrition Facts"
              width={300}
              height={400}
              className="object-contain"
            />
          </div>
        </section>

        {/* HOW OUR PRODUCT IS MADE */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">HOW OUR PRODUCT IS MADE</h2>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            <div className="lg:w-1/2">
              {/* Space for future content if needed */}
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <Image
                src="/static/images/HowProductMade.png"
                alt="How Our Product is Made"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
