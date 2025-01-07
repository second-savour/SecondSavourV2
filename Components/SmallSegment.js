import React from "react";
// import Image from "next/image";
import Button from "../Components/Button.js";

function SmallSegment({ header, Title, Text, Image, ButtonText, clickTo }) {
  return (
    <div className="max-w-[100%]">
      <div className="rounded-[0.5rem] py-[3rem] p-[2rem] bg-[#E7D9BF] h-[70vh] ease-in-out duration-300">
        <div className="w-[100%] flex flex-col text-left justify-between h-[100%] gap-[5%]">
          <div className="">
            <h3 className="text-gray-500"> {header} </h3>
            <h2> {Title} </h2>
            <p className="mt-[2%]"> {Text} </p>
          </div>

          <div className="relative bottom-0 hover:bottom-5 ease-in-out duration-300 object-contain max-w-[100%] h-[100%] overflow-hidden">
            <Image
              className="m-auto max-w-[100%] max-h-[100%]"
              src={Image}
              height={1080}
              width={1080}
              alt=" "
            />
          </div>

          <Button text={ButtonText} clickTo={clickTo} />
        </div>
      </div>
    </div>
  );
}

export default SmallSegment;
