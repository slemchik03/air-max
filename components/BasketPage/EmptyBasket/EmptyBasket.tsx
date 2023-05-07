import Button from "@/components/UI/Button/Button";
import { motion } from "framer-motion";
import Link from "next/link";

const EmptyBasket = () => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: "200px" }}
      animate={{ opacity: 1, translateY: 0 }}
      className="grid justify-center items-center text-center min-h-screen"
    >
      <div className="grid gap-10">
        <h3 className="font-monumentBold text-5xl">You dont have any item!</h3>
        <Link href="/" className="grid justify-center">
          <Button type="gray" text="Continue shopping" />
        </Link>
      </div>
    </motion.div>
  );
};

export default EmptyBasket;
