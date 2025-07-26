"use client";

import React from "react";
import Image from "next/image";

export default function ShopPage() {
  return (
    <>
      <main className="bg-[#FEF7E6] px-4 lg:px-20 pb-16 space-y-16">
        {/* OUR PRODUCT */}
        <section className="text-center pt-16">
          <h1 className="text-3xl lg:text-4xl font-bold">OUR PRODUCT</h1>
          <p className="mt-3 text-base lg:text-lg text-gray-800">
            Second Savour crafts sustainable, delicious candy by upcycling fruits
          </p>
        </section>

        {/* PRODUCT GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/** Card 1: Available **/}
          <div className="border-4 border-my-orange rounded-xl overflow-hidden flex flex-col">
            <div className="bg-my-orange flex justify-center items-center p-6">
              <Image
                src="/static/images/Stand-Up Pouch Bag Mockup label.png"
                alt="Citrus Treats"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="bg-white p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">Citrus Treats</h2>
                <p className="text-gray-600 mt-1">Orange</p>
              </div>
              <a
                href="/citrusTreat"
                className="mt-4 inline-block bg-my-green text-white text-center py-2 rounded-lg font-semibold text-sm"
              >
                View Product
              </a>
            </div>
          </div>

          {/** Card 2: Lemon flavor coming soon **/}
          <div className="border-4 border-my-yellow rounded-xl overflow-hidden flex flex-col">
            <div className="bg-my-yellow flex justify-center items-center p-6">
              <Image
                src="/static/images/Stand-Up Pouch Bag Mockup label.png"
                alt="Citrus Treats Lemon"
                width={200}
                height={200}
                className="object-contain blur-sm"
              />
            </div>
            <div className="bg-white p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">Citrus Treats</h2>
                <p className="text-gray-600 mt-1">L****</p>
              </div>
              <button
                disabled
                className="mt-4 inline-block bg-my-green text-white text-center py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed text-sm"
              >
                Coming Soon!
              </button>
            </div>
          </div>

          {/** Card 3: Lime flavor coming soon **/}
          <div className="border-4 border-my-green rounded-xl overflow-hidden flex flex-col">
            <div className="bg-my-green flex justify-center items-center p-6">
              <Image
                src="/static/images/Stand-Up Pouch Bag Mockup label.png"
                alt="Citrus Treats Lime"
                width={200}
                height={200}
                className="object-contain blur-sm"
              />
            </div>
            <div className="bg-white p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">Citrus Treats</h2>
                <p className="text-gray-600 mt-1">L***</p>
              </div>
              <button
                disabled
                className="mt-4 inline-block bg-my-green text-white text-center py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed text-sm"
              >
                Coming Soon!
              </button>
            </div>
          </div>

          {/** Card 4: Grapefruit flavor coming soon **/}
          <div className="border-4 border-my-red rounded-xl overflow-hidden flex flex-col">
            <div className="bg-my-red flex justify-center items-center p-6">
              <Image
                src="/static/images/Stand-Up Pouch Bag Mockup label.png"
                alt="Citrus Treats Grapefruit"
                width={200}
                height={200}
                className="object-contain blur-sm"
              />
            </div>
            <div className="bg-white p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">Citrus Treats</h2>
                <p className="text-gray-600 mt-1">G********</p>
              </div>
              <button
                disabled
                className="mt-4 inline-block bg-my-green text-center py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed text-sm"
              >
                Coming Soon!
              </button>
            </div>
          </div>

          {/** Big banner on the right **/}
          <div className="lg:col-span-2 flex items-center justify-center lg:justify-end">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="/static/images/bgbags.png"
                alt="Discover your flavour"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-xl lg:text-3xl font-bold text-black text-center px-4">
                  DISCOVER YOUR FLAVOUR WITH SECOND SAVOUR
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* HOW OUR PRODUCT IS MADE */}
        <section className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
          <div className="lg:w-1/2 text-black space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold">HOW OUR PRODUCT IS MADE</h2>
            <p className="text-gray-700">
              From rescued fruit to delicious treats, every step is sustainable.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/static/images/HowProductMade.png"
              alt="Production process illustration"
              width={350}
              height={250}
              className="object-contain"
            />
          </div>
        </section>


      </main>
    </>
  );
}
