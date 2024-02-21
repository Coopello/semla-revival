import { FC, ReactNode } from "react";
import {
  Drawer as ShadcnDrawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/shadcn/drawer";

type Props = {
  trigger: ReactNode;
  main?: ReactNode;
  footer?: ReactNode;
};

export const Drawer: FC<Props> = ({ trigger, main, footer }) => {
  return (
    <ShadcnDrawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-[calc(100vh_-_80px)] flex flex-col justify-between w-full bg-primary">
        <div className="mx-4">{main}</div>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </ShadcnDrawer>
  );
};
