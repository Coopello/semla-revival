import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ChatForm } from "src/components/domain/chat/chatForm";
import { Drawer } from "src/components/ui/drawer";
import { Message } from "src/components/ui/message";
import { Button } from "src/components/ui/shadcn/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="min-h-svh"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <Button>これはボタンでぢ。</Button>
      <Button>これもボタンでぢ。</Button>
      <Message message="これはメッセージでぢ。" type="bot" />
      <Button onClick={() => setIsOpen(!isOpen)}>
        これはドロワーを召喚するでぢ。
      </Button>
      <Drawer footer={<ChatForm value="ofjagope" onChange={() => {}} />} />
    </div>
  );
}
