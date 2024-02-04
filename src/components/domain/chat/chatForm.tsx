import { FC } from "react";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Form } from "@remix-run/react";

type FormProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ChatForm: FC<FormProps> = ({ value, onChange }) => {
  return (
    <Form className="flex gap-4 px-4 py-3 bg-primary">
      <Textarea
        placeholder="AI にそうだんする"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button className="p-0" leftIcon="send" disabled={!value} />
    </Form>
  );
};
