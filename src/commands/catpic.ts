import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import axios from "axios";

export const data = new SlashCommandBuilder()
    .setName("catpic")
    .setDescription("Replies with random cat picture!");

type Cat = {
    "id": string,
    "url": string,
    "width": number,
    "height": number
}

type getCatPicResponse = {
    "data": Cat[],
}


// use thecatapi to get random cat pictures! (using axios to get data)
async function getCatPic(): Promise<Cat> {
    try{
        const url = "https://api.thecatapi.com/v1/images/search";
        const {data, status} = await axios.get<getCatPicResponse>(
            url,
            {
                headers: { 
                    Accept: "application/json" }
            });
        //console.log(data);
        const catReturn = JSON.parse(JSON.stringify(data).replace(/[[\]]/g, ''));
        console.log(status);
        return catReturn;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function execute(interaction: CommandInteraction) {
    //get pictur from thecatapi
    let catGet = await getCatPic();
    console.log(catGet);
    //return picture url to discord
    await interaction.reply(catGet.url);
}