import React from "react";
import Button from "../Components/Button.js";

function Segment({ Title, Text, Image, ButtonText, clickTo }) {
  return (
    <div className="">
      <div className="rounded-[0.5rem] p-[2rem] lg:p-[5rem] bg-[#E7D9BF] ease-in-out duration-300">
        <div className="flex lg:flex-row md:flex-col flex-col justify-between">
          <div className="lg:w-[46%] min-h-[100%] justify-between flex flex-col lg:flex-col md:flex-col gap-[1rem] lg:text-left text-center">
            {/* <h3 className='text-gray-500'> {header} </h3> */}
            <div>
              <h2 className="lg:w-full lg:mx-0 w-[100%] mx-auto"> {Title} </h2>
              <p className="mt-[1rem]"> {Text} </p>
            </div>

            <Button text={ButtonText} clickTo={clickTo} />
          </div>
          <div
            className="relative lg:pt-[0] pt-[3rem] ease-in-out duration-300 sm:w-[100%] lg:max-w-[50%] h-[100%]
                    flex flex-col"
          >
            <image className="width:100% mx-auto;" src={Image}></image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Segment;
