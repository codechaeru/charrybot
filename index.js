const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token } = process.env.token;

const { readdirSync } = require('fs');
const { join } = require('path');

client.commands = new Discord.Collection();

const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));

for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("error", console.error);

client.on('ready', () => {
  console.log(`${client.users.cache.size}명`) // 봇을 사용 하고있는 모든 유저
  console.log(`${client.guilds.cache.size}개로`) //봇이 참가해있는 모든 서버 표시
  console.log(`봇 ID :${client.user.id} 로 로그인 성공!`);
  client.user.setActivity('=도움말') //상태메시지
});

client.on('message', (message) => {
    if(message.content === '=날씨') {
      message.reply('올바른 사용법 : =날씨 [지역이름]');
    }else{
        if(message.content === '=코로나 사용법'){
            message.reply('코로나 사용법 : =코로나 [나라이름 약자]')
        }else{
            if(message.content === '=코로나사용법'){
                message.reply('코로나 사용법 : =코로나 [나라이름 약자]')
            }
    }
  }});

client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.login(token);