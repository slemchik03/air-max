import { Meta, StoryObj } from "@storybook/react";
import SearchItems from "./SearchItems";
import { Button } from "@/components/ui/button";
import { ComponentProps, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SearchItemsWrapper = (props: ComponentProps<typeof SearchItems>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <SearchItems open={isOpen} closeCallback={() => setIsOpen(false)} />
    </QueryClientProvider>
  );
};

const meta: Meta<typeof SearchItems> = {
  title: "Modals/SearchItems",
  component: SearchItemsWrapper,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchItems>;
export const Modal: Story = {};
