import Image from "next/image";
import LoadingImg from "../../../public/icons/loading.svg"

const Loading = () => {
  return (
    <div className="grid py-7 justify-center items-center h-15">
      <Image className="w-10 h-10" src={LoadingImg} alt="loading" />
    </div>
  );
};

export default Loading;
