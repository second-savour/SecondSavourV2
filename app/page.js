"use client";

import React, { useState, useEffect } from "react";
import ContainerText from "../Components/ContainerText.js";
import ReviewCard from "../Components/ReviewCard.js";

function Page() {
  const [Inview, setInview] = useState(34);

  const increaseView = (amount) => {
    if (Inview < 68) {
      setInview(Inview + amount);
    } else {
      setInview(0);
    }
  };

  const decreaseView = (amount) => {
    if (Inview > 0) {
      setInview(Inview - amount);
    } else {
      setInview(68);
    }
  };

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px is the "lg" breakpoint in Tailwind.
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="flex flex-col lg:gap-[10rem] gap-[5rem] ">
      <section className="lg:h-[110vh] h-[50vh] max-h-[110vh] lg:mt-[-19vh] object-cover relative overflow-hidden ">
        <image
          src="static/images/heroImage.png"
          alt="Background image of crates filled with colorful, fresh fruit at a lively market, showcasing natural abundance."
          loading="eager"
          className="opacity-[0.4] w-[101vw] h-full object-cover "
        ></image>
        <div className="absolute top-0 left-0 w-[100%] h-[100%]">
          <div className="w-[80%] lg:w-[40%] mx-auto flex flex-col gap-[2rem] mt-[15%] text-center">
            <div className="flex flex-col gap-[2rem]">
              <h1> Second Savour </h1>
              <p>A student-led company that aims to combat food waste.</p>
            </div>
            <div className="w-full">
              <a className="w-fit" href="/checkout">
                <button className="p-[1rem] bg-my-green text-white w-fit px-[2rem] font-bold">
                  <p className="font-bold">Purchase Now</p>
                </button>{" "}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContainerText
        Header="Citrus Treats"
        Subheader="$6.99 Per Package"
        Text="     Snack with a Purpose – Indulge in sweet and tangy goodness while
              making an eco-friendly choice. Our nutritious hand-crafted citrus
              delicacies are made from rescued oranges, offering you a
              sustainable and delicious option."
        ButtonText="Purchase Now!"
        altText="A bag of citrus treats, featuring vibrant, fresh fruit snacks with a zesty, tangy flavor"
        Image="static/images/Citrus Treats Image.png"
        clickTo="/shop"
      ></ContainerText>

      <section className="lg:mx-[10rem] mx-[2rem] flex flex-col gap-[0.5rem] lg:gap-[2rem]">
        <h2> Our Impacts </h2>
        <div className="flex lg:flex-row flex-col justify-between w-[full] gap-[1rem]">
          <div className="bg-my-orange text-white flex lg:flex-col flex-row justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] font-bold lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-fit">
            <h2 className="whitespace-nowrap"> 50 G </h2>
            <p> Of GHG reduced with every bag purchased</p>
          </div>

          <div className="bg-my-brown text-white flex lg:flex-col flex-row justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] font-bold lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-fit">
            <h2 className="whitespace-nowrap"> 1.5 KG </h2>
            <p> Of food waste diverted from landfills by 2026</p>
          </div>

          <div className="bg-my-green text-white flex lg:flex-col flex-row justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] font-bold lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-fit">
            <h2 className="whitespace-nowrap"> 4.3 K</h2>
            <p> Oranges saved from the trash by 2025</p>
          </div>
        </div>
      </section>

      <section className=" lg:mx-[10rem] mx-[2rem]">
        <div className=" rounded-[1rem] w-[full] lg:min-h-[70vh] lg:max-h-[70vh] bg-my-beige px-[1rem] py-[2rem] lg:p-[3rem] flex flex-col lg:flex-row justify-between lg:gap-[0] gap-[2rem]">
          <div className="flex flex-col lg:min-h-[60vh] justify-around w-full lg:w-[50%] ">
            <div className="flex flex-col h-fit gap-[1.5rem] text-black">
              <h2>visit our in person sales</h2>
              <p>
                Find us at boothing events or local retail stores to explore our
                eco-friendly products and support a sustainable mission. Check
                out where we’ll be next!
              </p>
              <a className="w-fit" href="/map">
                <button className="lg:w-fit w-full bg-my-green text-my-white mx-auto px-[2rem] font-bold p-[1rem]">
                  <p className="font-bold">View Locations</p>
                </button>
              </a>
            </div>
          </div>
          <div className=" lg:max-w-[50%] overflow-hidden flex flex-row gap-[1rem] flex-wrap justify-center items-center">
            <image
              src="static/images/sales1.png"
              alt="A bag of citrus treats, filled with tangy, refreshing fruit snacks"
              className=" max-h-[40vh] lg:block lg:h-[45%] lg:w-[45%] h-fit w-full object-cover rounded-[1rem]"
            ></image>

            <image
              src="static/images/sales2.png"
              alt="A bag of citrus treats, filled with tangy, refreshing fruit snacks"
              className="hidden lg:block lg:h-[45%] lg:w-[45%] h-fit w-full object-cover rounded-[1rem]"
            ></image>

            <image
              src="static/images/sales3.png"
              alt="A bag of citrus treats, filled with tangy, refreshing fruit snacks"
              className="hidden lg:block lg:h-[45%] lg:w-[45%] h-fit w-full object-cover rounded-[1rem]"
            ></image>

            <image
              src="static/images/sales4.png"
              alt="A bag of citrus treats, filled with tangy, refreshing fruit snacks"
              className="hidden lg:block lg:h-[45%] lg:w-[45%] h-fit w-full object-cover rounded-[1rem]"
            ></image>
          </div>
        </div>
      </section>

      {/* Removed for now until we redesign */}

      {/* <section className="lg:mx-[10rem] mx-[2rem] relative ">
        <h2>ORDER ONLINE</h2>
        <div className="flex flex-col lg:flex-row gap-[5vw]">
          <div>
            <image
              src="static/images/mascot.png"
              alt="Second Savour Mascot"
              className="hidden lg:block md:block sm:block;"
            />
          </div>
          <div className="bg-yellow-400 rounded-[1rem] p-[2rem] flex flex-col gap-[1rem] lg:max-w-[70%]">
            <p className="">
              At Second Savour, we&apos;re expanding our sustainability
              initiatives to engage people outside of our communities. Join us
              in making a positive impact on our planet!
            </p>
            <a className='w-fit' href="/shop">
              <button className="lg:w-fit lg:mx-none bg-my-green text-[#e7d9bf] px-[2rem] font-bold rounded-[0.5rem]  mx-auto w-full p-[1rem]">
                <p className="font-bold">Shop Now</p>
              </button>
            </a>
          </div>
        </div>
      </section> */}

      <section className=" lg:mx-[10rem] mx-[2rem]">
        <div className="  w-[full] lg:min-h-[55vh] lg:max-h-[55vh] bg-my-#e7d9bf lg:p-[3rem] flex flex-col lg:flex-row justify-between items-start lg:gap-[1rem] gap-[2rem] overflow-hidden">
          <div className="flex flex-col lg:min-h-[60vh] justify-between lg:w-[50%] ">
            <div className="flex flex-col h-fit gap-[1.5rem] text-black">
              <h2>INTERESTED IN HAVING SECOND SAVOUR IN YOUR STORE?</h2>
              <p>
                Reach out to us at{" "}
                <span className="font-bold">sales@secondsavour.ca</span>
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfEeZn6Av1vFIMVT2B4yRBemiZWaskyFIAEft18ToZpxbA5bw/viewform"
                target="blank"
              >
                <button className="lg:w-fit w-full bg-my-green text-[#e7d9bf] px-[2rem] font-bold p-[1rem]">
                  <p className="font-bold">Partner with us!</p>
                </button>
              </a>
            </div>
          </div>
          <image
            src="static/images/SSonShelf.png"
            alt="Citrus treats displayed in-store, offering a vibrant selection of tangy, refreshing fruit snacks"
            className="object-cover w-full max-h-[44vh] rounded-[1rem]"
          ></image>
        </div>
      </section>

      <section className=" lg:mx-[10rem] mx-[2rem]">
        <div
          className="relative rounded-[1rem] w-[full] lg:lg:min-h-[70vh] lg:max-h-[70vh] px-[1rem] py-[2rem] lg:p-[3rem] flex flex-row justify-between bg-cover bg-center"
          style={{ backgroundImage: "url(/static/images/OurStory.png)" }}
        >
          <div className="flex flex-col h-fit  lg:max-w-[50%] gap-[1rem] text-black">
            <h2> Turning Excess into Excellence</h2>
            <p>
              Second Savour was founded by a group of friends at Simon Fraser
              University (SFU) in Burnaby, BC, with a mission to create
              environmental change.
            </p>
            <a className="w-fit" href="/about">
              <button className="lg:w-fit w-full bg-my-green text-[#e7d9bf] px-[2rem] font-bold p-[1rem]">
                <p className="font-bold">Our Story</p>
              </button>
            </a>
            <image
              src="static/images/SS Sticker.png"
              alt="Green sticker with yellow text reading 'Second Savour,' featuring a clean and bold design"
              className="absolute top-[-5px] right-[1px] w-[5rem] lg:w-[10rem]"
            />
          </div>
        </div>
      </section>

      <section className="lg:mx-[10rem] mx-[2rem]">
        <div className="w-full mx-auto flex flex-col items-center text-center gap-[1rem]">
          <h2>JOIN THE MOVEMENT</h2>
          <p className="mb-[1rem]">
            See what people are saying about our product
          </p>

          <div className="relative w-full flex flex-row h-full">
            <div className="flex flex-row w-full justify-between items-center">
              <button
                className="w-fit h-fit lg:block hidden "
                onClick={() => decreaseView(34)}
              >
                &lt;
              </button>

              <div
                className={`lg:w-[90%] max-h-[33vh] lg:overflow-hidden lg:overscroll-none overflow-x-auto overscroll-x-auto w-full`}
              >
                <div
                  className={`flex flex-row justify-between gap-[1.4%] w-fit
                   transition-[right] ease-in-out duration-300 relative right-[0]
                  `}
                  style={isLargeScreen ? { right: `${Inview}%` } : {}}
                >
                  <ReviewCard
                    Name="- Ellery Wu"
                    Body=" “Absolutely delicious! The citrus treats from Second Savour are the perfect balance of sour and sweet. Love the fresh flavor and sustainable mission. Highly recommend!”"
                  ></ReviewCard>

                  <ReviewCard
                    Name="- Brandon Lau"
                    Body=" “The orange flavor is so fresh and natural. Love that these candies
        fight food waste—guilt-free snacking at its best!”"
                  ></ReviewCard>

                  <ReviewCard
                    Name="- Zoe Wang"
                    Body=" “The best orange gummy! Juicy, sweet, citrusy, and has a pleasant soft texture! It feels amazing to know these treats were produced with the environment in mind.”"
                  ></ReviewCard>

                  <ReviewCard
                    Name="- Angelina Chen"
                    Body=" “Second Savour's candies are the perfect blend of flavor and sustainability. I can't get enough of them!”"
                  ></ReviewCard>

                  <ReviewCard
                    Name="- Jason Liu"
                    Body=" “Sweet, tangy, and bursting with citrusy goodness. It’s amazing that they’re made from rescued fruit!”"
                  ></ReviewCard>
                </div>
              </div>
              <button
                className="w-fit h-fit lg:block hidden hover:bg-my-green ease-in-out duration-300 text-black"
                onClick={() => increaseView(34)}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className=" gap-[1rem] flex-row mt-[1rem] hidden lg:flex">
            <div
              className={`w-[1rem] h-[1rem] border-2 border-black rounded-full transition-all ease-in-out duration-300
                ${Inview === 0 ? "bg-black" : "bg-none"}`}
            ></div>
            <div
              className={`w-[1rem] h-[1rem] border-2 border-black rounded-full transition-all ease-in-out duration-300
                ${Inview === 34 ? "bg-black" : "bg-transparent"}`}
            ></div>
            <div
              className={`w-[1rem] h-[1rem] border-2 border-black rounded-full
                ${Inview === 68 ? "bg-black" : "bg-transparent"}`}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
