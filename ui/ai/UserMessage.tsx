import React from "react";
import { AIChatMessage } from "./type";

const UserMessage = ({ message }: { message: AIChatMessage }) => {
  if (message.created_by !== "user") {
    return <></>;
  }

  return (
    <div key={message.id} className={"flex w-full items-center justify-end"}>
      <p className={"p-2 rounded-md shadow-sm   bg-sky-100  w-fit text-wrap"}>
        {message.text}
      </p>
    </div>
  );
};

export default UserMessage;
