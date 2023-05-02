import { Client } from "discord.js";
import config from "./config";
import * as commandMoudles from "./commands";

const commands = Object(commandMoudles)

export const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"]
})

client.once("ready", () => {
    console.log("Ready!");
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    commands[commandName].excute(interaction, client)
});


client.login(config.DISCORD_TOKEN)