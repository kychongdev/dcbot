// Require the necessary discord.js classes
//
import { Client, Events, Partials, GatewayIntentBits } from "discord.js";
import onMessageDelete from "./events/onMessageDelete";
import onMessageEdit from "./events/onMessageEdited";
import onMessageCreate from "./events/onMessageCreate";

// Create a new client instance
export const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.User,
  ],
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log("Activated");
  //@ts-ignore
  // channel.send(`<@&842646164511785001>`);
  //@ts-ignore
  // channel.send(`<@&1019130937704988725>`);
});

client.on(Events.MessageDelete, onMessageDelete);
client.on(Events.MessageUpdate, onMessageEdit);
client.on(Events.MessageCreate, onMessageCreate);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
