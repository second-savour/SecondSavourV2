import React from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

function aboutProfile({ Name, Linkedin, Role, Profile }) {
  return (
    <div className=" bg-black lg:min-w-[20vw] lg:max-w-[20vw] md:min-w-[20vw] min-w-[50vw] lg:h-[40vh] md:h-[20vh] h-[60vh] rounded-[20px] relative lg:flex-1 md:flex-1">
      <Image
        src={Profile}
        alt="the Second Savour Team at our first social"
        width={1080}
        height={1080}
        className="  w-full h-full object-cover rounded-[20px] absolute brightness-90"
        priority
      />
      <div className=" absolute flex flex-col h-full w-full justify-end mx-[20px] pb-[20px] z-[20]">
        <h5 className="text-[20px] text-white font-poppins">{Name}</h5>
        <h6 className="text-16px] text-white font-poppins">{Role}</h6>
        <a target="_blank" href={Linkedin}>
          <FaLinkedin className="text-white" />
        </a>
      </div>
    </div>
  );
}

export default aboutProfile;
