const weather = require('weather-js');
const Discord = require('discord.js');

module.exports = {
    name: "날씨",
    description: "weather forecast",

    async run (client, message, args) {

        weather.find({search: args.join (" "), degreeType: 'C'}, function (error, result){

            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('올바른 지역 을/를 입력 해주세요!')

            if(result === undefined || result.length === 0) return message.channel.send('**해당 지역**을 검색할 수 없습니다..');

            var current = result[0].current;
            var location = result[0].location;

            const weatherEmbed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`${current.observationpoint}의 날씨 정보 입니다`)
            .setThumbnail(current.imageUrl)
            .setColor(0x3090C7)
            .addField('온도 타입', '섭씨', true)
            .addField('현재 온도', `${current.temperature}°`, true)
            .addField('체감 온도', `${current.feelslike}°`, true)
            .addField('습도', `${current.humidity}%`, true)

            message.channel.send(weatherEmbed)
        })
    }
}