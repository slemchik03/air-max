"use client";

import searchIcon from "../../../public/icons/search-icon.svg";
import LinkBtn from "@/components/UI/Button/LinkBtn";
import { useClerk } from "@clerk/nextjs";
import { atom, useAtom } from "jotai";
import { BriefcaseIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

export const mobileMenuAtom = atom(false);

const routes = ["All", "Footwear", "Appereal", "Basketball", "Slides"];

interface Props {
  userImg: string;
  orderCount: number;
}

const MobileNav: FC<Props> = ({ orderCount, userImg }) => {
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useAtom(mobileMenuAtom);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const matchMedia = window.matchMedia("(min-width: 768px)");

    matchMedia.addEventListener("change", closeMenu);

    return () => {
      matchMedia.removeEventListener("change", closeMenu);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, translateX: "-100%" }}
      animate={{ opacity: isOpen ? 1 : 0, translateX: isOpen ? 0 : "-100%" }}
      className="absolute justify-center top-0 left-0 w-screen h-screen bg-white z-[1000001] py-10"
    >
      <div className="grid grid-flow-col justify-between items-center  px-10">
        <XMarkIcon
          onClick={closeMenu}
          className="h-[25px] w-[25px] md:w-[40px] md:h-[40px] cursor-pointer"
        />
        <div className="grid gap-3 grid-flow-col">
          <Image
            onClick={() => signOut()}
            className="cursor-pointer rounded-full"
            width={30}
            height={30}
            src={userImg}
            alt="avatar"
          />

          <Image src={searchIcon} className="cursor-pointer" alt="" />
          <Link href="/basket" className="relative cursor-pointer">
            <BriefcaseIcon className="w-6 h-6" />
            <div className="absolute text-center font-bold text-[10px] right-0 bottom-0 w-4 h-4 bg-black rounded-full text-white">
              {orderCount}
            </div>
          </Link>
        </div>
      </div>
      <div className="grid gap-5 justify-start px-10 py-10">
        {routes.map((route, idx) => (
          <LinkBtn
            onClick={closeMenu}
            type="black"
            text={route}
            key={idx}
            href={"#"}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNav;
