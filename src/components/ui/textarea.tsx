import { ChangeEventHandler, FC } from "react";
import { Textarea as ShadcnTextarea } from "./shadcn/textarea";

type TextareaProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const Textarea: FC<TextareaProps> = ({ value, onChange }) => {
  return (
    <ShadcnTextarea
      className="min-h-fit px-4 py-2 text-base bg-primary text-white overflow-hidden"
      placeholder="AI にそうだんする"
      value={value}
      rows={1}
      onChange={onChange}
    />
  );
};
