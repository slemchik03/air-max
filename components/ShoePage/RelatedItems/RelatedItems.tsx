import getRelatedItems from "@/utils/server/getRelatedItems";
import RelatedItemsList from "../RelatedItemsList/RelatedItemsList";

interface Props {
  currentItemId: string;
  currentCategoryId: string;
}

export default async function RelatedItems({
  currentItemId,
  currentCategoryId,
}: Props) {
  const relatedItems = await getRelatedItems({
    currentItemId,
    currentCategoryId,
  });
  if (relatedItems && relatedItems.length) {
    return (
      <div className="grid gap-8 pt-[190px] pb-10 px-10">
        <p className="font-monumentBold text-3xl">Related shoes:</p>
        <div className="grid grid-flow-col justify-start gap-5">
          <RelatedItemsList itemsList={relatedItems} />
        </div>
      </div>
    );
  }
}
