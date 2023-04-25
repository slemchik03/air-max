"use client";

import Image from "next/image";
import previewText from "../../public/images/preview-text.png";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../UI/Button/Button";
import usePreviewMotionValue from "@/utils/hooks/usePreviewMotionValue";
import { FC, useCallback, useState } from "react";

interface Props {
  goodsList: {title: string, image: string, background: string}[];
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
      className={`relative transition-all grid grid-rows-[5fr_1fr] bg-gradient-to-tl min-h-[91vh] duration-[1s]`}
      style={{background: activeBg}}
      onMouseMove={(e) => {
        motionVal.set(
          (e.clientX / e.currentTarget.offsetWidth +
            e.clientY / e.currentTarget.offsetHeight) *
            10
        );
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
      <div className="relative grid justify-center items-center z-[1000]">
        <motion.div
          initial={{ opacity: "0" }}
          animate={{ opacity: "1" }}
          transition={{ delay: 0.2, ease: "easeInOut" }}
          className="duration-[1.5s] w-full"
        >
          <Image src={previewText} alt="" />
        </motion.div>

        <motion.div
          style={{ scale: scaleVal }}
          className="absolute max-h-[380px] max-w-[350px] md:max-h-[550px] md:max-w-[580px] xl:max-w-[780px] xl:max-h-[750px] w-full h-full left-0 right-0 mx-auto"
        >
          <AnimatePresence>
            {activeBg === goodsList[activeIdx].background && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeInOut" }}
                className="duration-[0.1s]"
                exit={{ opacity: 0 }}
              >
                <Image
                  src={goodsList[activeIdx].image}
                  fill
                  className="object-contain"
                  alt=""
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="relative z-[1000] grid justify-center md:justify-end items-end pb-[80px] md:pr-[200px]">
        <Button type="white" text="BUY NOW" />
      </div>
      <motion.div
        style={{
          opacity: goodsList[activeIdx].background !== activeBg ? "1" : "0",
          background: goodsList[activeIdx].background
        }}
        transition={{ duration: "500ms" }}
        onTransitionEnd={() => setActiveBg(goodsList[activeIdx].background)}
        className={`transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-b`}
      ></motion.div>
    </div>
  );
};

export default Preview;
