import { Card } from "@heroui/react";

interface UserMessageProps {
  content: string;
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex flex-col items-end gap-2  mx-auto w-full">
      <Card
        variant="default"
        className="border p-0! bg-sky-50 border-slate-200 w-fit"
      >
        <Card.Content className="px-5 py-2  text-[15px] w-fit">
          {content}
        </Card.Content>
      </Card>
    </div>
  );
}
