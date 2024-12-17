import React from "react";

function Footer() {
  return (
    <div className="w-[90%] m-auto">
      <nav className="min-h-[15rem]">
        <div className="border-t-2 border-gray-600 py-[1%] mt-[8%]"></div>

        <div className="flex flex-grow md:flex-grow lg:flex-row gap-[5vw] lg:gap-[5%]">
          <div className="flex flex-col gap-[0.5rem]">
            <h3 className="text-gray-600">Company</h3>
            <div className="flex flex-col gap-[0.2rem]">
              <a href="/about">
                <h3> About Us</h3>
              </a>
              {/* <a href='/blog'><h3> Our Blog</h3> </a> */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfEeZn6Av1vFIMVT2B4yRBemiZWaskyFIAEft18ToZpxbA5bw/viewform?usp=sharing"
                target="_blank"
              >
                <h3> Contact Us</h3>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <h3 className="text-gray-600">Socials</h3>
            <div className="flex flex-col gap-[0.2rem]">
              <a href="https://www.instagram.com/second.savour/">
                <h3> Instagram</h3>{" "}
              </a>
              <a href="https://www.tiktok.com/@second.savour">
                <h3> TikTok</h3>
              </a>
              <a href="https://www.linkedin.com/company/second-savour">
                <h3> Linkedin</h3>{" "}
              </a>
            </div>
          </div>

          {/* <div className="flex flex-col gap-[0.5rem]">
            <h3 className="text-gray-600">Other</h3>
            <div className="flex flex-col gap-[0.2rem]">
              <a href="/about">
                <h3> Privacy Policy</h3>
              </a>
              <a href="/blog">
                <h3> Terms of Service</h3>{" "}
              </a>
            </div>
          </div> */}

          <div className="text-gray-600 lg:text-right text-center hidden lg:block lg:absolute lg:right-[5%]">
            <h3> Website Built and Designed</h3>
            <h3> By The Second Savour Team </h3>
          </div>
        </div>
      </nav>

      <h3> Savour the Flavour </h3>
      <h1> Second Savour </h1>
    </div>
  );
}

export default Footer;
