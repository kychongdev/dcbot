import { Message, PartialMessage } from "discord.js";

export default function onMessageEdit(
  message: Message<boolean> | PartialMessage,
) {
  console.log(message);
}
