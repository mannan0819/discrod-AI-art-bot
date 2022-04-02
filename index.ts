import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
import { styles } from "./constants/options";
import GenImage from "./util/GenImage";
dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
client.on("ready", () => {
  console.log(`Logged in as ${client!.user!.tag}!`);
});


client.on("messageCreate", async (message) => {
  const command = message.content;
  if (command.startsWith("!gen")) {
    const words = command.split(' ')
    const response = words.length === 2 ?
      await GenImage(words.at(1)!, Math.floor(Math.random() * 20) + 1) :
      words.length === 3 && parseInt(words.at(2)!) && parseInt(words.at(2)!) >= 1 && parseInt(words.at(2)!) <= 20 ?
        await GenImage(words.at(1)!, parseInt(words.at(2)!)) :
        "Arguemnts are not correctly provided"

    message.channel.send(response);
  }
  else if (command.startsWith("!options")) {
    let res = ""
    styles.map((val, i) => res += `${i + 1}: ${val}\n`);
    message.channel.send(res);
  }
});

client.login(process.env.discord_token);
