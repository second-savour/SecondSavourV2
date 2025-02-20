import React from "react";
import ProductCard from "../../Components/LandingPage";

function Page() {
  const products = [
    {
      title: "Citrus Treats",
      flavour: "Orange",
      img: "/static/images/stand-up-pouch.png",
      bgColor: "#F7941D",
    },
    {
      title: "Citrus Treats",
      flavour: "L***",
      img: "/static/images/stand-up-pouch.png",
      bgColor: "#015A2E",
    },
    {
      title: "Citrus Treats",
      flavour: "L****",
      img: "/static/images/stand-up-pouch.png",
      bgColor: "#FFCA41",
    },
    {
      title: "Citrus Treats",
      flavour: "G*********",
      img: "/static/images/stand-up-pouch.png",
      bgColor: "#F35255",
    },
  ];

  return (
    <div className="w-full bg-[#FEF7E6] flex justify-center py-8">
      <div className="w-[98%] max-w-[1400px] flex flex-col">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold uppercase">OUR PRODUCT</h1>
          <h3 className="mt-2 text-lg text-gray-700">
            Second Savour crafts sustainable, delicious candy by upcycling
            fruits.
          </h3>
        </div>
        <div>
          <h2 className="text-left text-3xl font-bold uppercase mb-8">
            OUR TREATS
          </h2>

          <div className="grid grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            <div className="flex justify-center">
              <ProductCard {...products[0]} />
            </div>
            <div className="flex justify-center">
              <ProductCard {...products[1]} />
            </div>
            <div className="flex justify-center">
              <ProductCard {...products[2]} />
            </div>

            <div className="flex justify-center">
              <ProductCard {...products[3]} />
            </div>
            <div className="flex justify-center"></div>
            <div className="flex justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
