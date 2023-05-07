"use client";

import Image from "next/image";
import previewText from "../../../public/images/preview-text.png";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../UI/Button/Button";
import usePreviewMotionValue from "@/utils/hooks/usePreviewMotionValue";
import { FC, useCallback, useState } from "react";
import Link from "next/link";

export interface PreviewGoodItem {
  title: string;
  image: string;
  slug: string;
  background: string;
}

interface Props {
  goodsList: PreviewGoodItem[];
}

const Preview: FC<Props> = ({ goodsList }) => {
  const [activeBg, setActiveBg] = useState(goodsList[0].background);
  const [activeIdx, setActiveIdx] = useState(0);
  const { scaleVal, motionVal } = usePreviewMotionValue();

  const changeActiveIdx = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  return (
    <div
      className={`relative transition-all grid grid-rows-[5fr_1fr] bg-gradient-from-l bg-gradient-to-t min-h-[91vh] duration-[1s]`}
      style={{ background: activeBg }}
      onMouseMove={(e) => {
        motionVal.set(e.clientX / 90);
      }}
    >
      <div className="absolute z-[1001] left-[30px] top-[40%] grid grid-flow-row gap-6">
        {goodsList.map((_, idx) => (
          <div
            key={idx}
            onClick={() => changeActiveIdx(idx)}
            className="relative w-[10px] h-[10px] p-3 rounded-full bg-transparent border-[white] border-2 cursor-pointer"
          >
            {idx === activeIdx && (
              <div className="absolute left-0 right-0 top-0 bottom-0 m-auto  w-1 h-1 p-1 rounded-full bg-white"></div>
            )}
          </div>
        ))}
      </div>
      <div className="relative grid justify-center items-center z-[1000] overflow-x-hidden">
        <AnimatePresence>
          {goodsList[activeIdx].background === activeBg && (
            <motion.div
              initial={{ opacity: "0", translateX: "-100%" }}
              animate={{ opacity: "1", translateX: 0 }}
              transition={{  ease: "easeInOut" }}
              exit={{translateX: "100%", opacity: 0}}
              className="duration-[500ms] w-full"
            >
              <Image src={previewText} alt="" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ scale: scaleVal }}
          className="absolute max-h-[380px] max-w-[350px] md:max-h-[550px] md:max-w-[580px] xl:max-w-[780px] xl:max-h-[750px] w-full h-full left-0 right-0 mx-auto"
        >
          <AnimatePresence>
            {goodsList[activeIdx].background === activeBg && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeInOut" }}
                className="duration-500"
              >
                <Image
                  src={goodsList[activeIdx].image}
                  fill
                  className="object-contain z-50"
                  alt=""
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Link
        href={"/shoe/" + goodsList[activeIdx].slug}
        className="relative z-[1000] grid justify-center md:justify-end items-end pb-[80px] md:pr-[200px]"
      >
        <Button type="white" text="BUY NOW" />
      </Link>
      <motion.div
        style={{
          opacity: goodsList[activeIdx].background !== activeBg ? "1" : "0",
          background: goodsList[activeIdx].background,
        }}
        transition={{ ease: "backInOut", easings: ["easeIn", "linear"] }}
        onTransitionEnd={() => setActiveBg(goodsList[activeIdx].background)}
        className={`transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-t`}
      ></motion.div>
    </div>
  );
};

export default Preview;
