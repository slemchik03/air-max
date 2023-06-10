import Banner from "@/components/HomePage/Banner/Banner";
import GoodSection from "@/components/HomePage/GoodSection/GoodSection";
import { PreviewGoodItem } from "@/components/HomePage/Preview/Preview";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";
import dynamic from "next/dynamic";

const Preview = dynamic(() => import("@/components/HomePage/Preview/Preview"), {
  ssr: false,
});

const CompanyList = dynamic(
  () => import("@/components/HomePage/CompanyList/CompanyList"),
);

const About = dynamic(() => import("@/components/HomePage/About/About"));

export default async function Home() {
  const { data: goodItems } = await getFilteredGoodItems<PreviewGoodItem>({
    limit: 3,
    selectList: [],
  });

  return (
    <>
      <Preview goodsList={goodItems} />
      {/* @ts-ignore */}
      <GoodSection />
      <About />
      <CompanyList />
      <div className="py-[100px]">
        {/* @ts-ignore */}
        <GoodSection />
      </div>
      <Banner />
    </>
  );
}
