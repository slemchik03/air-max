import Link, { LinkProps } from "next/link";
import { FC } from "react";

interface Props {
  href: string;
  type: "black" | "orange";
  text: string;
}

const LinkBtn: FC<Props & LinkProps> = ({ href, type, text, ...props }) => {
  if (type === "orange") {
    return (
      <Link
        {...props}
        href={href}
        className="relative group/item text-[#DE343D] text-[13px]  uppercase font-monument tracking-[0.86px] leading-[28px]"
      >
        {text}
        <div className="absolute group-hover/item:w-full bottom-0 left-0 w-0 bg-[#DE343D] h-1 rounded-full duration-150 ease-in-out"></div>
      </Link>
    );
  }
  return (
    <Link
      {...props}
      href={href}
      className="relative group/item text-black text-[13px] text-left xl:text-center uppercase font-monument tracking-[0.86px] leading-[28px]"
    >
      {text}
      <div className="absolute group-hover/item:w-full bottom-0 left-0 w-0 bg-black h-1 rounded-full duration-150 ease-in-out"></div>
    </Link>
  );
};

export default LinkBtn;
