const { REST, Routes } = require('discord.js');

const { clientId, guildId, discordToken } = require('./config.json');
const rest = new REST({ version: '10' }).setToken(discordToken);

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'hello',
    description: 'Replies with hello!',
  },
];

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require('discord.js');

// 告诉 Discord 你的机器人应该接收公会事件（Guild events）
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('config',{clientId, guildId, discordToken})
  // 向特定频道发送消息
  const channelCache = client.channels.cache;
  const channel = channelCache.get(guildId);
  channel.send('Boter is ready')
});

client.on('interactionCreate', async (interaction) => {
  console.log('interactionCreate-->',interaction.commandName)
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === '你好') {
    await interaction.reply('你也好!');
  }

  if (interaction.commandName === 'hello') {
    await interaction.reply('你也好!');
  }

  if (interaction.commandName === 'ping') {
    await interaction.reply('I got you!');
  }
});

client.login(discordToken);
