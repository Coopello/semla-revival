import { FC, ReactNode } from "react";
import { Button } from "../ui/shadcn/button";
import {
  Drawer as ShadcnDrawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/shadcn/drawer";

type Props = {
  main?: ReactNode;
  footer?: ReactNode;
};

export const Drawer: FC<Props> = ({ main, footer }) => {
  return (
    <ShadcnDrawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh_-_80px)] flex flex-col justify-between w-full">
        {main}
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </ShadcnDrawer>
  );
};
