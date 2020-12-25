const Discord = require('discord.js')
const client = new Discord.Client({
  disableEveryone: true
})
const fs = require('fs')
const config = require('./config.json')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync('./commands/')

require('./handlers/command.js')(client)

client.on('ready', () => {
    console.log(`${client.user.tag}으로 접속을 완료하였습니다.`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `학교 폭파`,
            type: 'PLAYING'
        }
    });
});

const prefix = config.prefix

client.on('message', message => {
    if (message.channel.type === 'dm') return
    if (!message.content.startsWith(prefix)) return
    if (message.author.bot) return
    if (!message.guild) return
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return
  
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
  
    if (command) {
      command.run(client, message, args)
    }
})

client.login(config.token);
