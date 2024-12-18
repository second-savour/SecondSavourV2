import React from "react";

// /Components
import SmallSegment from "../Components/SmallSegment.js";
import Button from "../Components/Button.js";
import { FaArrowRight } from "react-icons/fa";

function page() {
  return (
    <div className="">
      {/* <Link href="/map">Map</Link>; */}
      <div className="w-100% bg-[#FEF7E6] flex justify-center">
        <div className="flex flex-col gap-[10vh] min-h-fit w-[90%]">
          {/* Header Section */}
          <div className="p-[2%] flex flex-col lg:gap-0 gap-[1rem]">
            <h1 className="text-center font-bold">SECOND SAVOUR</h1>
            <h3 className="text-center mt-[1%]">
              A student-led company that aims to combat food waste originating
              from excess produce
            </h3>
            <div className="w-fit mt-[2%] mx-auto ">
              <a href={"https://payments.secondsavour.ca/"}>
                <button className="flex justify-between rounded-[0.25rem] py-[1rem] px-[2rem] bg-green-800 text-white w-fit hover:bg-black hover:text-white hover:left-2 hover:shadow-2xl left-0 relative ease-in-out duration-300">
                  <h3 className="mr-[1rem] lg:flex w-full"> Purchase now! </h3>

                  <div className="min-h-[100%] flex flex-col justify-around w-full">
                    <FaArrowRight />
                  </div>
                </button>
              </a>{" "}
            </div>
          </div>

          {/* Citrus Candies Section */}
          <div className="mt-[2%] p-[5%] bg-green-800 flex flex-col border-2 rounded-2xl lg:flex-row md:flex-row">
            <div className="justify-center lg:w-[60%]">
              <div className="flex justify-left">
                <img
                  src="/static/images/newSticker.png"
                  className="hidden lg:block"
                />
              </div>

              <h1 className="mt-[2%] font-bold text-white">Citrus Candies</h1>
              <h3 className="mt-[2%] text-2xl font-bold text-white">
                $6.99 Per Package
              </h3>
              <p className="mt-[2%] text-white">
                Nutritious, vitamin-filled, citrus delicacies hand-made from
                repurposed juiced oranges. Made to enjoy in class, on a drive,
                during study sessions - basically anywhere!
              </p>

              <div className="mt-[10%] mb-[10%] flex justify-left lg:mb-[1%]">
                <Button text={"Check it out!"} clickTo={"/Shop"} />
              </div>
            </div>

            <div className="mt-[3%] flex justify-center lg:mt-0 lg:w-[40%]">
              <img
                src={"static/images/Citrus Treats Image.png"}
                alt="Packages"
                className="max-w-full"
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-[2%] flex flex-col justify-between lg:flex-row">
            <div className="lg:w-[30%] p-[3%]">
              <h1 className="font-bold">44 kg+</h1>
              <p className="mt-[3%]">
                Of surplus and imperfect produce saved from waste last month
              </p>
            </div>
            <div className="lg:w-[30%] p-[3%]">
              <h1 className="font-bold">100+</h1>
              <p className="mt-[3%]">
                Packages donated last year to raise awareness
              </p>
            </div>
            <div className="lg:w-[30%] p-[3%]">
              <h1 className="font-bold">200+</h1>
              <p className="mt-[3%]">
                Packages donated in the last year to raise awareness
              </p>
            </div>
          </div>

          <div className="flex flex-wrap mt-[2%] justify-between gap-[1%]">
            <div className="w-full md:w-[48%] h-auto mb-8">
              <SmallSegment
                Title={"Order Online"}
                Text={
                  "At Second Savour, we're expanding our sustainability initiatives to engage people outside of our communities.  Join us in making a positive impact on our planet!"
                }
                ButtonText={"Browse Products"}
                Image={"static/images/boxes.png"}
                clickTo={"/Shop"}
              />
            </div>

            <div className="lg:max-w-[50%] md:max-w-[50%] w-[100%] h-[50%]">
              <SmallSegment
                Title={"Visit our In Person Sales"}
                Text={
                  "We create our product using eco-friendly resources, offering sustainable food products."
                }
                ButtonText={"View Locations"}
                Image={"static/images/boothing.png"}
                clickTo={"/map"}
              />
            </div>
          </div>
          <div className="border-t border-gray-300"></div>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-[60%]">
              <h1>Our Story</h1>
              <p className="mt-[5%]">
                Second Savour was founded by a group of friends at Simon Fraser
                University (SFU) in Burnaby, BC, with a mission to create
                environmental change.
              </p>

              <a
                href="https://secondsavour.ca/about"
                className="flex lg:w-[50%] justify-between mt-[5%]"
              >
                <h3 className="h-[100%] flex flex-col justify-center text-gray-600">
                  Learn More
                </h3>
                <div className="flex flex-col justify-center p-[0.755rem] bg-[#0D6A3D] rounded-[0.25rem] text-white">
                  <FaArrowRight size="10px" />
                </div>
              </a>
            </div>

            <div className="lg:w-[40%]">
              <img
                src={"static/images/team.png"}
                alt="the Second Savour Team at our first social"
              />
            </div>
          </div>

          <div className="border-t border-gray-300"></div>

          <div>
            <h1 className="text-center">JOIN THE MOVEMENT</h1>
            <p className="text-gray-600 text-center mt-[2%]">
              See what people are saying about our products
            </p>
            <p className="text-center text-gray-800 mt-[5%] font-medium italic">
              &ldquo;Second Savour&apos;s candies are the perfect blend of
              flavor and sustainability. I can&apos;t get enough of them!&ldquo;
            </p>
            <p className="text-gray-800 text-center mt-[2%]">- Angelina Chen</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
