import Image from "next/image";
import LoadingImg from "../../../public/icons/loading.svg";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
}

const Loading: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(`grid py-7 justify-center items-center h-15`, className)}
    >
      <Image className="w-10 h-10" src={LoadingImg} alt="loading" />
    </div>
  );
};

export default Loading;
