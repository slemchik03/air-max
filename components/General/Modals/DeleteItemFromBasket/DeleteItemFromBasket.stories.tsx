import { Meta, StoryObj } from "@storybook/react";
import DeleteItemFromBasket from "./DeleteItemFromBasket";
import getBasketItems from "@/utils/server/get/getBasketItems";
import { ComponentProps, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ModalWrapper = (props: ComponentProps<typeof DeleteItemFromBasket>) => {
  const [isOpen, setIsOpen] = useState(props.open);

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <DeleteItemFromBasket
        {...props}
        cancelCallback={() => setIsOpen(false)}
        confirmCallback={() => setIsOpen(false)}
        open={isOpen}
      />
    </div>
  );
};

const meta: Meta<typeof DeleteItemFromBasket> = {
  title: "Modals/DeleteItemFromBasket",
  component: ModalWrapper,
  args: {
    open: false,
    isLoading: false,
    confirmCallback: () => {},
    cancelCallback: () => {},
  },
  loaders: [
    async () => ({
      currentItem: (
        await getBasketItems("user_2PK2AXQcJYicNyeR4t8lxB7xc9T")
      )[0],
    }),
  ],
  render: (args, { loaded }) => (
    <ModalWrapper {...args} item={loaded.currentItem} />
  ),
};
export default meta;
type Story = StoryObj<typeof DeleteItemFromBasket>;

export const ModalWithSingleItem: Story = {
  args: {
    itemsCount: 1,
  },
};
export const ModalWithMultipleItems: Story = {
  args: {
    itemsCount: 10,
  },
};
