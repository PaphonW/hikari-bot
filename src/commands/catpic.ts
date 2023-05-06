import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import axios from "axios";
import { json } from "express";

export const data = new SlashCommandBuilder()
    .setName("catpic")
    .setDescription("Replies with random cat picture!");

type Cat = {
    "id": string,
    "url": string,
    "width": number,
    "height": number
    "breeds": [],
    "favorite": object
}

type getCatPicResponse = {
    "data": Cat
}


// use thecatapi to get random cat pictures! (using axios to get data)
async function getCatPic(): Promise<Cat> {
    try{
        const url = "https://api.thecatapi.com/v1/images/search";
        const response = await axios.get<getCatPicResponse>(url);
        //console.log(response.data);
        const cat = response.data.data;
        return cat;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function execute(interaction: CommandInteraction) {
    let catGet = await getCatPic();
    console.log(catGet);
    await interaction.reply("cat.url");
}