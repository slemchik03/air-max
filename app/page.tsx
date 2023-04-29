import About from "@/components/About/About";
import Banner from "@/components/Banner/Banner";
import CompanyList from "@/components/CompanyList/CompanyList";
import GoodSection from "@/components/GoodSection/GoodSection";
import Preview from "@/components/Preview/Preview";

const getGoodItems = async () => {
  try {
    const response = await fetch(
      `${process.env.PROJECT_URL}/api/shoes?limit=3&select=title,image,background`,
      { cache: "no-store" }
    );

    return response.json();
  } catch (err) {
    throw new Error("Failed to fetch");
  }
};

export default async function Home() {
  const goodItems = await getGoodItems();

  return (
    <>
      <Preview goodsList={goodItems || []} />
      {/* @ts-ignore */}
      <GoodSection />
      <About />
      <CompanyList />
      <Banner />
    </>
  );
}
