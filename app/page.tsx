
import About from "@/components/HomePage/About/About";
import Banner from "@/components/HomePage/Banner/Banner";
import CompanyList from "@/components/HomePage/CompanyList/CompanyList";
import GoodSection from "@/components/HomePage/GoodSection/GoodSection";
import Preview, {
  PreviewGoodItem,
} from "@/components/HomePage/Preview/Preview";
import getFilteredGoodItems from "@/utils/server/getFilteredGoodItems";

export default async function Home() {
  const { data: goodItems } = await getFilteredGoodItems<PreviewGoodItem>({
    limit: 3,
    selectList: [],
  });

  return (
    <>
      {goodItems?.length && <Preview goodsList={goodItems} />}
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
