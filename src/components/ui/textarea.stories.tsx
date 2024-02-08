import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Textarea } from "./textarea";
import { ChangeEventHandler } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "ui/Textarea",
  component: Textarea,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    placeholder: "Type something...",
    value: "",
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      updateArgs({ value: e.target.value });
    };

    return <Textarea {...args} value={value} onChange={onChange} />;
  },
};
