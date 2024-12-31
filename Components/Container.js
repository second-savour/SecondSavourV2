import React from "react";
import Button from "./Button.js";

function Container({
  Title,
  Description,
  Image,
  BGColor,
  ButtonText,
  clickTo,
}) {
  return (
    <div
      className="min-h-fit flex flex-col justify-between  gap-[3vh] rounded-[1rem] p-[2rem] lg:w-[50%] text-left relative"
      style={{ backgroundColor: BGColor }}
    >
      <div className="flex flex-col gap-[1rem]">
        <h2> {Title} </h2>
        <p> {Description} </p>
      </div>

      <div className="relative bottom-0 hover:bottom-5 ease-in-out duration-300 object-contain max-w-[100%] h-[fit] overflow-hidden">
        <image className="m-auto max-w-[100%] max-h-[100%]" src={Image}></image>
      </div>

      <div className="relative bottom-0">
        <div className="absolute bottom-0 min-w-[100%] ">
          <Button text={ButtonText} clickTo={clickTo} />
        </div>
      </div>
    </div>
  );
}

export default Container;
