import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  idx: number;
}

const CompanyListItem: FC<Props> = ({ idx }) => {
  return (
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
  );
};

export default CompanyListItem;
