"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Button({ text, clickTo, setOnClick }) {
  return (
    <a href={clickTo}>
      <button
        className="flex justify-between rounded-[0.25rem] py-[1rem] px-[2rem] bg-white hover:bg-black hover:text-white hover:left-2 hover:shadow-2xl left-0 relative ease-in-out duration-300"
        onClick={setOnClick}
      >
        <h3 className="mr-[1rem]"> {text} </h3>
        <div className="min-h-[100%] flex flex-col justify-around">
          <FaArrowRight />
        </div>
      </button>
    </a>
  );
}

//consolle

export default Button;
