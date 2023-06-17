"use client";

import searchIcon from "../../../public/icons/search-icon.svg";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../UI/Button/LinkBtn";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useAtom } from "jotai";
import { mobileMenuAtom } from "../MobileNav/MobileNav";
import { NavLinkItem } from "../Header/Header";

const routes = ["All", "Footwear", "Appereal", "Basketball", "Slides"];

interface Props {
  navLinks: NavLinkItem[];
  orderCount: number;
  userImg: string;
}

const NavBar: FC<Props> = ({ orderCount, userImg, navLinks }) => {
  const [, setIsMobileMenuOpen] = useAtom(mobileMenuAtom);
  const router = useRouter();
  const { signOut } = useClerk();

  const logOut = useCallback(async () => {
    await signOut();
    router.refresh();
  }, []);

  return (
    <div className="grid justify-end md:justify-between grid-flow-col">
      <div className="hidden md:grid grid-flow-col gap-5 xl:gap-10">
        <LinkBtn type="black" text="All" href="/shoes" />
        {navLinks.map(({ href, text }) => (
          <LinkBtn key={href} type="black" href={href} text={text} />
        ))}
      </div>
      <div
        onClick={() => setIsMobileMenuOpen(true)}
        className="block md:hidden w-8 h-8 cursor-pointer"
      >
        <Bars3Icon />
      </div>
      <div className="hidden md:grid gap-2 xl:gap-3 grid-flow-col justify-end items-center">
        {userImg && (
          <Image
            onClick={logOut}
            className="cursor-pointer rounded-full"
            width={30}
            height={30}
            src={userImg}
            alt="avatar"
          />
        )}
        <Image src={searchIcon} className="cursor-pointer" alt="" />
        <div
          onClick={() => router.push("/basket")}
          className="relative cursor-pointer"
        >
          <BriefcaseIcon className="w-6 h-6" />
          <div className="absolute text-center font-bold text-[10px] right-0 bottom-0 w-4 h-4 bg-black rounded-full text-white">
            {orderCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
