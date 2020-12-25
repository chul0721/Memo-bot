const { readdirSync } = require('fs')
const Ascii = require('ascii-table')
const table = new Ascii('Commands')

table.setHeading('Command', 'Load status')

module.exports = (client) => {
  readdirSync('./commands/').forEach(dir => {
    const commands = readdirSync('./commands/').filter(file => file.endsWith('.js'))

    for (const file of commands) {
      const pull = require(`../commands/${file}`)

      if (pull.name) {
        client.commands.set(pull.name, pull)
        table.addRow(file, '✅')
      } else {
        table.addRow(file, '❌  -> missing a help.name, or help.name is not a string.')
        continue
      }

      if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
    }
  })

  console.log(table.toString())
}
