import { Button } from "src/components/ui/button";

export const WorkEditPageHeader = () => {
  return (
    <header className="hidden sm:flex justify-between bg-primary px-4 py-3">
      <Button className="p-0" leftIcon="chevronLeft" />
      <div className="flex gap-4">
        <Button leftIcon="chat">AIにそうだん</Button>
        <Button leftIcon="book" className="bg-secondary">
          スライドを作成
        </Button>
      </div>
    </header>
  );
};
