import { Meta, StoryObj } from "@storybook/react";
import LinkBtn from "./LinkBtn";

const meta: Meta<typeof LinkBtn> = {
  title: "Buttons/LinkBtn",
  component: LinkBtn,
};

export default meta;

export type Story = StoryObj<typeof LinkBtn>;

export const Black: Story = {
  args: {
    href: "/#",
    type: "black",
    text: "LinkBtn",
  },
};
export const Orange: Story = {
  args: {
    href: "/#",
    type: "orange",
    text: "LinkBtn",
  },
};
