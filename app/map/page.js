"use client";
import React from "react";
import Segment from "../../Components/Segment.js";
// import { useCart } from "../../Components/CartContext.js";
function page() {
  return (
    <div className="w-[100%] bg-[#FEF7E6] flex justify-center">
      <div className="flex flex-col gap-[3vh] lg:gap-[10vh] min-h-fit text-center w-[90%]">
        <div className="m-w-lvw">
          <h1> Where to Find Us </h1>
          <h3 className="mt-[1%]"> Visit us in person </h3>
        </div>

        <div className="border-2 border-black w-[100%] h-auto flex flex-cols justify-center">
          <iframe
            className="w-[100%]"
            src="https://www.google.com/maps/d/u/0/embed?mid=1avx0suLqYVZ5XO0ErTpqftE5P188U-c&ehbc=2E312F&noprof=1"
            width="640"
            height="480"
          ></iframe>
        </div>

        <Segment
          header={"Check our our virtual selection"}
          Title={"Order Online"}
          Text={
            "At Second Savour, we're expanding our sustainability initiatives to engage people outside of our communities.  Join us in making a positive impact on our planet!"
          }
          ButtonText={"Browse Products"}
          img={"/static/images/boxes.png"}
          clickTo={"/shop"}
        />
      </div>
    </div>
  );
}

export default page;
