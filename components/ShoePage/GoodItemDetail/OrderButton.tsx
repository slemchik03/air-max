"use client";

import { FC } from "react";
import Button from "../../UI/Button/Button";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import addItemToBasket from "@/utils/server/addItemToBasket";

interface Props {
  itemId: string;
}

const OrderButton: FC<Props> = ({ itemId }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const addItem = async () => {
    if (isLoaded && isSignedIn) {
      const toastId = toast.loading("Adding item...");
      const result = await addItemToBasket(itemId, user?.id);
      toast.dismiss(toastId);

      if (result.ok) {
        router.refresh();
        return toast.success("Success!");
      }
      return toast.error("Smt went wrong!");
    }
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  };

  return <Button onClick={addItem} type="black" text="Buy now" />;
};

export default OrderButton;
