const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFHL1MrZHRDaHY3eHI2ZUxldUxISFNrUnpwR1JQUWdUblZCR3k1aHEzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY2tJRFEra2dUcHJ1TGdmVHJtTXpTNVBmd25EaU1IMWdFMWRiV0JTVmxYWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSEIxWXFxcE1DcDBFTUd5dWpQMVFoR2JGcmxPUWRvcW1pTXQ3eFZlM0dBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwV2xUWkowL0pNSzJ0U1VKcFVYaVhVWFlVRGd3SGl0ZVFrdEQwTFpGMm0wPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFLdUpUWm0wR014VEJ2dC81c3hDOU05UHN6TGs5VE1ZU1FKQUQycmN2azA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik52THBWMTJpSlN6RW96YUw4TndIMmpNOERnU2t6R2t6bTM0OXRJU1NxeUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtseUNnczVTZ2djcnFHZElqWGlvdTk4QVlWUitJYzFFOTFobnpmQkgzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkVCdzVOMWpFaC9hbDhQaEVvWUJzTHJlNVY4Wkg0azViamtDR1dQMEJsZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ6VytiR0w5VjF1WVRTMnZBSHlUWlB2Qi81ei93RlpNSUF0dGR3K1VodnBMc0p3K2dFandlOHJpam53VTZSNEZRTzRLcXkzWWM0M053d0dWek9lV0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM4LCJhZHZTZWNyZXRLZXkiOiJtbXgzVGlJMUFWa0kyQXZMQW11eCs3RHBhejB6YkppbTArbXUraUpTL1NZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzMwODM2MzQzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5NzQ2Rjk4QjFCRDVFMjJCRUE4NUJFMkMzQjMxMzdDRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzNzk0NzI1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMzMDgzNjM0MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjhFQzVCQkUwQTNERjU3MTg4N0U1QjkxMkQ0M0Y0RDMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMzc5NDcyNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiTnBKZF95RFJROXlBY2YtbEZKanJKZyIsInBob25lSWQiOiJiNjM4MDhhZC04NjUyLTQwNGMtOTY5MS0xZTQ0YjFiZTQzYmMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekNjOWVkR2QzbmdKT1hYS2lxOGM5OEZpSmJBPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpoOWUrWjVyd1VPRUdmNUVjTHJJZlNFN1hlTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJKTjJUNEExRyIsIm1lIjp7ImlkIjoiOTIzMzA4MzYzNDMzOjQ3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkZpZ2h0ZXIgMzEzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNTzI2b2NIRUphSy9MVUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0S2VUWG13QjNKYm00T0xMZW9ldHB0TzQ5SFk3L0t0ejJlNnVETGMyZ2dZPSIsImFjY291bnRTaWduYXR1cmUiOiJOUVNiaDNBaUF0QTdXeE9HYmk5Q0hSUkt5a2xVVzdDRUo2S2tvaGF1czBtaEZtSTBBQklaVURzdHhGZ0ppc1FpRVppaFh3S3lMSlpQM2pnV2ZHUFlDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVGV5MjAxN252bTQrZUtQNjdjT0xrMjRpVUhNYjVrd3ZWOVBhNE94bjJ5UUJpRmVIUTVlN2VZaHVScVZaSVV2Z2gvcFdPT3ZKamQ5YVlYTHNGL3dSQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMzMDgzNjM0MzM6NDdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZUNuazE1c0FkeVc1dURpeTNxSHJhYlR1UFIyTy95cmM5bnVyZ3kzTm9JRyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzc5NDcyMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNcUMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
