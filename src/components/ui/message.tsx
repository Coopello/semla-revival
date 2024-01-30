import { cva } from "class-variance-authority";
import { FC } from "react";

type MessageProps = {
  message: string;
  type?: "bot" | "me";
};

const messageContainerVariants = cva("flex", {
  variants: {
    type: {
      bot: "justify-start",
      me: "justify-end",
    },
  },
  defaultVariants: {
    type: "me",
  },
});

const messageVariants = cva(
  "px-4 py-2 text-white w-fit max-w-full rounded-lg",
  {
    variants: {
      type: {
        bot: "bg-gray-800 rounded-bl-none",
        me: "bg-yellow-400 rounded-br-none",
      },
    },
    defaultVariants: {
      type: "me",
    },
  }
);

export const Message: FC<MessageProps> = ({ message, type = "me" }) => {
  return (
    <div className={messageContainerVariants({ type })}>
      <p className={messageVariants({ type })}>{message}</p>
    </div>
  );
};
