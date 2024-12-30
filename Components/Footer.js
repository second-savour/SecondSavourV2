import React from "react";
import Hyperlink from "./Hyperlink";

function Footer() {
  return (
    <div className="w-[90%] m-auto mt-[5rem] lg:mt-[10rem]">
      <nav className="min-h-[15rem]">
        <div className="border-t-2 border-gray-600 py-[1%] mt-[8%]"></div>

        <div className="flex flex-grow md:flex-grow lg:flex-row gap-[5vw] lg:gap-[5%]">
          <div className="flex flex-col gap-[0.5rem]">
            <h3 className="text-gray-600">Company</h3>
            <div className="flex flex-col gap-[0.2rem]">
              <Hyperlink
                Text={"About Us"}
                Link={"/about"}
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />

              <Hyperlink
                Text={"Contact Us"}
                Link={
                  "https://docs.google.com/forms/d/e/1FAIpQLSfEeZn6Av1vFIMVT2B4yRBemiZWaskyFIAEft18ToZpxbA5bw/viewform?usp=sharing"
                }
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <h3 className="text-gray-600">Socials</h3>
            <div className="flex flex-col gap-[0.2rem]">
              <Hyperlink
                Text={"Instagram"}
                Link={"https://www.instagram.com/second.savour/"}
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />

              <Hyperlink
                Text={"Tiktok"}
                Link={"https://www.tiktok.com/@second.savour"}
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />

              <Hyperlink
                Text={"Linkedin"}
                Link={"https://www.linkedin.com/company/second-savour"}
                Color={"--color-black"}
                HoverColor={"--purple"}
                Display={"none"}
              />
            </div>
          </div>

          <div className="text-gray-600 lg:text-right text-center hidden lg:block lg:absolute lg:right-[5%]">
            <h3> Website Built and Designed</h3>
            <h3> By The Second Savour Team </h3>
          </div>
        </div>
      </nav>

      <h3> Savour the Flavour </h3>
      <h1> Second Savour </h1>
    </div>
  );
}

export default Footer;
