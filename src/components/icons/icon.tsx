import { FC } from "react";
import { PlusIcon } from "./plus";
import { ChatIcon } from "./chat";
import { BookIcon } from "./book";
import { CloseIcon } from "./close";
import { SendIcon } from "./send";
import { ChevronLeftIcon } from "src/components/icons/chevronLeft";

const Icons = {
  plus: <PlusIcon />,
  book: <BookIcon />,
  chat: <ChatIcon />,
  close: <CloseIcon />,
  send: <SendIcon />,
  chevronLeft: <ChevronLeftIcon />,
} as const;

export type IconType = keyof typeof Icons;

type IconProps = {
  icon: IconType;
};

export const Icon: FC<IconProps> = ({ icon }) => {
  return <i>{Icons[icon]}</i>;
};
