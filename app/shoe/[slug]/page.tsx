import GoodItemDetail from "@/components/ShoePage/GoodItemDetail/GoodItemDetail";
import { GoodItem } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getShoeItem(params.slug);
  return {
    title: `${product?.title}: ${product?.price}$`,
  };
}

export default async function Page(pageParams: Props) {
  const shoe = await getShoeItem(pageParams.params.slug);

  if (shoe) {
    // @ts-ignore
    return <GoodItemDetail {...shoe} />;
  }
  redirect("/");
}
