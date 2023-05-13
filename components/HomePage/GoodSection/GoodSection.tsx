import { FunnelIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import Button from "../../UI/Button/Button";
import Loading from "@/components/UI/Loading/Loading";
import dynamic from "next/dynamic";

const GoodList = dynamic(() => import("../GoodList/GoodList"), {
  ssr: false,
  loading: () => <Loading />,
});

const GoodSection = () => {
  return (
    <div className="font-monument px-[25px] md:px-10 xl:px-[96px] pt-[91px]">
      <div className="grid gap-6 md:gap-0 justify-center text-center md:grid-flow-col md:justify-between">
        <p className="text-[#DE343D] text-[37px]">Top sellers</p>
        <div className="grid sm:grid-flow-col gap-2 sm:gap-8">
          <Button type="gray" text="FILTERS" className="text-[15px]">
            <FunnelIcon className="w-[26px] h-[26px]" />
          </Button>
          <Button type="gray" text="SORT BY" className="text-[15px]">
            <Bars3BottomLeftIcon className="w-[26px] h-[26px]" />
          </Button>
        </div>
      </div>
      <GoodList />
    </div>
  );
};

export default GoodSection;
