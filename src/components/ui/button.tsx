import { FC } from "react";
import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from "./shadcn/button";
import { Icon, IconType } from "../icons/icon";
import { cn } from "src/lib/utils";

type ButtonProps = ShadcnButtonProps & {
  leftIcon?: IconType;
};

export const Button: FC<ButtonProps> = ({
  className,
  children,
  leftIcon,
  ...buttonProps
}) => {
  return (
    <ShadcnButton className={cn(className, "gap-1")} {...buttonProps}>
      {leftIcon && <Icon icon={leftIcon} />}
      {children}
    </ShadcnButton>
  );
};
