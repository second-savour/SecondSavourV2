import React from "react";
// import Image from "next/image"; //import the Image component from next
import { NextSeo } from "next-seo";

function page() {
  return (
    <div>
      <NextSeo
        title="Page Title"
        description="This is a detailed description of the page."
        canonical="https://example.com/page"
      />
      <h1> Content</h1>
    </div>
  );
}

export default page;

{
  /* <Image
src="/static/images/heroImage.png" // remember, src's MUST start with a /
alt="Background image of crates filled with colorful, fresh fruit at a lively market, showcasing natural abundance." //alt text describes what is in the image (for blind people)
loading="lazy" //loading style to optimize speed.
className="" //styles
width={1080} //base dimensions
height={1080} //base dimensions
/> */
}
