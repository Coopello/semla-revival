import type { MetaFunction } from "@remix-run/node";
import { ChatForm } from "src/components/domain/chat/chatForm";
import { WorkEditPageHeader } from "src/components/layout/workEditPageHeader";
import { WorkListPageHeader } from "src/components/layout/workListPageHeader";
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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <WorkListPageHeader />
      <WorkEditPageHeader onClickChatButton={() => {}} />
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
    </div>
  );
}
