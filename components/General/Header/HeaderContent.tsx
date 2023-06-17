"use client";

import { FC, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import NavBar from "../NavBar/NavBar";
import MobileNav, { mobileMenuAtom } from "../MobileNav/MobileNav";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Logo from "../../../public/images/parthners/parthner-1.png";
import Link from "next/link";
import { NavLinkItem } from "./Header";

interface Props {
  navLinks: NavLinkItem[];
  userImg: string;
  orderCount: number;
}

const HeaderContent: FC<Props> = (props) => {
  const { scrollY } = useScroll();
  const [isHide, setIsHide] = useState(false);
  const isMobileMenuOpen = useAtomValue(mobileMenuAtom);

  useEffect(() => {
    scrollY.onChange((v) => {
      setIsHide(v > scrollY.getPrevious() && v > 450 && !isMobileMenuOpen);
    });
    return () => {
      scrollY.destroy();
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.div
      animate={{
        scale: isHide ? 0 : 1,
        opacity: isHide ? 0.2 : 1,
        translateY: isHide ? "-100%" : 0,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="sticky grid items-center top-0 left-0 bg-white px-[25px] md:px-[35px] xl:px-[85px] py-[30px] grid-cols-[0px 1fr 90px] grid-flow-col shadow-2xl z-[10001]"
    >
      <Link href="/">
        <Image
          width={65}
          height={65}
          className="cursor-pointer"
          src={Logo}
          alt="Logo"
        />
      </Link>
      <MobileNav {...props} />
      <NavBar {...props} />
    </motion.div>
  );
};

export default HeaderContent;
