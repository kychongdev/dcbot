import { Message, PartialMessage, EmbedBuilder } from "discord.js";

export default function onMessageDelete(
  message: Message<boolean> | PartialMessage,
) {
  if (message.author?.bot) {
    return;
  }
  // const deleteMessageEmbed = new EmbedBuilder()
  //   .setColor(0x0099ff)
  //   .setTitle("Deleted Message");
  console.log(message);
  console.log(message);
}
