"use client";

import React, { useState } from "react";
// import Button from "../../Components/Button.js";
import Image from "next/image";
import SmallSegment from "../../Components/SmallSegment.js";
import { useCart } from "../../Components/CartContext.js";

function Page() {
  const {
    updateCart,

    cart,

    updateCartQuantity,
  } = useCart();

  const [displayText, setDisplayText] = useState(
    <div>
      <h3 className="text-gray-600 mb-[2%]"> Nutrition </h3>
      <p>
        A healthy treat, consisting of fibre, vitamin C, and low calorie count!
      </p>
      <h3 className="text-gray-600 mt-[2%] mb-[2%]">Ingredients</h3>
      <p>
        Our recipe consists of only THREE ingredients: Orange Peels, Sugar, and
        Citric Acid.
      </p>
    </div>
  );
  const [selectedButton, setSelectedButton] = useState("Nutrition");

  // Function to update the text
  const handleTextChange = (text, button) => {
    setDisplayText(text);
    setSelectedButton(button);
  };

  return (
    <div className=" w-[95%] md:w-[95%] lg:w-[80%] m-auto  md:mt-[9%] lg:mt-[0%]">
      <div className="flex flex-col md:flex-row lg:flex-row gap-[3vh] lg:gap-[1%]">
        <div className="group relative bg-[#0D6A3D] min-w-[40%] lg:max-h-[100%] md:max-h-[100%] max-h-[50vh] lg:h-auto rounded-[1rem] flex justify-center hover:bg-[#17B267] hover:cursor-pointer ease-in-out duration-300 shadow-lg">
          <Image
            className="py-[5vw] px-[8vw] relative lg:object-contain object-scale-down top-3 group-hover:top-0 ease-in-out duration-300"
            src={"/static/images/Stand-Up Pouch Bag Mockup label.png"}
            alt="Our Delicious Product Citrus Candies"
            height={1080}
            width={1080}
            priority={true}
          />
        </div>

        <div className=" bg-[#E7D9BF] rounded-[1rem] p-[2rem] md:p-[3rem] lg:p-[3rem] flex flex-col md:min-w-[60%] lg:min-w-[60%] shadow-lg">
          <div className="h-full flex flex-col gap-[1rem] py-[0.5rem]">
            <h1 className=""> Citrus Candies </h1>
            <h3 className="text-gray-600"> $6.99 Per Package </h3>
            <p>
              Nutritious, vitamin-filled, citrus delicacies hand-made from
              repurposed juiced oranges. Made to enjoy in class, on a drive,
              during study sessions, basically anywhere!
            </p>
          </div>
          <div className="flex flex-col-reverse gap-[1rem]">
            <button
              className="w-full h-fit bg-my-green text-white border-b-2 border-black px-[1rem] py-[1rem] rounded-full hover:border-b-0 ease-out duration-[100ms] trasition-all"
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
              <p>Purchase Item</p>
            </button>

            <div className="flex flex-row gap-[1rem] border-b-2 border-black rounded-full bg-white overflow-hidden">
              <button
                className="bg-white max-w-[30%] text-2xl font-medium rounded-none hover:bg-gray-200 hover:text-black"
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
                <p>+</p>
              </button>

              {cart.length !== 0 ? (
                cart.map((item) => (
                  <input
                    className="w-[40%] text-center"
                    placeholder={item.quantity}
                    value={item.quantity}
                    key={item.name}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = parseFloat(inputValue) || (
                        <p className="w-[40%]">10</p>
                      ); // Convert to number or empty string
                      updateCartQuantity(item.name, numericValue);
                    }}
                  />
                ))
              ) : (
                <input
                  className="w-[40%] text-center"
                  placeholder={0}
                  value={0}
                  key={0}
                />
              )}

              <button
                className="bg-white max-w-[30%] text-2xl font-medium rounded-none hover:bg-gray-200 hover:text-black"
                onClick={() =>
                  updateCart(
                    "Citrus Treats",
                    -1,
                    "/static/images/Stand-Up Pouch Bag Mockup label.png",
                    "A bag of citrus treats, filled with tangy, refreshing fruit snacks",
                    "ID",
                    6.99,
                    6.99
                  )
                }
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="border-b-2 border-gray-600 my-[3%]"></div>
        <div className="flex justify-between lg:flex-row md:flex-row flex-col">
          <h2> Product Information</h2>
          <div className="flex flex-row gap-[2%] mt-[2vh] lg:mt-0 md:mt-0 min-w-[50%] md:justify-end lg:justify-end">
            <button
              onClick={() =>
                handleTextChange(
                  <div>
                    <h3 className="text-gray-600 mb-[2%]"> Nutrition </h3>
                    <p>
                      A healthy treat, consisting of fibre, vitamin C, and low
                      calorie count!
                    </p>
                    <h3 className="text-gray-600 mt-[2%] mb-[2%]">
                      Ingredients
                    </h3>
                    <p>
                      Our recipe consists of only THREE ingredients: Orange
                      Peels, Sugar, and Citric Acid.
                    </p>
                  </div>
                )
              }
              className={`w-fit rounded-[0.5rem] px-[1rem] py-[0.5rem] hover:cursor-pointer hover:text-white hover:bg-[#0D6A3D] ease-in-out duration-300
                            ${
                              selectedButton === "Nutrition"
                                ? "bg-[#0D6A3D] text-white"
                                : "bg-[#E7D9BF]"
                            }`}
            >
              <h3> Nutrition </h3>
            </button>

            <button
              onClick={() =>
                handleTextChange(
                  <div className="flex flex-col gap-[3vh] lg:gap-[1%] lg:flex-row md:flex-row justify-between">
                    <div className="lg:max-w-[50%] h-[50%]">
                      <SmallSegment
                        Title={"Order Online"}
                        Text={
                          "At Second Savour, we're expanding our sustainability initiatives to engage people outside of our communities.  Join us in making a positive impact on our planet!"
                        }
                        ButtonText={"Browse Products"}
                        imgSrc={"/static/images/boxes.png"}
                      />
                    </div>

                    <div className="lg:max-w-[50%] h-[50%]">
                      <SmallSegment
                        Title={"Visit our In Person Sales"}
                        Text={
                          "We create our product using eco-friendly resources, offering sustainable food products."
                        }
                        ButtonText={"View Locations"}
                        imgSrc={"/static/images/boothing.png"}
                      />
                    </div>
                  </div>,

                  "Purchase in person"
                )
              }
              className={`w-fit rounded-[0.5rem] px-[1rem] py-[0.5rem] hover:cursor-pointer hover:text-white hover:bg-[#0D6A3D] ease-in-out duration-300
                                    ${
                                      selectedButton === "Purchase"
                                        ? "bg-[#0D6A3D] text-white"
                                        : "bg-[#E7D9BF]"
                                    }`}
            >
              <h3>Purchase</h3>
            </button>
          </div>
        </div>

        <div className="mt-[7%] flex flex-col gap-[1rem]">{displayText}</div>
      </div>
    </div>
  );
}

export default Page;
