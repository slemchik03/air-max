import  { GoodItemCard } from "../GoodItem/GoodItem";
import RelatedItemsList from "../RelatedItemsList/RelatedItemsList";

interface Props {
  currentItemId: string;
  currentCategoryId: string;
}

const getRelatedItems = async (itemId: string, categoryId: string) => {
  try {
    const response = await fetch(
      `${process.env.PROJECT_URL}/api/related?currentItemId=${itemId}&categoryId=${categoryId}`,
      { cache: "no-store" }
    );

    const data = (await response.json()) as GoodItemCard[];
    return data;
  } catch (error) {

    
    return null;
  }
};

export default async function RelatedItems({
  currentItemId,
  currentCategoryId,
}: Props) {
  const relatedItems = await getRelatedItems(currentItemId, currentCategoryId);
  if (relatedItems && relatedItems.length) {
    return (
      <div className="grid gap-8 pt-[190px] pb-10 px-10">
        <p className="font-monumentBold text-3xl">Related shoes: </p>
        <div className="grid grid-flow-col justify-start gap-5">
          <RelatedItemsList itemsList={relatedItems} />
        </div>
      </div>
    );
  }
}
