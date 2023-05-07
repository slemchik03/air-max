"use client";

import searchIcon from "../../../public/icons/search-icon.svg";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import LinkBtn from "../../UI/Button/LinkBtn";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from 'jotai/utils'

const routes = ["All", "Footwear", "Appereal", "Basketball", "Slides"];


export const orderCountAtom = atom(0)

interface Props {
  orderCountServer: number
}

const NavBar: FC<Props> = ({orderCountServer}) => {
  // @ts-ignore
  useHydrateAtoms([[orderCountAtom, orderCountServer]])

  const [count] = useAtom(orderCountAtom)
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter()
  const {signOut} = useClerk()

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
      <div className="grid gap-3 grid-flow-col justify-end items-center">
        {isLoaded && isSignedIn && (
          <Image
            onClick={() => signOut()}
            className="cursor-pointer rounded-full"
            width={30}
            height={30}
            src={user.profileImageUrl}
            alt="avatar"
          />
        )}
        <Image src={searchIcon} className="cursor-pointer" alt="" />
        <div onClick={() => router.push("/basket")} className="relative cursor-pointer">
          <BriefcaseIcon className="w-6 h-6" />
          <div className="absolute text-center font-bold text-[10px] right-0 bottom-0 w-4 h-4 bg-black rounded-full text-white">
            {count}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;