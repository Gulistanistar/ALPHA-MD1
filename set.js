const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEgrUTZPOXpYOUliWHhJazU0Ym50bStvOGZMWUo4MEIrVHMxRVA0Y01XTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXZkTHhBanB4ME9EUlkzK2dpdFVUbW5QUkZNS3kzTmJiYkttemtLVU1Taz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1Q2hpVFFleUtEazJrM0o4RHVjdkZsdno4cXpWR3VSSUljTVc0N2hWM1VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLNkt4RjI0amNPOHB6bDV5YUpGVmNPUU9xd01BQldhY1hLREVQOHQvaURVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMLzBITG9ES2ljMzRid2Rza2lwaHBFUitMditVRUJmc3ZFY3dTRW1OSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImIzdGw0NGtsL2pHZVhNMkJ1M0VzTzA2Y3NYUXhoSC9zL2RkMTRYOEZxMVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUQ0dDI2L041ZngzQnVkb1hJSjltbzdEa0owTFJmalZzNGZ1dXl1bDEyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmlER081WHVVSEpQMkhYMWxScENwUzUyOHNoWjZ2VGlGdGdwenNuNVJWQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5TUmh6RThvSXE0eFAyeVd3UDE4VUdQdXhucytnWTlwVmxIZTNrSDRna0l4OWk5THkzTkh6QjZ0Wnp3QXFTUkFHR2J2a2ljcE9Ka3hudGNXNXZUY2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6IlNkam45U3lQeHlyb29uLzMzd2hBMlRTNEYrSzZ3aFdzdjlSZ3NaWmhzbUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMzA4MzYzNDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkYyOTg3NTVGOTQ0QkYyNjk5QUQ5QzBDNjIxRDVBODNEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQwMzUzOTN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFxWkZacGVpUWRhV2J3MXZwczE0SWciLCJwaG9uZUlkIjoiYjhmNTM2MWQtMDExMC00YTA1LTk5NzUtYTk0NGFmMmIwNzFiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNwK3ZRNzV3U0RmUHF2L0Q3WlhTaXdzeS9XTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5cU5PMHV6ZHlYMmo0eDBqZmxVVVpjSUg0NHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOUhDOURXNEUiLCJtZSI6eyJpZCI6IjkyMzMwODM2MzQzMzo2MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWEyNm9jSEVLL2lpcllHR0E4Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNEtlVFhtd0IzSmJtNE9MTGVvZXRwdE80OUhZNy9LdHoyZTZ1RExjMmdnWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiV0F1T2RMVndNQVVjN0ZWcVNqRVNxTXpNdFo5TW9ZY3NGVEduOU5qZzZtN2NIa05kTDVnMUdpVENHVitRZ2dNclBCTWVFOEFMTjNUQXRzN0Zzb0hoQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IjhmbVVvSTlGRjlvSWl3RDhaeWVqRG5TeWkyRmRiSTNOOXd0ZEMwaFJmemFmazE1NFlNTTlBUVZMaHVralJxWEtIR0wraFh5MUZoaG1oTVFwTmYvSmlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMzA4MzYzNDMzOjYxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVDbmsxNXNBZHlXNXVEaXkzcUhyYWJUdVBSMk8veXJjOW51cmd5M05vSUcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQwMzUzODgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTXFTIn0=',
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
