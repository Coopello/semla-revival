import type { MetaFunction } from "@remix-run/node";
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
  return (
    <div
      className="min-h-svh"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <Button>これはボタンでぢ。</Button>
      <Button>これもボタンでぢ。</Button>
      <Message message="これはメッセージでぢ。" type="bot" />
      <Drawer
        trigger={
          <Button variant="outline" color="primary">
            Open Drawer
          </Button>
        }
        footer={<ChatForm value="ofjagope" onChange={() => {}} />}
      />
    </div>
  );
}
