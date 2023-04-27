import Link from "next/link";
import searchIcon from "../../public/icons/search-icon.svg";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";
import LinkBtn from "../UI/Button/LinkBtn";

const routes = ["All", "Footwear", "Appereal", "Basketball", "Slides"];

const NavBar = () => {
  return (
    <>
      <div className="hidden md:grid grid-flow-col gap-10">
        {routes.map((route, idx) => (
          <LinkBtn type="black" text={route} key={idx} href={"#"} />
        ))}
      </div>
      <div className="block md:hidden w-8 h-8 cursor-pointer">
        <Bars3Icon />
      </div>
      <div className="grid grid-flow-col justify-end items-center">
        <Image src={searchIcon} className="cursor-pointer" alt="" />
        <span className="hidden xl:block pl-[10px] text-black text-[13px] text-right uppercase font-monument tracking-[0.86px] leading-[28px]">
          Search
        </span>
      </div>
    </>
  );
};

export default NavBar;
