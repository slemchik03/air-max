import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BasketItem, GoodItem } from "@prisma/client";
import { FC, useState } from "react";
import DeleteItemsSlider from "./DeleteItemsSlider";
import { Button } from "@/components/ui/button";

interface Props {
  item: BasketItem & { item: GoodItem };
  open: boolean;
  confirmCallback: (deleteCount: number) => Promise<any>;
  cancelCallback: () => void;
}

const DeleteItemFromBasket: FC<Props> = ({
  open,
  item: {
    count,
    item: { title },
  },
  cancelCallback,
  confirmCallback,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteCount, setDeleteCount] = useState(1);
  const isSingle = count <= 1;

  const onConfirm = () => {
    setIsLoading(true);
    confirmCallback(deleteCount).then(() => setIsLoading(false));
  };
  return (
    <Dialog open={open} onOpenChange={(v) => !v && cancelCallback()}>
      <DialogContent>
        <DialogHeader className="gap-5">
          <DialogTitle className="text-center">{title}</DialogTitle>

          <DialogDescription className="grid gap-5">
            {!isSingle && (
              <DeleteItemsSlider
                onChange={(v) => setDeleteCount(v)}
                deleteCount={deleteCount}
                maxCount={count}
              />
            )}
            <Button
              disabled={!deleteCount || isLoading}
              onClick={onConfirm}
              variant="outline"
            >
              {isSingle ? "Delete" : `Delete - ${deleteCount}`}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemFromBasket;
