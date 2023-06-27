import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getBasketItems, { BasketItemList } from "../server/get/getBasketItems";
import { toast } from "react-hot-toast";
import { BasketItemToDelete } from "@/components/BasketPage/Basket/Basket";
import deleteItemFromBasket from "../server/delete/deleteItemFromBasket";

export default function useBasketData({
  userId,
  setItemToDelete,
  basketItemToDelete,
}: {
  userId: string;
  basketItemToDelete: BasketItemToDelete;
  setItemToDelete: (item: BasketItemToDelete) => void;
}) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["basket-items"],
    queryFn: async () => getBasketItems(userId),
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (count: number) => {
      if (basketItemToDelete && userId) {
        const response = await deleteItemFromBasket({
          count,
          basketItemId: basketItemToDelete.id,
          userId: userId,
        });

        if (response.ok) return response;
      }
    },
    async onSuccess(data, count) {
      const prevData = queryClient.getQueryData([
        "basket-items",
      ]) as BasketItemList;

      queryClient.setQueryData(
        ["basket-items"],
        prevData.filter((v) => {
          if (v.id === basketItemToDelete?.id) {
            const diff = v.count - count;
            if (diff >= 1) {
              v.count = diff;
              return true;
            }
            return false;
          }
          return true;
        })
      );
      setItemToDelete(null);
      toast.success("Succes delete!");
      queryClient.invalidateQueries({ queryKey: ["basket-items"] });
    },
  });
  return {
    data,
    deleteItemMutation,
  };
  // const makeOrder = async () => {
  //   const stripe = await getStripe();
  //   const lineItems = basketItems.map(({ item, count }) => ({
  //     price: item.stripePriceId,
  //     quantity: count,
  //   }));
  //   if (stripe) {
  //     stripe.redirectToCheckout({
  //       mode: "payment",
  //       lineItems,
  //       successUrl: `${process.env.PROJECT_URL}/success/?sessionId={CHECKOUT_SESSION_ID}&basketId=${basketItems[0].basketId}`,
  //       cancelUrl: process.env.PROJECT_URL!,
  //     });
  //   }
  // };
}
