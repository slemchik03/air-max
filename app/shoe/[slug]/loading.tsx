import Image from "next/image";
import LoadingImg from "../../../public/icons/loading.svg"

export default function Loading() {
  return (
    <div className="grid justify-center items-center min-h-screen">
        <Image className="w-10 h-10" src={LoadingImg} alt="loading"/>
    </div>
  );
}
