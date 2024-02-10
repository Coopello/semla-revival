import { Button } from "src/components/ui/button";

export const WorkListPageHeader = () => {
  return (
    <header className="hidden sm:flex justify-end bg-primary px-4 py-3">
      <Button leftIcon="plus" className="bg-secondary">
        新しいワークを作成
      </Button>
    </header>
  );
};
