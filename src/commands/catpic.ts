import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("catpic")
    .setDescription("Replies with cat picture!");

export async function execute(interaction: CommandInteraction) {
    //let cat = await fetch("https://api.thecatapi.com/v1/images/search")
    //console.log(cat);
    await interaction.reply("catpic!");
}