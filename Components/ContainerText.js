import React from "react";
import Image from "next/image";
import Link from "next/link";

function ContainerText({
  Header,
  Subheader,
  Text,
  ButtonText,
  clickTo,
  img,
  altText,
}) {
  return (
    <section className="lg:mx-[10rem] mx-[2rem] bg-my-green rounded-[1rem] ">
      <div
        className={`rounded-[1rem] w-[75vw] lg:min-h-[70vh] lg:max-h-[70vh]  lg:p-[3rem] px-[1rem] py-[2rem] flex flex-col-reverse lg:flex-row justify-between
          `}
      >
        <div className="flex flex-col lg:min-h-[60vh] justify-around w-full lg:w-[50%] ">
          <div className="flex flex-col h-fit gap-[1.5rem] text-white">
            <h1 className="">{Header}</h1>
            <h2 className="">{Subheader}</h2>
            <p>{Text}</p>
            <Link href={clickTo} className="w-fit">
              <button className="lg:w-fit text-my-green bg-my-beige w-full p-[1em] px-[2em] rounded-full mt-[2rem]">
                <p className="font-bold">{ButtonText}</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center lg:w-[42%] w-full">
          <Image
            src={img}
            alt={altText}
            className="h-fit w-full object-contain"
            width={1080}
            height={1080}
          />
        </div>
      </div>
    </section>
  );
}

export default ContainerText;
