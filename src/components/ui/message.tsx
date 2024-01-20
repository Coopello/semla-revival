import { cva } from "class-variance-authority";
import { FC } from "react";

type MessageProps = {
  message: string;
  type?: "bot" | "mine";
};

const messageContainerVariants = cva("flex", {
  variants: {
    type: {
      bot: "justify-start",
      mine: "justify-end",
    },
  },
  defaultVariants: {
    type: "mine",
  },
});

const messageVariants = cva(
  "px-4 py-2 text-white w-fit max-w-full rounded-lg",
  {
    variants: {
      type: {
        bot: "bg-gray-800 rounded-bl-none",
        mine: "bg-yellow-400 rounded-br-none",
      },
    },
    defaultVariants: {
      type: "mine",
    },
  }
);

export const Message: FC<MessageProps> = ({ message, type = "mine" }) => {
  return (
    <div className={messageContainerVariants({ type })}>
      <p className={messageVariants({ type })}>{message}</p>
    </div>
  );
};
