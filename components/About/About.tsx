"use client"

import Image from "next/image";
import Partcile1 from "../../public/images/about-particle-1.png";
import Partcile2 from "../../public/images/about-particle-2.png";
import Partcile3 from "../../public/images/about-particle-3.png";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div initial={{translateX: "-100%", opacity: 0}} whileInView={{translateX: "0", opacity: 1}} transition={{ ease: "easeInOut"}} className="pt-[82px] overflow-hidden font-monument text-[40px] md:text-[60px] xl:text-[100px] text-center">
      <div>
        <div className="block md:flex justify-center gap-2 items-center">
          <p>Not</p>
          <div className="relative rounded-full hidden md:block bg-black flex-1 h-[50px] xl:h-[80px] max-w-[170px] ">
            <Image
              width={300}
              height={250}
              src={Partcile1}
              alt=""
              className="absolute object-contain top-[-70px] xl:top-[-130px] xl:left-[-50px] xl:min-w-[300px] xl:min-h-[250px] animate-spin-slow"
            />
          </div>
          <p>Just For</p>
          <div className="relative rounded-full hidden md:block bg-[#FFB800] flex-1 h-[50px] xl:h-[80px] max-w-[170px]">
            <Image
              width={300}
              height={250}
              src={Partcile2}
              alt=""
              className="absolute object-contain top-[-50px] xl:top-[-130px] xl:left-[-50px] xl:min-w-[300px] xl:min-h-[250px] animate-spin-slow"
            />
          </div>
        </div>
        <div className="relative justify-center flex items-center">
          Street Anymore
          <div className="relative hidden md:block rounded-full bg-black flex-1 h-[50px] xl:h-[80px] max-w-[170px]">
            <Image
              width={300}
              height={250}
              src={Partcile3}
              alt=""
              className="absolute object-contain top-[-50px] xl:top-[-130px] xl:left-[-50px] xl:min-w-[300px] xl:min-h-[250px] animate-spin-slow"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
