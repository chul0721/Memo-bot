const Discord = require('discord.js');
module.exports = {
    name: 'setup',
    description: '니 마음속에 저장',
    usage: '당연한걸 뭘 물어',
    run: async (client, message, args, ops) => {
        const server = message.guild;
        const m = message.content.split(' ')[1]
        server.channels
            .create(`📔ㅣ${m}`, {
                type: 'text',
                parent_id: "790059767422648341"
            })
            .then((channel) => {
                const categoryID = "790059767422648341"
                channel.setParent(categoryID)            
            })
    }
}