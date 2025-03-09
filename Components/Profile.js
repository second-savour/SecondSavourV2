import React from "react";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

function Profile({ Name, Role, imgSrc, LinkedIn, Instagram }) {
  return (
    <div className="group basis-[20vh] md:basis-[10vw] lg:basis-[10rem] flex-grow-1 flex flex-col overflow-hidden w-full rounded-[0.5rem] flex-1 lg:h-fit max-h-[60vh] min-w-0 lg:max-w-[50%] ease-in-out duration-300">
      {/* Image Container */}
      <div className="relative rounded-[0.5rem] w-full aspect-[4/5] overflow-hidden">
        <Image
          src={imgSrc}
          alt={`${Name} - ${Role} at Second Savour`}
          width={1080}
          height={1080}
          className="rounded-[1rem] w-full h-auto min-h-full object-cover"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end w-full h-full p-2 bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-left text-white">
            <h3 className="text-base font-semibold">{Name}</h3>{" "}
            {/* Slightly smaller text */}
            <p className="font-thin mt-1 text-sm">{Role}</p>{" "}
            {/* Reduced margin */}
            {/* Social Icons */}
            <div className="flex gap-3 mt-3">
              {" "}
              {/* Reduced spacing */}
              {LinkedIn && (
                <a href={LinkedIn} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="hover:cursor-pointer hover:brightness-50 ease-in-out duration-300" />
                </a>
              )}
              {Instagram && (
                <a href={Instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="hover:cursor-pointer hover:brightness-50 ease-in-out duration-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
