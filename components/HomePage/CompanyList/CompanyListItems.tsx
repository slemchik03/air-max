import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CompanyListItems: FC = () => {
  return (
    <div className="flex justify-center mt-10 h-[150px]">
      {Array(4)
        .fill(null)
        .map((_, idx) => (
          <motion.div
            initial={{ opacity: 0, translateX: "-20%" }}
            whileInView={{ opacity: [0, 0.5, 1], translateX: "0" }}
            transition={{ delay: idx * 0.2 }}
            key={idx}
            className="relative flex-1 w-[100px] max-w-[180px] h-[60px] mx-10"
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

export default CompanyListItems;
