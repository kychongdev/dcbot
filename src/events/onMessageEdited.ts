import { EmbedBuilder, Message, PartialMessage } from "discord.js";
import { client } from "../app";

export default function onMessageEdit(
  message: Message<boolean> | PartialMessage,
) {
  const channel = client.channels.cache.get("958360791898275923");
  const now = new Date()
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, "");

  if (message.author?.bot) {
    return;
  }
  if (!message) {
    //@ts-ignore
    // channel.send("【緊急】有编辑痕跡但卻完全無法搜到此訊息");
    return;
  }

  if (!message.author) {
    const time = message.createdAt
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "");

    //@ts-ignore
    channel.send(
      `【緊急】於${now} 對一則${time}的訊息有编辑痕跡但搜索不到刪除者`,
    );
    return;
  }
  // TODO only display deleted image
  if (message.content === message.reactions.message.content) {
    if (message.attachments.size > 0) {
      //@ts-ignore
      channel.send({
        files: [...message.attachments.values()],
        content: `【圖片】 【${message.createdAt
          .toISOString()
          .replace(/T/, " ") // replace T with a space
          .replace(
            /\..+/,
            "",
          )}】 <@${message.author?.id}> ${message.author?.username}#${message.author?.discriminator} 编辑(刪除)了圖片，此為编辑前的圖片`,
      });
    }
    return;
  }

  const user = {
    id: message.author.id ? message.author.id : "已經失去紀錄",
    avatarUrl:
      message.author.id && message.author.avatar
        ? `https://cdn.discordapp.com/avatars/${message.author?.id}/${message.author?.avatar}`
        : "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg",
    deletedContent: message.content ?? "已經失去紀錄",
    // timestamp: message.createdTimestamp,
    createdAt: message.createdAt
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, ""),
  };

  const editMessageEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`编辑訊息 by 用戶${user.id}>`)
    .setImage(user.avatarUrl)
    .addFields(
      { name: "內容", value: user.deletedContent },
      { name: "作者", value: `<@${user.id}>` },
      {
        name: "訊息地址",
        value: `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`,
      },
      { name: "訊息日期", value: user.createdAt },
    );
  //@ts-ignore
  channel.send({ embeds: [editMessageEmbed] });
}
