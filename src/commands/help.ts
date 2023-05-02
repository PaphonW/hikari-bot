import { SlashCommandBuilder } from "@discordjs/builders";
import { ChannelType, Client, CommandInteraction, TextChannel } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Create a help ticket.")
    .addStringOption((option) => 
        option
        .setName("description")
        .setDescription("You can leave your problems here!")
        .setRequired(true)
    );

export async function execute(interaction: CommandInteraction, client: Client) {
    if(!interaction?.channelId){
        return;
    }
    const channel = await client.channels.fetch(interaction.channelId);
    if(!channel || channel.type !== ChannelType.GuildText){
        return;
    }
    const thread = await (channel as TextChannel).threads.create({
        name: `suport-${Date.now}`,
        reason: `Support ticket ${Date.now} created by ${interaction.user.tag}`
    })
 
    const problemsDescription = interaction.options.getString("description");
    const { user } = interaction;
    thread.send{`${user} has a problem: ${problemsDescription}`};

    //TODO: send ticket to firebase

    return interaction.reply({
        content: `Your ticket has been created`,
        ephemeral: true
    });