// Require the necessary discord.js classes
//
import { Client, Events, Partials, GatewayIntentBits } from "discord.js";
import onMessageDelete from "./events/onMessageDelete";

// Create a new client instance
const client = new Client({
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
  console.log(`Change! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageDelete, onMessageDelete);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
