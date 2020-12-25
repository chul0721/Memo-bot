const Discord = require('discord.js');
module.exports = {
    name: 'delete',
    description: 'you ban',
    usage: '당연한걸 뭘 물어',
    run: async (client, message, args, ops) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("어디서 쪼끄만게 메시지 관리 권한도 없는 주제에").then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("관리 권한 내놔").then(m => m.delete(5000));
        }

        message.channel.delete()
            .catch(err => message.reply(`Something went wrong... ${err}`));

    }
}