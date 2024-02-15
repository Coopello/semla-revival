import { FC, ReactNode, SetStateAction } from "react";
import {
  DrawerContent,
  DrawerFooter,
  DrawerPortal,
  DrawerTrigger,
  Drawer as ShadcnDrawer,
} from "./shadcn/drawer";
import { Button } from "src/components/ui/button";

type Props = {
  isOpen: boolean;
  footer: ReactNode;
  onOpenChange: (value: SetStateAction<boolean>) => void;
};

export const Drawer: FC<Props> = ({ isOpen, onOpenChange, footer }) => {
  return (
    <ShadcnDrawer open={isOpen} onOpenChange={onOpenChange} modal={false}>
      <DrawerTrigger asChild>
        <Button>これはボタンでぢ。</Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="bg-primary">
          <DrawerFooter>{footer}</DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </ShadcnDrawer>
  );
};
