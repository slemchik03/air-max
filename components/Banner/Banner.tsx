"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const Banner = () => {
  return (
    <div className="grid mt-[160px]">
      <Marquee>
        {Array(10)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="flex justify-center items-center gap-1">
              <p className="font-monumentBold text-3xl font-bold">JUST DO IT</p>
              <Image
                width={80}
                height={40}
                src="/images/parthners/parthner-1.png"
                alt=""
              />
            </div>
          ))}
      </Marquee>
      <div className="bg-cover h-[90vh] bg-no-repeat bg-center bg-[url('/images/banner.png')]"></div>
    </div>
  );
};

export default Banner;
