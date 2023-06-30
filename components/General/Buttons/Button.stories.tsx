
import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Buttons/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Black: Story = {
  args: {
    type: "black",
    text: "Button",
  },
};

export const Gray: Story = {
  args: {
    type: "gray",
    text: "Button",
  },
};

export const White: Story = {
  args: {
    type: "white",
    text: "Button",
  },
};
