import { FC } from "react";
import { CardContent, CardTitle, Card as ShadcnCard } from "./shadcn/card";

type CardProps = {
  title: string;
  content: string;
};

export const Card: FC<CardProps> = ({ title, content }) => {
  return (
    <ShadcnCard className="p-4 w-80">
      <CardTitle className="text-lg mb-6">{title}</CardTitle>
      <CardContent className="p-0 line-clamp-5">{content}</CardContent>
    </ShadcnCard>
  );
};
