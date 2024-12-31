"use client";

import React, { useState } from "react";
import Profile from "../../Components/Profile";
import { FaArrowRight } from "react-icons/fa";

const teamData = {
  sales: [
    {
      Name: "Darren Lau",
      Role: "Director of Business Development",
      Concentration: "SFU Beedie",
      Image: "static/images/Darren.png",
      LinkedIn: "https://www.linkedin.com/in/darrennlau/",
    },
    {
      Name: "Gailza Wijaya",
      Role: "VP Sales",
      Concentration: "SFU Beedie",
      Image: "static/images/Gailza.png",
      LinkedIn: "https://www.linkedin.com/in/gailzaaridinawijaya/",
    },
    {
      Name: "Michael Gudz",
      Role: "Sales Coordinator",
      Concentration: "SFU Beedie",
      Image: "static/images/Michael.png",
      LinkedIn: "https://www.linkedin.com/in/michael-gudz-4136812a7/",
    },
    {
      Name: "Raymond Shen",
      Role: "Sales Coordinator",
      Concentration: "UBC Engineering",
      Image: "static/images/RaymondHeadshot.jpeg",
      LinkedIn: "https://www.linkedin.com/in/rayleishen/",
    },
  ],
  marketing: [
    {
      Name: "Arianna Ha",
      Role: "VP Marketing",
      Concentration: "SFU Beedie",
      Image: "static/images/Arianna.png",
      LinkedIn: "https://www.linkedin.com/in/arianna-ha/",
    },
    {
      Name: "Brandon Sun",
      Role: "Front End Developer",
      Concentration: "SFU Beedie",
      Image: "static/images/Brandon.png",
      LinkedIn: "https://www.linkedin.com/in/brandnsun/",
    },
    {
      Name: "Caleb Wu",
      Role: "Front End Developer",
      Concentration: "SFU SIAT",
      Image: "static/images/caleb.png",
      LinkedIn: "https://www.linkedin.com/in/caleb-wu1",
    },
  ],
  operations: [
    {
      Name: "Naia Wong",
      Role: "Director of Operations",
      Concentration: "SFU Beedie",
      Image: "static/images/Naia.png",
      LinkedIn: "https://www.linkedin.com/in/naia-wong/",
    },
    {
      Name: "Jessica Tandibrata",
      Role: "Events Coordinator",
      Concentration: "SFU Beedie",
      Image: "static/images/Jessica.png",
      LinkedIn: "https://www.linkedin.com/in/jessicatandibrata/",
    },

    {
      Name: "Vinay Aery",
      Role: "Finance Coordinator",
      Concentration: "SFU Beedie",
      Image: "static/images/Vinay.png",
      LinkedIn: "https://www.linkedin.com/in/vinayaery/",
    },

    {
      Name: "Lucy Liu",
      Role: "Operations Coordinator",
      Concentration: "SFU Beedie",
      Image: "static/images/Lucy.png",
      LinkedIn: "https://www.linkedin.com/in/lucyliuu/",
    },
    {
      Name: "Justin Cheung",
      Role: "Chief Executive Officer",
      Concentration: "SFU Beedie",
      Image: "static/images/justinHeadshot.png",
      LinkedIn: "https://www.linkedin.com/in/justinacheung/",
    },
  ],
};

function Page() {
  const [selectImage, setSelectImage] = useState(
    <div className="flex lg:flex-row  min-w-[50v%] lg:min-w-fit flex-wrap justify-between w-[100%] lg:gap-[1rem] gap-[2.5vw]">
      {teamData.operations.map((member, index) => (
        <Profile key={index} {...member} />
      ))}
    </div>
  );

  const [selectedTeam, setSelectedTeam] = useState("operations");

  const handleImage = (teamType) => {
    setSelectedTeam(teamType);
    setSelectImage(
      <div className="flex lg:flex-row  min-w-[50v%] lg:min-w-fit flex-wrap justify-between w-[100%] lg:gap-[1rem] gap-[2.5vw]">
        {teamData[teamType].map((member, index) => (
          <Profile key={index} {...member} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-[100%] bg-[#FEF7E6] flex justify-center overflow-hidden">
      <div className="flex flex-col gap-[5vh] lg:gap-[15vh] min-h-fit border-5 text-center w-[90%]">
        <section>
          <h1> ABOUT US </h1>
          <h3 className="mt-[1%]"> Meet the team behind the dream</h3>
        </section>

        <section>
          <div className="flex justify-between flex-col  w-[100%] gap-[5%]">
            <div className="text-left max-w-full  flex flex-col justify-between ">
              {/* <div className="flex flex-col lg:gap-[1rem] gap-[1vh]">
                <p className="text-gray-600"> Aspiring Changemakers</p>
                <h1> MEET OUR TEAM </h1>
                <p className="">
                  {" "}
                  Our team is a group of passionate individuals committed to
                  delivering healthy and sustainable snacks. With diverse skills
                  and backgrounds, each member brings unique expertise and
                  dedication to the project. Together, we’re driven by a shared
                  vision to bring you an amazing treat. Get to know the people
                  behind our success!
                </p>
              </div> */}
              {/* <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfEeZn6Av1vFIMVT2B4yRBemiZWaskyFIAEft18ToZpxbA5bw/viewform?usp=sharing"
                className="flex lg:w-[50%] justify-between mt-[5%]"
              >
                <h3 className="h-[100%] flex flex-col justify-center text-gray-600">
                  Questions? Reach out
                </h3>
                <div className="flex flex-col justify-center p-[0.755rem] bg-[#0D6A3D] rounded-[0.25rem] text-white">
                  <FaArrowRight size="10px" />
                </div>
              </a> */}
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex lg:flex-nowrap md:flex-nowrap flex-wrap overflow-hidden justify-between min-w-fit min-h-fit w-[100%] lg:gap-[2%] md:gap-[2%] gap-[1vh] mb-[2%]">
                <button
                  onClick={() => handleImage("operations")}
                  className={`${
                    selectedTeam === "operations"
                      ? "bg-[#0d6a3d] text-white"
                      : ""
                  }`}
                >
                  <p>Operations</p>
                </button>
                <button
                  onClick={() => handleImage("sales")}
                  className={`${
                    selectedTeam === "sales" ? "bg-[#0d6a3d] text-white" : ""
                  }`}
                >
                  <p>Sales</p>
                </button>
                <button
                  onClick={() => handleImage("marketing")}
                  className={`${
                    selectedTeam === "marketing"
                      ? "bg-[#0d6a3d] text-white"
                      : ""
                  }`}
                >
                  <p>Marketing</p>
                </button>
              </div>

              <div> {selectImage} </div>
            </div>
          </div>
        </section>

        <section className="grid grid-rows-1 lg:grid-cols-2 gap-[5%]">
          <div className="text-left flex flex-col gap-[0.5rem]">
            <h1> WHAT IS SECOND SAVOUR </h1>
            <h3 className="lg:mt-[2rem] mt-[1rem] text-gray-600">
              {" "}
              Aspiring Changemakers{" "}
            </h3>
            <p>
              Second Savour was founded by a group of friends at Simon Fraser
              University (SFU) with a mission to create and sustainable
              environmental change.
            </p>
            <h3 className="lg:mt-0 md:mt-0 mt-[1rem] text-gray-600">
              {" "}
              What We Do{" "}
            </h3>
            <p>
              We aim to reduce supply chain waste by taking a unique approach,
              promoting the use of the whole promote, leaving no waste. We do
              not dare to dream about a better world, we dare to enact the
              change.{" "}
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfEeZn6Av1vFIMVT2B4yRBemiZWaskyFIAEft18ToZpxbA5bw/viewform?usp=sharing"
              className="flex lg:w-[50%] justify-between mt-[5%]"
              target="_blank"
            >
              <h3 className="h-[100%] flex flex-col justify-center text-gray-600 hover:text-[#0D6A3D] hover:cursor-pointer ease-in-out duration-300">
                Questions? Reach out
              </h3>
              <div className="flex flex-col justify-center p-[0.755rem] bg-[#0D6A3D] rounded-[0.25rem] text-white">
                <FaArrowRight size="10px" />
              </div>
            </a>
          </div>

          <div className="scale-[1] hover:scale-[1.1] ease-in-out duration-300">
            <image
              src={"static/images/team.png"}
              alt="the Second Savour Team at our first social"
            />
          </div>
        </section>

        <section className="p-0 overflow-hidden overflow-x-hidden">
          <div className="h-fit w-[100%] gap-[0.25rem] flex flex-row absolute m-0 left-0">
            <div className="">
              <image src={"static/images/scroll1.png"} alt="scroll1" />
            </div>
            <div className="">
              <image src={"static/images/scroll2.png"} alt="scroll2" />
            </div>
            <div className="">
              <image src={"static/images/scroll3.png"} alt="scroll3" />
            </div>
          </div>
          <div className="h-fit w-[100%] flex flex-row lg:flex-row opacity-0">
            <div className="">
              <image src={"static/images/scroll1.png"} alt="scroll1" />
            </div>
            <div className="">
              <image src={"static/images/scroll2.png"} alt="scroll2" />
            </div>
            <div className="">
              <image src={"static/images/scroll3.png"} alt="scroll3" />
            </div>
          </div>
          <div className="text-left flex flex-col lg:flex-row mt-[4%] gap-[2%]">
            <p className="mt-[1rem] lg:mt-0">
              {" "}
              <p className="mb-[1%] font-bold">Our Mission</p>We focus on
              reducing waste and promoting sustainability by utilizing surplus
              produce. By reducing the need for additional resources to create
              new food, we contribute to conserving energy, water, and soil
              health. Sustainability is more than a goal for us—it&apos;s the
              way we operate.
            </p>
            <p className="mt-[1rem] lg:mt-0">
              {" "}
              <p className="mb-[1%] font-bold">Team Bond</p>At Second Savour, we
              believe that a strong team is built on genuine connections and
              shared experiences. Our team socials are more than just events;
              they&apos;re a chance to bond, unwind, and celebrate our
              collective efforts. Join us, and become part of a family that
              values camaraderie as much as our mission to be sustainable.
            </p>
          </div>
        </section>

        <section className="text-left">
          <div className=" lg:w-[60%] flex flex-col gap-[1rem]">
            <p className="text-gray-600"> Aspiring Changemakers</p>
            <h1> THE VALUES THAT DRIVE US FORWARDS</h1>
          </div>

          <div className="flex lg:flex-row flex-col flex-wrap gap-[2vh] lg:gap-[1%] mt-[3%]">
            <div className="  h-fit lg:min-h-[50vh] flex-1 w-[100%] p-[2rem] rounded-[0.5rem] bg-[#F3892C] flex flex-col gap-[1rem]">
              <h2> Substainability </h2>
              <p>
                We create our vs using eco-friendly resources, offering
                sustainable food products.
              </p>
            </div>

            <div className="  h-fit lg:min-h-[50vh] flex-1 p-[2rem] rounded-[0.5rem] bg-[#0D6A3D] flex flex-col gap-[1rem]">
              <h2> Engagement </h2>
              <p>
                We aim to inspire and empower individuals to rethink food waste,
                motivating them to be part of the solution.
              </p>
            </div>
            <div className="  h-fit lg:min-h-[50vh] flex-1 p-[2rem] rounded-[0.5rem] bg-[#E7D9BF] flex flex-col gap-[1rem]">
              <h2> Repurpose </h2>
              <p>
                We repurpose surplus or unwanted produce into upcycled food
                products, reducing waste while raising awareness to address
                issues of hunger and inequality.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
