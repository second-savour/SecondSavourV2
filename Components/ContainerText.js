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
    <section className=" mx-[12.5rem]">
      <div
        className={`rounded-[1rem] w-[75vw] min-h-[70vh] max-h-[70vh]  p-[3rem] flex flex-row justify-between
          `}
      >
        <div className="flex flex-col min-h-[60vh] justify-around w-[50%] ">
          <div className="flex flex-col h-fit gap-[1.5rem] text-white">
            <h1>{Header}</h1>
            <h2>{Subheader}</h2>
            <p>{Text}</p>
            <button className="w-fit text-my-green" href={clickTo}>
              <p>{ButtonText}</p>
            </button>
          </div>
        </div>
        <img src={Image} alt={altText} className="h-fit w-[42%]"></img>
      </div>
    </section>
  );
}

export default ContainerText;
