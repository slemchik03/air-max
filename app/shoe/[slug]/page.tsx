import GoodItemDetail from "@/components/ShoePage/GoodItemDetail/GoodItemDetail";
import { GoodItem } from "@prisma/client";
import { redirect } from "next/navigation";

const getShoeItem = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.PROJECT_URL}/api/shoe?slug=${slug}`,
      { cache: "no-store" }
    );
    const data = (await response.json()) as GoodItem | null;

    return data;
  } catch (error) {
    return null;
  }
};

export default async function Page(pageParams: { params: { slug: string } }) {
  const shoe = await getShoeItem(pageParams.params.slug);

  if (shoe) {
    // @ts-ignore
    return <GoodItemDetail {...shoe} />;
  }
  redirect("/");
}
