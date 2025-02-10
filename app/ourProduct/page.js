"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../../Components/CartContext";

// Ensure Poppins is actually loaded in your root layout or via a CSS import.
// For example in app/layout.js:
// import { Poppins } from 'next/font/google';
// const poppins = Poppins({ weight: ['400','600'], subsets: ['latin'] });

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
    <main
      className="min-h-screen w-full text-black"
      style={{ backgroundColor: "my-beige" }} 
    >
      <div style={{ width: "1440px", margin: "0 auto", paddingTop: "90px" }}>
        {/* Top heading */}
        <section
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h1 style={{ fontSize: "60px", fontWeight: "bold", marginBottom: "10px" }}>
            OUR PRODUCT
          </h1>
          <p style={{ color: "#666666", fontSize: "18px" }}>
            Second Savour crafts sustainable, delicious candy by upcycling fruits
          </p>
        </section>

        {/* Main row: 1) Orange block + pouch, 2) Three features, 3) Product info */}
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            gap: "30px",
            marginBottom: "60px",
          }}
        >
          {/* 1) Orange block + pouch */}
          <div
            style={{
              width: "646px",
              height: "857px",
              backgroundColor: "#FF9B50",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/static/images/Stand-Up Pouch Bag Mockup label.png"
              alt="Citrus Treats"
              width={366}
              height={636}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              priority
            />
          </div>

          {/* 2) Stacked feature icons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "80px",
              justifyContent: "center",
            }}
          >
            {/* High Fiber */}
            <div
              style={{
                width: "249px",
                height: "232px",
                backgroundColor: "#FFECC2",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Image src="/static/images/fiber.png" alt="High Fiber" width={79} height={92} />
              {/* Force this label to use Poppins */}
              <span style={{ fontSize: "25px", fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>
                High Fiber
              </span>
            </div>

            {/* Low Calories */}
            <div
              style={{
                width: "249px",
                height: "232px",
                backgroundColor: "#FFECC2",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Image src="/static/images/lowCalorie.png" alt="Low Calories" width={68.59} height={90.64} />
              <span style={{ fontSize: "23px", fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>
                Low Calories
              </span>
            </div>

            {/* Vitamin C */}
            <div
              style={{
                width: "249px",
                height: "232px",
                backgroundColor: "#FFECC2",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Image src="/static/images/VitaminC.png" alt="Vitamin C" width={87} height={88} />
              <span style={{ fontSize: "25px", fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>
                Vitamin C
              </span>
            </div>
          </div>

          {/* 3) Citrus Treats info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "48px", fontWeight: 900 }}>CITRUS TREATS</h2>
            <p style={{ fontSize: "24px", color: "#333333", marginTop: "10px" }}>
              $7.99 Per Package
            </p>
            {/* This description should also be in Poppins */}
            <p
              style={{
                width: "480px",
                color: "#666666",
                lineHeight: "1.5",
                fontSize: "18px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Nutritious, vitamin‐filled, citrus delicacies hand‐made from repurposed
              juiced oranges. Made to enjoy in class, on a drive, during study sessions,
              basically anywhere!
            </p>
            <button
              onClick={handleAddToCart}
              style={{
                width: "473px",
                height: "86px",
                backgroundColor: "#CCCCCC",
                fontSize: "20px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        </section>

        {/* ORANGE + paragraph, and nutrition label on the right */}
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          <div style={{ width: "600px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
              ORANGE
            </h2>
            <p style={{ color: "#444444", lineHeight: "1.6", fontSize: "18px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor sapien,
              dapibus nec tellus id, tristique congue massa. Sed ultricies lacus eu viverra
              elementum. Praesent lobortis viverra porta. In mattis, dolor in tristique
              tincidunt, turpis turpis consectetur ligula, tincidunt porttitor ante purus
              porttitor ipsum. Nam pharetra, erat nec bibendum tincidunt, orci enim
              molestie mauris, ut consequat nisi ex ac tellus. Donec hendrerit risus augue,
              at porta odio semper quis.
            </p>
          </div>
          <div style={{ width: "300px" }}>
            <Image
              src="/static/images/NutritionLabel.jpg"
              alt="Nutrition Facts"
              width={300}
              height={600}
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>

        {/* HOW OUR PRODUCT IS MADE */}
        <section style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
            HOW OUR PRODUCT IS MADE
          </h2>
          <div
            style={{
              width: "657px",
              height: "646px",
              position: "relative",
            }}
          >
            <Image
              src="/static/images/HowProductMade.png"
              alt="How Our Product is Made"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>

        {/* Footer is presumably in your global layout.js */}
      </div>
    </main>
  );
}
