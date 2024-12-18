import React from "react";
import Button from "../../Components/Button.js";

function page() {
  return (
    <div className="flex flex-col gap-[10rem] ">
      <section className=" w-[100vw] max-h-[100vh] mt-[-19vh] object-cover relative overflow-hidden">
        <img
          src="static/images/heroImage.png"
          alt="background image depicting crates of fruit at a market"
          loading="eager"
          className="opacity-[0.8]"
        ></img>
        <div className="absolute top-0 left-0 w-[100%] h-[100%]">
          <div className="w-[40%] mx-auto flex flex-col gap-[5rem] mt-[15%] text-center">
            <div>
              <h1> Second Savour </h1>
              <p>
                A student-lead company that aims to combat food waste
                originating from excess produce
              </p>
            </div>
            <Button text="Purchase Now" clickTo={"/shop"}></Button>
          </div>
        </div>
      </section>

      <section className=" mx-[12.5rem]">
        <div className=" rounded-[1rem] w-[75vw] min-h-[70vh] max-h-[70vh] bg-my-green p-[3rem] flex flex-row justify-between">
          <div className="flex flex-col min-h-[60vh] justify-around w-[50%] ">
            <div className="flex flex-col h-fit gap-[1.5rem] text-white">
              <h1>Citrus Treats</h1>
              <h2>$6.99 Per Package</h2>
              <p>
                Snack with a Purpose – Indulge in sweet and tangy goodness while
                making an eco-friendly choice. Our nutritious hand-crafted
                citrus delicacies are made from rescued oranges, offering you a
                sustainable and delicious option.
              </p>
              <button className="w-fit text-my-green">
                <p>Check it out!</p>
              </button>
            </div>
          </div>
          <img
            src="static/images/Citrus Treats Image.png"
            alt="Citrus Treats"
            className="h-fit w-[42%]"
          ></img>
        </div>
      </section>

      <section className="mx-[12.5rem] flex flex-col gap-[2rem] ">
        <h1> Our Milestones </h1>
        <div className="flex flex-row justify-between w-[75vw] border-2 border-black">
          <div className="bg-my-green text-white flex flex-col justify-around gap-[2rem] px-[2rem] py-[3rem] rounded-[1rem] w-[31%] text-center min-h-[23rem]">
            <h1> 50 G </h1>
            <p> Of GHG reduced with every bag purchased</p>
          </div>

          <div className="bg-my-orange text-white flex flex-col justify-around gap-[2rem] px-[2rem] py-[3rem] rounded-[1rem] w-[31%] text-center min-h-[23rem]">
            <h1> 1.5 KG </h1>
            <p> of food waste diverted from landfills by 2026</p>
          </div>

          <div className="bg-my-brown text-white flex flex-col justify-around gap-[2rem] px-[2rem] py-[3rem] rounded-[1rem] w-[31%] text-center min-h-[23rem]">
            <h1> 4.3 K</h1>
            <p> oranges saved from the trash by 2025</p>
          </div>
        </div>
      </section>

      <section className=" mx-[12.5rem]">
        <div className=" rounded-[1rem] w-[75vw] min-h-[70vh] max-h-[70vh] bg-my-beige p-[3rem] flex flex-row justify-between">
          <div className="flex flex-col min-h-[60vh] justify-around w-[50%] ">
            <div className="flex flex-col h-fit gap-[1.5rem] text-black">
              <h1>visit our in person sales</h1>
              <p>
                Find us at boothing events or local retail stores to explore our
                eco-friendly products and support a sustainable mission. Check
                out where we’ll be next!
              </p>
              <button className="w-fit text-my-green">
                <p>View Locations</p>
              </button>
            </div>
          </div>
          <div className=" max-w-[50%] overflow-hidden flex flex-row gap-[1rem] flex-wrap justify-center items-center">
            <img
              src="static/images/sales1.png"
              alt="Citrus Treats"
              className="h-[45%] w-[45%] object-cover rounded-[1rem]"
            ></img>

            <img
              src="static/images/sales2.png"
              alt="Citrus Treats"
              className="h-[45%] w-[45%] object-cover rounded-[1rem]"
            ></img>

            <img
              src="static/images/sales3.png"
              alt="Citrus Treats"
              className="h-[45%] w-[45%] object-cover rounded-[1rem]"
            ></img>

            <img
              src="static/images/sales4.png"
              alt="Citrus Treats"
              className="h-[45%] w-[45%] object-cover rounded-[1rem]"
            ></img>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
