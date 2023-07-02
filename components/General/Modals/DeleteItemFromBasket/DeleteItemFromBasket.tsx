import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import DeleteItemsSlider from "./DeleteItemsSlider";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  itemsCount: number;
  itemTitle: string;
  open: boolean;
  isLoading?: boolean;
  portalContainerElement?: HTMLElement;
  confirmCallback: (deleteCount: number) => any;
  cancelCallback: () => void;
}

const DeleteItemFromBasket: FC<Props> = ({
  open,
  isLoading,
  itemsCount,
  itemTitle,
  cancelCallback,
  confirmCallback,
  portalContainerElement,
}) => {
  const [deleteCount, setDeleteCount] = useState(1);
  const isSingle = itemsCount <= 1;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && cancelCallback()}>
      <DialogContent
        role="dialog-content"
        container={portalContainerElement}
        className="blur-effect"
      >
        <DialogHeader className="gap-5">
          <DialogTitle className="text-center">{itemTitle}</DialogTitle>

          <DialogDescription asChild>
            <div className="grid gap-5">
              {!isSingle && (
                <DeleteItemsSlider
                  onChange={(v) => setDeleteCount(v)}
                  deleteCount={deleteCount}
                  maxCount={itemsCount}
                />
              )}
              <Button
                role="delete-btn"
                disabled={!deleteCount || isLoading}
                onClick={() => confirmCallback(deleteCount)}
                variant="outline"
              >
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSingle ? "Delete" : `Delete - ${deleteCount}`}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteItemFromBasket;
