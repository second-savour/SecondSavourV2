import React from "react";
import Container from "../../Components/Container.js";
import Segment from "../../Components/Segment.js";

function page() {
  return (
    <>
      <div className="w-[100%] bg-[#FEF7E6] flex justify-center">
        <div className="flex flex-col gap-[3vh] lg:gap-[10vh] min-h-fit border-orange-400 border-5 text-center  w-[90%]">
          <div className="sm:mt-[5vh]">
            <h1> OUR PRODUCTS </h1>
            <h3 className="mt-[1%]">
              Second Savour crafts sustainable, delicious candy by upcycling
              fruits
            </h3>
          </div>
          <div className="flex  gap-[3vh] lg:flex-row flex-col width-50%] mb-[3vh]">
            <Container
              Title="Citrus Treats"
              Description="Our delicious Citrus Treats are made from the finest ingredients. They are perfect for any occasion and are sure to be a hit with your friends and family."
              img={"/static/images/Stand-Up Pouch Bag Mockup label.png"}
              BGColor={"#E7D9BF"}
              ButtonText={"View Product"}
              clickTo={"/citrusTreat"}
              imageClass={"w-[40%] h-auto"}
            />
            <Container
              Title="Coming Soon"
              Description="Stay tuned! We’re working hard to expand our product line outside of Citrus Treats."
              img={"/static/images/boxes.png"}
              BGColor={"#0D6A3D"}
              ButtonText={"Stay Updated!"}
              clickTo={"/shop"}
            />
          </div>

          <Segment
            Title={"Visit our In Person Sales"}
            Header={"Visit Us In Person"}
            Text={
              "We create our product using eco-friendly resources, offering sustainable food products."
            }
            ButtonText={"View Locations"}
            img={"/static/images/boothing.png"}
            clickTo={"/map"}
          />
        </div>
      </div>
    </>
  );
}

export default page;
