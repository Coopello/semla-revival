import { ChangeEventHandler, FC } from "react";
import { Textarea as ShadcnTextarea } from "./shadcn/textarea";

type TextareaProps = {
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const Textarea: FC<TextareaProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <ShadcnTextarea
      className="min-h-fit px-4 py-2 text-base bg-primary text-white overflow-hidden"
      placeholder={placeholder}
      value={value}
      rows={1}
      onChange={onChange}
    />
  );
};
