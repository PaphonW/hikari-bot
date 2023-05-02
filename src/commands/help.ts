import { SlashCommandBuilder } from "@discordjs/builders";
import { ChannelType, ChatInputCommandInteraction, Client, CommandInteraction, TextChannel } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Create a help ticket.")
    .addStringOption((option) => 
        option
        .setName("description")
        .setDescription("You can leave your problems here!")
        .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction, client: Client) {
    console.log("yoyo1");
    
    if(!interaction?.channelId){
        return;
    }
    const channel = await client.channels.fetch(interaction.channelId);
    if(!channel || channel.type !== ChannelType.GuildText){
        return;
    }
    console.log("yoyo2");
    const thread = await (channel as TextChannel).threads.create({
        name: `suport-${Date.now}`,
        reason: `Support ticket ${Date.now} created by ${interaction.user.tag}`
    })
    console.log("yoyo3");
    const problemsDescription = interaction.options.getString("description");
    const { user } = interaction;
   // thread.send{`${user} has a problem: ${problemsDescription}`};

    //TODO: send ticket to firebase
    //TODO: fix throw error on /help

    return interaction.reply({
        content: `Your ticket has been created`,
        ephemeral: true
    });
}