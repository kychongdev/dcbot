import { EmbedBuilder, Message, PartialMessage } from "discord.js";
import { client } from "../app";

export default function onMessageCreate(
  message: Message<boolean> | PartialMessage,
) {
  let channel = client.channels.cache.get("958360791898275923");
  if (!message) {
    return;
  }
  if (message.author?.bot) {
    return;
  }
  if (!message.member) {
    return;
  }

  if (!message.author) {
    return;
  }

  if (message.channel.id === "958360791898275923") {
    const tooEarly = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
    let joinedDate = message.member.joinedAt;
    if (!joinedDate) {
      return;
    }
    const registeredDate =
      joinedDate.getHours() +
      ":" +
      joinedDate.getMinutes() +
      "," +
      joinedDate.toDateString();

    const user = {
      id: message.author.id ? message.author.id : "已經失去紀錄",
      avatarUrl:
        message.author.id && message.author.avatar
          ? `https://cdn.discordapp.com/avatars/${message.author?.id}/${message.author?.avatar}`
          : "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg",
      content: message.content ?? "已經失去紀錄",
      // timestamp: message.createdTimestamp,
      createdAt: message.createdAt
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, ""),
    };

    if (joinedDate > tooEarly) {
      const createMessageEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`【注意】用戶${user.id}`)
        .setImage(user.avatarUrl)
        .addFields(
          { name: "進群日期", value: registeredDate },
          { name: "內容", value: user.content },
          { name: "作者", value: `<@${user.id}>` },
          {
            name: "訊息地址",
            value: `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`,
          },
          { name: "訊息日期", value: user.createdAt },
        )
        .setTimestamp(new Date());
      //@ts-ignore
      channel.send({ embeds: [createMessageEmbed] });
      //@ts-ignore
      channel.send(`<@&1211729387855290420>`);
    }
  }
}
