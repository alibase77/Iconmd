const fs = require('fs')

global.owner = "2348075552123" //owner number
global.footer = "Iconnic" //footer section
global.status = false //"self/public" section of the bot
global.prefa = ['','!','.',',','🐤','🗿']
global.owner = ['62']
global.xprefix = '.'
global.gambar = "https://files.catbox.moe/zhbsht.jpg"
global.OWNER_NAME = "@just_me_icon" //
global.DEVELOPER = ["6703484932"] //
global.BOT_NAME = "ICON LITTLE MD"
global.bankowner = "ICON"
global.creatorName = "ICON WAVE"
global.ownernumber = '2348075552123'  //creator number
global.location = "Nigeria, Deleta state"
global.prefa = ['','!','.','#','&']
//================DO NOT CHANGE OR YOU'LL GET AN ERROR=============\
global.footer = "Iconnic" //footer section
global.link = "https://whatsapp.com/channel/0029Vav3pek65yD9mqSgd21B"
global.autobio = true//auto update bio
global.botName = "ICON"
global.version = "1.0.1"
global.botname = "ICON LITTLE MD"
global.author = "ICON"
global.themeemoji = ''
global.wagc = 'https://chat.whatsapp.com/BW2DeGMj0tVGbdgHFtHvj8'
global.thumbnail = 'https://files.catbox.moe/l9gpzm.jpg'
global.packname = "ICON X STICKER"
global.author = "\n\n\n\n\nCreate by icon\ntelegram : @just_me_icon"
global.creator = "2348075552123@s.whatsapp.net"
global.ownername = '𝐈𝐂𝐎𝐍' 
global.onlyowner = `𝘴𝘰𝘳𝘳𝘺 𝘰𝘯𝘭𝘺 𝘧𝘰𝘳  𝘰𝘸𝘯𝘦𝘳𝘴
𝘤𝘰𝘯𝘵𝘢𝘤𝘵 𝘙𝘪𝘤𝘩𝘪𝘦 𝘵𝘰 𝘣𝘦 𝘢𝘯 𝘰𝘸𝘯𝘦𝘳`
  // reply 
global.database = `𝘛𝘰 𝘣𝘦 𝘪𝘯  𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦 𝘣𝘢𝘴𝘦 𝘤𝘰𝘯𝘵𝘢𝘤𝘵 𝘙𝘪𝘤𝘩𝘪𝘦*`
  global.mess = {
wait: "```WAIT...```",
   success: "𝑺𝒖𝒄𝒄𝒆𝒔𝒔",
   on: "Icon is active", 
   prem: "FOR PREMIUM USERS ONLY ADD YOUR NUMBER TO DATABASE TO ACCESS PREMIUM", 
   off: "off",
   query: {
       text: "Where's the text?",
       link: "Where's the link?",
   },
   error: {
       fitur: "Sorry, bro, the feature has error. Please chat with the Bot Developer so it can be fixed immediately.",
   },
   only: {
       group: "Sorry, This Feature Can Only Be Used In Groups only",
private: "Sorry bro, This Feature Can Only Be Used In Private Chats",
       owner: "Sorry, This Feature Can Only Be Used by It creator",
       admin: " Sorry, This feature can only be used by Bot Admins",
       badmin: "Sorry,It Looks Like You Can't Use This Feature Because the Bot is Not yet A Group Admin",
       premium: "This feature is specifically for Premium users",
   }
}

global.hituet = 0
//false=disable and true=enable
global.autoread = false //auto read messages
global.autobio = true //auto update bio
global.anti92 = true //auto block +92 
global.autoswview = true //auto view status/story
global.autoViewStatus = true; // to toggle viewing
global.autoLikeStatus = true; // to toggle liking

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
