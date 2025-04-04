import React from "react";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import Logo from "../public/static/images/Logo.png";

function Hyperlink({
  Text,
  Link,
  Color,
  HoverColor,
  Display,
  Download,
  Target,
  onClick,
  show,
}) {
  return (
    <div
      className={`group w-fit ${onClick || Link ? "hover:cursor-pointer" : ""}`}
    >
      <a
        href={Link}
        target={Target ? "_blank" : "_self"}
        rel="noopener noreferrer"
        download={Download}
        onClick={onClick ? onClick : null}
      >
        <h5
          className="ease-in-out duration-300 flex flex-row group-hover:text-[var(--hover-color)] whitespace-nowrap"
          style={{
            color: `var(${Color})`,
            "--hover-color": `var(${HoverColor})`,
          }}
        >
          {show === true ? (
            <Image
              src={Logo}
              alt="the Second Savour Team at our first social"
              width={1080}
              height={1080}
              className="max-w-fit h-[1rem] object-cover"
              priority
            />
          ) : (
            <div className="hidden"></div>
          )}

          {show === true ? <div className="h-0 w-0"> </div> : Text}

          <div
            className="flex flex-col justify-center"
            style={{
              display: Display, // Referenced from stack overflow, https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript
            }}
          >
            <MdArrowOutward />
          </div>
        </h5>
      </a>
      <div
        className="border-b-2 w-full translate-x-[-10%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ease-in-out duration-300 "
        style={{
          borderColor: `var(${HoverColor})`, // Use the CSS variable for border color
        }}
      ></div>
    </div>
  );
}

export default Hyperlink;
