import { Meta, StoryObj } from "@storybook/react";
import DeleteItemFromBasket from "./DeleteItemFromBasket";
import { ComponentProps, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const ModalWrapper = (props: ComponentProps<typeof DeleteItemFromBasket>) => {
  const [isOpen, setIsOpen] = useState(props.open);

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <Button role="open-modal-btn" onClick={() => setIsOpen(true)}>
        Click
      </Button>
      <DeleteItemFromBasket
        {...props}
        cancelCallback={() => setIsOpen(false)}
        confirmCallback={() => setIsOpen(false)}
        portalContainerElement={document.getElementById("storybook-root")!}
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

  render: (args) => <ModalWrapper {...args} itemTitle="Nike Test Item" />,
  play: async ({ canvasElement, step }) => {
    await step("Accessibility of dialog (closing, opening)", async () => {
      const canvas = within(canvasElement);
      const btn = canvas.getByRole("open-modal-btn");

      await userEvent.click(btn);
      const dialogContent = canvas.getByRole("dialog-content");
      // @ts-ignore
      expect(dialogContent).toBeInTheDocument();
      canvas.getByRole("delete-btn").click();
    });
  },
};
export default meta;
type Story = StoryObj<typeof DeleteItemFromBasket>;

export const ModalWithSingleItem: Story = {
  args: {
    itemsCount: 1,
  },
};
export const ModalWithMultipleItems: Story = {
  play: async ({ canvasElement, step }) => {
    await step("Check close btn text", async () => {
      const canvas = within(canvasElement);
      const openDialogBtn = canvas.getByRole("open-modal-btn");

      await userEvent.click(openDialogBtn);

      const deleteBtn = canvas.getByRole("delete-btn");
      expect(deleteBtn.innerText).toBe("Delete - 1");
    });
  },
  args: {
    itemsCount: 10,
  },
};
