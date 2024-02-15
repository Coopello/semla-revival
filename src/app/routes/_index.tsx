import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ChatForm } from "src/components/domain/chat/chatForm";
import { Drawer } from "src/components/ui/drawer";
import { DrawerDemo } from "src/components/ui/drawerDemo";
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
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <Button>これはボタンでぢ。</Button>
      <Button>これもボタンでぢ。</Button>
      <Message message="これはメッセージでぢ。" type="bot" />
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        footer={
          <ChatForm value="これはチャットフォームでぢ。" onChange={() => {}} />
        }
      />
      <DrawerDemo />
    </div>
  );
}
