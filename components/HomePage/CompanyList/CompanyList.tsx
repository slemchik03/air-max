"use client"

import { motion } from "framer-motion";
import Image from "next/image";

const CompanyList = () => {
  return (
    <div className="flex justify-center gap-[88px] mt-20">
      {Array(4)
        .fill(null)
        .map((_, idx) => (
          <motion.div
            initial={{opacity: 0, translateX: "-20%"}}
            whileInView={{opacity: [0, 0.5, 1], translateX: "0"}}
            transition={{delay: idx * 0.2}}
            key={idx}
            className="relative flex-1 max-w-[180px] h-[60px]"
          >
            <Image
              fill
              className="object-contain"
              src={`/images/parthners/parthner-${idx + 1}.png`}
              alt=""
            />
          </motion.div>
        ))}
    </div>
  );
};

export default CompanyList;
