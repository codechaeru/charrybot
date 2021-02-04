const Discord = require('discord.js');

module.exports = {
    name: "핑", 
    description: "print server ping",

    async run (client, message, args) { 

        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\`현재핑은 ${Date.now() - message.createdTimestamp}\`ms 입니다!`);
        
        message.channel.send(ping); 
    }
}