import React from "react";

function ContainerText({
  Header,
  Subheader,
  Text,
  ButtonText,
  clickTo,
  Image,
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
            <h2 className="lg:text-4xl text-xl">{Subheader}</h2>
            <p>{Text}</p>
            <a className="w-fit" href={clickTo}>
              <button className="lg:w-fit text-my-green bg-my-beige w-full p-[1rem] px-[2rem]">
                <p className="font-bold">{ButtonText}</p>
              </button>
            </a>
          </div>
        </div>
        <img
          src={Image}
          alt={altText}
          className="h-fit w-full lg:w-[42%]"
        ></img>
      </div>
    </section>
  );
}

export default ContainerText;
