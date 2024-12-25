import React from "react";
import Button from "../../Components/Button.js";
import ContainerText from "../../Components/ContainerText.js";

function page() {
  return (
    <div className="flex flex-col gap-[10rem] ">
      {/* <section className=" w-[100vw] max-h-[100vh] mt-[-19vh] object-cover relative overflow-hidden">
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
      </section> */}

      <ContainerText
        Header="Citrus Treats"
        Subheader="$6.99 Per Package"
        Text="     Snack with a Purpose – Indulge in sweet and tangy goodness while
              making an eco-friendly choice. Our nutritious hand-crafted citrus
              delicacies are made from rescued oranges, offering you a
              sustainable and delicious option."
        ButtonText="Check it out!"
        altText="A bag of citus treats"
        Image="static/images/Citrus Treats Image.png"
        clickTo="/shop"
      ></ContainerText>

      <section className="lg:mx-[10rem] mx-[2rem] flex flex-col gap-[0.5rem] lg:gap-[2rem] ">
        <h1> Our Milestones </h1>
        <div className="flex lg:flex-row flex-col justify-between w-[full] gap-[1rem]">
          <div className="bg-my-green text-white flex lg:flex-col flex-row justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-[23rem]">
            <h1 className="whitespace-nowrap"> 50 G </h1>
            <p> Of GHG reduced with every bag purchased</p>
          </div>

          <div className="bg-my-orange text-white flex lg:flex-col flex-row justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-[23rem]">
            <h1 className="whitespace-nowrap"> 1.5 KG </h1>
            <p> of food waste diverted from landfills by 2026</p>
          </div>

          <div className="bg-my-brown text-white flex lg:flex-col flex-row justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-[23rem]">
            <h1 className="whitespace-nowrap"> 4.3 K</h1>
            <p> oranges saved from the trash by 2025</p>
          </div>
        </div>
      </section>

      <section className=" lg:mx-[10rem] mx-[2rem]">
        <div className=" rounded-[1rem] w-[full] min-h-[70vh] max-h-[70vh] bg-my-beige p-[3rem] flex flex-row justify-between">
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

      <section className="lg:mx-[10rem] mx-[2rem] relative ">
        <h1>ORDER ONLINE</h1>
        <div className="flex flex-row gap-[5vw]">
          <div>
            <img
              src="static/images/mascot.png"
              alt="Second Savour Mascot"
              className=""
            />
          </div>
          <div className="bg-yellow-400 rounded-[1rem] p-[2rem] max-w-[70%]">
            <p className="">
              At Second Savour, we're expanding our sustainability initiatives
              to engage people outside of our communities. Join us in making a
              positive impact on our planet!
            </p>
            <button className="w-fit bg-my-green text-[#e7d9bf] px-6 py-2 rounded-[0.5rem] mt-4">
              <p>Shop Now</p>
            </button>
          </div>
        </div>
      </section>

      <section className=" lg:mx-[10rem] mx-[2rem]">
        <div className=" rounded-[1rem] w-[full] min-h-[70vh] max-h-[70vh] bg-my-#e7d9bf p-[3rem] flex flex-row justify-between items-start">
          <div className="flex flex-col min-h-[60vh] justify-between w-[50%] ">
            <div className="flex flex-col h-fit gap-[1.5rem] text-black">
              <h2>
                INTERESTED IN HAVING<br></br> SECOND SAVOUR IN<br></br> YOUR
                STORE?
              </h2>
              <p>
                Reach out to us at{" "}
                <span className="font-bold">sales@secondsavour.ca</span>
              </p>
              <button className="w-fit bg-my-green text-[#e7d9bf]">
                <p>Partner with us!</p>
              </button>
            </div>
          </div>
          <img
            src="static/images/SSonShelf.png"
            alt="Citrus Treats In Store"
            className="object-contain max-h-[60vh]"
          ></img>
        </div>
      </section>

      <section className=" lg:mx-[10rem] mx-[2rem]">
        <div
          className="relative rounded-[1rem] w-[full] min-h-[70vh] max-h-[70vh] p-[3rem] flex flex-row justify-between bg-cover bg-center"
          style={{ backgroundImage: "url(/static/images/OurStory.png)" }}
        >
          <div className="flex flex-col h-fit gap-[1.5rem] text-black">
            <h1 className="font-bold">
              TURNING EXCESS <br></br>INTO EXCELLENCE
            </h1>
            <p>
              Second Savour was founded by a group of friends at <br></br>Simon
              Fraser University (SFU) in Burnaby, BC, with a<br></br> mission to
              create environmental change.
            </p>
            <button className="w-fit bg-my-green text-[#e7d9bf]">
              <p>Our Story</p>
            </button>
            <img
              src="static/images/SS Sticker.png"
              alt="Sticker"
              className="absolute top-[-5px] right-[1px] w-[100px]"
            />
          </div>
        </div>
      </section>

      <section className="mt-[-1.5rem]">
        <div className="w-[60%] mx-auto flex flex-col items-center text-center gap-[1rem]">
          <h1 className="font-bold text-6xl leading-tight">
            JOIN THE MOVEMENT
          </h1>
          <p className="text-xl text-gray-700">
            See what people are saying about our product
          </p>
        </div>
      </section>

      {/* <section className="mt-[-1.5rem]">
        <h1> JOIN THE MOVEMENT </h1>
        <div className="flex flex-row justify-between w-[full] border-2 border-black">

          <div className="bg-my-green text-white flex flex-col justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-[23rem]">
            <h1> 50 G </h1>
            <p> Of GHG reduced with every bag purchased</p>
          </div>

          <div className="bg-my-green text-white flex flex-col justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-[23rem]">
            <h1> 1.5 KG </h1>
            <p> of food waste diverted from landfills by 2026</p>
          </div>

          <div className="bg-my-green text-white flex flex-col justify-around gap-[0.5rem] lg:gap-[2rem] px-[1rem] py-[1.5rem] lg:px-[2rem] lg:py-[3rem] rounded-[0.5rem] lg:rounded-[1rem] lg:w-[31%] text-center min-h-fit lg:min-h-[23rem]">
            <h1> 4.3 K</h1>
            <p> oranges saved from the trash by 2025</p>
          </div>
        </div>
      </section>  */}
    </div>
  );
}

export default page;


// Use percentage instead of px or rem
// Change to lg: for mobile