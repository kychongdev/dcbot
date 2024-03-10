import { Message, PartialMessage, EmbedBuilder } from "discord.js";
import { client } from "../app";

export default function onMessageDelete(
  message: Message<boolean> | PartialMessage,
) {
  // const channel = client.channels.cache.get("986410134894940240");
  if (message.channel.id == process.env.CHECKMESSAGECHANNEL) {
    const channel = client.channels.cache.get(
      process.env.SENDMESSAGECHANNEL as string,
    );
    if (message.author?.bot) {
      return;
    }
    if (!message) {
      //@ts-ignore
      // channel.send("【緊急】有刪除痕跡但卻完全無法搜到此訊息");
      return;
    }
    if (!message.author) {
      // const time = message.createdAt
      //   .toISOString()
      //   .replace(/T/, " ") // replace T with a space
      //   .replace(/\..+/, "");

      //@ts-ignore
      // channel.send(`【緊急】於${time} 有刪除痕跡但搜索不到刪除者`);
      return;
    }

    //havent try this
    //<t:${Math.round(message.author.createdTimestamp / 1000)}>

    if (message.content) {
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

      const deleteMessageEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`刪除訊息 by 用戶${user.id}`)
        .setImage(user.avatarUrl)
        .addFields(
          { name: "內容", value: user.deletedContent },
          { name: "作者", value: `<@${user.id}>` },
          { name: "訊息日期", value: user.createdAt },
        )
        .setTimestamp(new Date());

      //@ts-ignore
      channel.send({ embeds: [deleteMessageEmbed] });
    }

    if (
      message?.member?.roles.cache.some(
        (role) => role.id === process.env.BANROLE,
      )
    ) {
      //@ts-ignore
      channel.send(
        `用戶 <@${message.author.id}>, ${message.author.username}已經擁有身份組了`,
      );
    } else {
      message?.member?.roles.add(process.env.BANROLE as string);
    }

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
          )}】 <@${message.author?.id}> ${message.author?.username}#${message.author?.discriminator} 刪除了${message.attachments.size}張圖片`,
      });
    }
  }
}
