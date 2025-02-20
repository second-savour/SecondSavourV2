import React from "react";
import Image from "next/image";

function ProductCard({ title, flavour, img, bgColor }) {
  return (
    <div
      className="w-full max-w-[350px] rounded-lg overflow-hidden bg-transparent"
      style={{ border: `4px solid ${bgColor}` }}
    >

      <div
        className="h-[180px] relative flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <div className="w-[220px] relative flex items-center justify-center">
          <Image
            src={img}
            alt={title}
            width={180}
            height={180}
            className="object-contain"
          />
        </div>
      </div>

      {/* Product information */}
      <div className="px-3 pt-6 pb-4 text-center bg-transparent">
        <h3 className="text-xl font-bold uppercase">{title}</h3>
        <p className="text-gray-600 mt-1">{flavour}</p>
      </div>

      {/* Action buttons */}
      <div className="p-3 flex flex-col gap-3 bg-transparent">
        <button className="bg-[#015A2E] text-white py-3 rounded-md hover:bg-green-700 font-medium text-sm uppercase tracking-wider">
          VIEW PRODUCT
        </button>
        <button className="bg-[#E7ECF3] text-black py-3 rounded-md hover:bg-gray-300 font-medium text-sm uppercase tracking-wider">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
