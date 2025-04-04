"use client";
import React from "react";
import Image from "next/image";
import AboutProfile from "../../Components/aboutProfile";

function page() {
  return (
    <div className="flex flex-col lg:gap-[200px] lg:mt-[6vh] mt-[12vh] md:gap-[120px] gap-[60px]">
      <section>
        <div className=" w-full flex flex-col items-center ">
          <h1> About Us </h1>
          <p> Meet the team behind the dream</p>
        </div>
      </section>

      <section className="flex flex-col lg:mt-[-16vh] lg:gap-[60px] gap-[20px] lg:mx-[120px] md:mx-[40px] mx-[20px]">
        <div className=" w-full h-fit justify-center flex flex-row">
          {" "}
          <Image
            src={"/static/images/newTeam.png"}
            alt="the Second Savour Team at our first social"
            width={1080}
            height={1080}
            className="rounded-[1rem] w-full h-full object-contain"
            priority
          />
        </div>
        <div className="w-full h-fit flex lg:flex-row flex-col justify-end gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-black font-semibold">Aspiring Changemakers</p>
            <p>
              {" "}
              Second Savour was founded by a group of friends at Simon Fraser
              University (SFU) with a mission to create and foster sustainable
              environmental change
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-black font-semibold ">What We Do</p>
            <p>
              {" "}
              We aim to reduce supply chain waste by taking a unique approach,
              promoting the use of the whole promote, leaving no waste. We do
              not dare to dream about a better world, we dare to enact the
              change.
            </p>
          </div>
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfEeZn6Av1vFIMVT2B4yRBemiZWaskyFIAEft18ToZpxbA5bw/viewform?usp=sharing"
          target="_blank"
        >
          <button className="text-white px-[40px] max-w-fit bg-my-green">
            Contact Us
          </button>
        </a>
      </section>

      <section className="flex flex-col gap-[60px] lg:mx-[120px] md:mx-[40px] mx-[20px]">
        <h1> About our departments </h1>
        <div className="flex flex-row gap-[30px] overflow-auto overscroll-auto">
          <div className="flex flex-col justify-around lg:w-fit md:w-fit lg:min-w-[10vw] md:min-w-[10vw] min-w-[80vw]">
            <Image
              src={"/static/images/newOperations.png"}
              alt="the Second Savour Team at our first social"
              width={1080}
              height={1080}
              className=" w-full h-full  object-cover rounded-t-[20px]"
              priority
            />
            <div className="w-full h-[20rem] bg-my-green rounded-b-[20px]">
              <div className="flex flex-col lg:gap-[20px] gap-[40px] lg:m-[20px] m-[20px] mb-[30px] lg:mt-[0px] pt-[20px] min-h-[15rem]">
                <h2 className="text-[50px] text-center text-white">
                  {" "}
                  Operations
                </h2>
                <p className="text-white">
                  The backbone of Second Savour, our Operations team ensures
                  smooth production and logistics. From sourcing imperfect
                  produce to overseeing kitchen operations, they make sure our
                  products reach customers efficiently and sustainably.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-around lg:w-fit md:w-fit lg:min-w-[10vw] md:min-w-[10vw] min-w-[80vw]">
            <Image
              src={"/static/images/newSales.png"}
              alt="the Second Savour Team at our first social"
              width={1080}
              height={1080}
              className=" w-full h-full object-cover rounded-t-[20px]"
              priority
            />
            <div className="w-full h-[20rem] bg-my-orange rounded-b-[20px]">
              <div className="flex flex-col lg:gap-[20px] gap-[40px] lg:m-[20px] m-[20px] mb-[30px] lg:mt-[0px] pt-[20px] min-h-[15rem]">
                <h2 className="text-[50px] text-white text-center"> Sales</h2>
                <p className="text-white">
                  Our Sales team connects Second Savour with the community,
                  ensuring our product reaches as many people as possible. They
                  build relationships with customers and partners while
                  expanding our presence in markets, retail, and beyond.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-around lg:w-fit md:w-fit lg:min-w-[10vw] md:min-w-[10vw] min-w-[80vw]">
            <Image
              src={"/static/images/newMarketing.png"}
              alt="the Second Savour Team at our first social"
              width={1080}
              height={1080}
              className=" w-full h-full object-cover rounded-t-[20px]"
              priority
            />
            <div className="w-full h-[20rem] bg-[#FFCA41] rounded-b-[20px]">
              <div className="flex flex-col lg:gap-[20px] gap-[40px] lg:m-[20px] m-[20px] mb-[30px] lg:mt-[0px] pt-[20px] min-h-[15rem]">
                <h2 className="text-[50px] text-white text-center">
                  {" "}
                  Marketing
                </h2>
                <p className="text-white">
                  The storytellers of Second Savour, our Marketing team spreads
                  awareness about food waste and our mission. Through creative
                  campaigns, social media, and branding, they engage our
                  audience and inspire change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[60px] lg:mx-[120px] md:mx-[40px] mx-[20px]">
        <h1> The values the drive us forward </h1>
        <div className="flex lg:flex-row-reverse flex-col gap-[40px]">
          <div className="lg:w-[70%] w-[100%] h-full">
            <Image
              src={"/static/images/newExec.png"}
              alt="the Second Savour Team at our first social"
              width={1080}
              height={1080}
              className=" w-full h-full max-h-[70vh] object-cover rounded-[20px]"
              priority
            />
          </div>
          <div className="flex flex-col lg:gap-[40px] gap-[20px] lg:w-[30%] w-[100%] h-full">
            <div className="flex flex-col lg:gap-[20px] gap-[10px]">
              <h2 className="text-my-green lg:text-[50px] md:text-[30px] text-[20px]">
                Sustainability
              </h2>
              <p>
                We create our products using eco-friendly resources, offering
                sustainable food products.
              </p>
            </div>
            <div className="flex flex-col lg:gap-[20px] gap-[10px]">
              <h2 className="text-my-green lg:text-[50px] md:text-[30px] text-[20px]">
                Engagement
              </h2>
              <p>
                We aim to inspire and empower individuals to rethink food waste,
                motivating them to be part of the solution.
              </p>
            </div>
            <div className="flex flex-col lg:gap-[20px] gap-[10px]">
              <h2 className="text-my-green lg:text-[50px] md:text-[30px] text-[20px]">
                Repurpose
              </h2>
              <p>
                We repurpose surplus or unwanted produce into upcycled food
                products, reducing waste while raising awareness to address
                issues of hunger and inequality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[60px] lg:mx-[120px] md:mx-[40px] mx-[20px]">
        <h1 className="lg:w-[70%] w-[100%]">
          {" "}
          Who is the team behind second savour?
        </h1>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-row gap-[15px] h-fit lg:justify-center items-center justify-items-center w-full lg:overscroll-contain overscroll-auto lg:overflow-hidden overflow-auto lg:flex-wrap">
            <AboutProfile
              Profile="/static/images/newJustin.png"
              Name="Justin Cheung"
              Role="Chief Executive Officer"
              Linkedin="https://www.linkedin.com/in/justinacheung/"
            />

            <AboutProfile
              Profile="/static/images/newNaia.png"
              Name="Naia Wong"
              Role="Director of Operations"
              Linkedin="https://www.linkedin.com/in/naia-wong/"
            />

            <AboutProfile
              Profile="/static/images/newGailza.png"
              Name="Gailza Wijaya"
              Role="VP Sales"
              Linkedin="https://www.linkedin.com/in/gailzaaridinawijaya/"
            />

            <AboutProfile
              Profile="/static/images/newDarren.png"
              Name="Darren Lau"
              Role="Director of Business Development"
              Linkedin="https://www.linkedin.com/in/darrennlau/"
            />

            <AboutProfile
              Profile="/static/images/newArianna.png"
              Name="Arianna Ha"
              Role="VP Marketing"
              Linkedin="https://www.linkedin.com/in/arianna-ha/"
            />

            <AboutProfile
              Profile="/static/images/newBrandon.png"
              Name="Brandon Sun "
              Role="Sales Lead"
              Linkedin="https://www.linkedin.com/in/brandnsun/"
            />

            <AboutProfile
              Profile="/static/images/newVinay.png"
              Name="Vinay Aery"
              Role="Finance Coordinator"
              Linkedin="https://www.linkedin.com/in/vinayaery/"
            />
            <AboutProfile
              Profile="/static/images/newMichael.png"
              Name="Michael Gudz"
              Role="Sales Coordinator"
              Linkedin="https://www.linkedin.com/in/michaelgudz123/"
            />

            <AboutProfile
              Profile="/static/images/newJessica.png"
              Name="Jessica Tandibrata"
              Role="Events Coordinator"
              Linkedin="https://www.linkedin.com/in/jessicatandibrata/"
            />

            <AboutProfile
              Profile="/static/images/newLucy.png"
              Name="Lucy Liu"
              Role="Operations Coordinator"
              Linkedin="https://www.linkedin.com/in/lucyliuu/"
            />

            <AboutProfile
              Profile="/static/images/newFaith.png"
              Name="Faith Leung"
              Role="Marketing Coordinator"
              Linkedin="https://www.linkedin.com/in/faith-leung-/"
            />

            <AboutProfile
              Profile="/static/images/newRebecca.png"
              Name="Rebecca Yeung"
              Role="Marketing Coordinator"
              Linkedin="https://www.linkedin.com/in/rebecca-yeung-9bb11a316/"
            />

            <AboutProfile
              Profile="/static/images/newCaleb.png"
              Name="Caleb Wu"
              Role="Front End Developer"
              Linkedin="https://www.linkedin.com/in/caleb-wu-/"
            />

            <AboutProfile
              Profile="/static/images/newRaymond.png"
              Name="Raymond Shen"
              Role="Backend Coordinator"
              Linkedin="https://www.linkedin.com/in/rayleishen/"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
