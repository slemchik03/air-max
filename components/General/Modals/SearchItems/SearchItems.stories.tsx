import { Meta, StoryObj } from "@storybook/react";
import SearchItems from "./SearchItems";
import { Button } from "@/components/ui/button";
import { ComponentProps, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const SearchItemsWrapper = (props: ComponentProps<typeof SearchItems>) => {
  const [isOpen, setIsOpen] = useState(props.open);
  const [client, setClient] = useState(() => new QueryClient());

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  return (
    <QueryClientProvider client={client}>
      <Button role="open-modal-btn" onClick={() => setIsOpen(true)}>
        Click
      </Button>
      <SearchItems
        portalContainerElement={document.getElementById("storybook-root")!}
        defaultSearch={props.defaultSearch}
        open={isOpen}
        closeCallback={() => setIsOpen(false)}
      />
    </QueryClientProvider>
  );
};

const meta: Meta<typeof SearchItems> = {
  title: "Modals/SearchItems",
  component: SearchItemsWrapper,
  args: {
    open: false,
    defaultSearch: "",
    closeCallback: () => {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchItems>;
export const Modal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("open-modal-btn");

    await userEvent.click(btn);
    const dialogContent = canvas.getByRole("dialog-content");
    expect(btn).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
  },
};

export const ModalSearchNotFound: Story = {
  args: {
    // set invalid search
    defaultSearch: "ahahhahsgsgsggsgsgsggsgsgsg",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("open-modal-btn");

    await userEvent.click(btn);

    const searchNotFound = canvas.getByLabelText("search-not-found");

    const searchInput = canvas.getByLabelText("search-input");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.getAttribute("value")).toEqual(args.defaultSearch);
    expect(searchNotFound).toBeInTheDocument();
  },
};
