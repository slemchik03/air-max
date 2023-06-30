import { cn } from "../../../lib/utils";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

interface Props {
  href: string;
  type: "black" | "orange";
  text: string;
}

const LinkBtn: FC<Props & LinkProps> = ({ href, type, text, ...props }) => {
  const baseLinkCn =
    "relative group/item text-[13px] uppercase font-monument tracking-[0.86px] leading-[28px]";
  const baseLineCn =
    "absolute group-hover/item:w-full bottom-[-2px] left-0 w-0 h-1 rounded-full duration-150 ease-in-out";
  const resultCn = {
    black: {
      linkCn: "text-black",
      lineCn: "bg-black",
    },
    orange: {
      lineCn: "bg-[#DE343D]",
      linkCn: "text-[#DE343D]",
    },
  }[type];
  return (
    <Link className={cn(baseLinkCn, resultCn.linkCn)} {...props} href={href}>
      {text}
      <div className={cn(baseLineCn, resultCn.lineCn)}></div>
    </Link>
  );
};

export default LinkBtn;
