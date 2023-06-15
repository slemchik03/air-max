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
        <div className="grid grid-cols-1 justify-start gap-5">
          <p className="font-monumentBold text-3xl">Related shoes:</p>
          <RelatedItemsList itemsList={relatedItems} />
        </div>
      </div>
    );
  }
}
