import React from "react";

function page() {
  return (
    <div className=" flex justify-center w-[100vw] px-[1rem]">
      <section className=" flex flex-col lg:mt-[2rem] gap-[1rem] lg:gap-[2rem] bg-white border border-gray-200 py-[3rem] px-[2rem] rounded-[2rem] w-fit lg:max-w-[35%] h-fit box-shadow-lg">
        <div className="w-full h-fit flex justify-center items-center">
          <img
            src="/static/images/box.png"
            alt="shopping cart icon"
            className="animate-bounce w-[5rem] lg:w-[10rem] h-fit"
          ></img>
        </div>
        <div className="flex flex-col gap-[1rem] lg:gap-[2rem] text-center">
          <h2> Purchase Succesful!</h2>
          <p className="leading-[140%]">
            We have received your order and will process it as soon as possible.
            You will receive an email with your order details.
          </p>
        </div>
        <a href="/shop" className="mt-[2rem]">
          <button className="bg-my-green w-[full] py-[1.5rem] text-white rounded-full hover:bg-green-950">
            {" "}
            <p>Continue Shopping</p>{" "}
          </button>
        </a>
      </section>
    </div>
  );
}

export default page;
