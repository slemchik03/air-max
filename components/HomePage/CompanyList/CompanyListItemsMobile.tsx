import Image from "next/image";
import { motion } from "framer-motion";
import { FC } from "react";
import Marquee from "react-fast-marquee";

const CompanyListItemsMobile: FC = () => {
  return (
    <div className="flex justify-center h-[60px] mt-10">
      <Marquee className="absolute max-w-[500px] top-0 left-0">
        {Array(4)
          .fill(null)
          .map((_, idx) => (
            <motion.div
              initial={{ opacity: 0, translateX: "-20%" }}
              whileInView={{ opacity: [0, 0.5, 1], translateX: "0" }}
              transition={{ delay: idx * 0.2 }}
              key={idx}
              className="w-[100px] max-w-[180px] h-[60px] mx-10"
            >
              <Image
                fill
                className="object-contain"
                src={`/images/parthners/parthner-${idx + 1}.png`}
                alt=""
              />
            </motion.div>
          ))}
      </Marquee>
    </div>
  );
};

export default CompanyListItemsMobile;
