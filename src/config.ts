import dotenv from "dotenv"
dotenv.config()
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env

if(!CLIENT_ID || !DISCORD_TOKEN || !GUILD_ID) {
    throw new Error("Missing environment variables")
}

const config: Record<string, string> = {
    CLIENT_ID,
    DISCORD_TOKEN,
    GUILD_ID
}

export default config