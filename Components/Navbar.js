"use client";

import React, { useState } from "react";
import Hyperlink from "./Hyperlink";

/* Icons */
import { IoMenu } from "react-icons/io5";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" mb-[8vh] md:mb-[5vh] lg:mb-[3%] ">
      <div
        className=" z-20 flex flex-row justify-between fixed h-[fit] lg:h-[6%] 
        top-0 left-0 bg---color-black backdrop-blur-[8px]"
      ></div>

      <div className=" flex flex-row justify-center lg:mt-[1%]">
        <div
          className={`flex flex-col lg:flex-row justify-between lg:w-[60vw] S w-[100vw] lg:rounded-full h-fit z-30 lg:py-[1%] pb-[6vh] lg:px-[3%] fixed lg:mt-[0%] mt-[-3%] lg:pt-[21] pt-[5%] rounded-[0.5rem]  ease-in-out duration-[500ms]  lg:bg-my-beige  ${
            isOpen ? "bg-green-700" : "bg-[#fef7e6]"
          }`}
        >
          <div className="flex flex-row lg:w-fit w-full h-fit justify-between lg:relative  fixed lg:px-0  pr-[1%] pl-[5%]">
            <div className="flex flex-col justify-center">
              <Hyperlink
                Text={"Second Savour"}
                Link={"/"}
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />
            </div>

            <button
              className="lg:hidden lg:bg-transparent lg:w-0 w-fit bg-transparent group-hover:bg-transparent hover:bg-transparent active:bg-transparent"
              onClick={toggleNavbar}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <span
                className={`text-3xl font-sans lg:hidden bg-transparent font-bold ease-in-out duration-300 h-full mt-[-1vh] flex flex-col justify-center  ${
                  isOpen ? "text-black" : "text-black"
                }`}
              >
                {isOpen ? "x" : <IoMenu className="w-[10] h-[10] text-4xl" />}
              </span>
            </button>
          </div>
          <div
            className={`flex flex-col lg:flex-row lg:gap-[1rem] gap-[1rem] min-w-[50%] lg:w-[20%]  lg:px-0 px-[7%] lg:mt-0 justify-end z-10 ease-in-out duration-300 ${
              isOpen ? "mt-[6vh]" : "mt-[-20vh]"
            }`}
          >
            <Hyperlink
              Text={"About"}
              Link={"/About"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <Hyperlink
              Text={"Locations"}
              Link={"/map"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
            <Hyperlink
              Text={"Shop"}
              Link={"/Shop"}
              Color={"--color-black"}
              HoverColor={"--purple"}
              Display={"none"}
            />
          </div>
        </div>
        <div className="pb-[3%]"></div>
      </div>
    </nav>
  );
}

export default Navbar;
