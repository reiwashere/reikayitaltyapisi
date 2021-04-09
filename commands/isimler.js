const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'isimler',
    aliases: ['isimler'],

    run: async(client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Öncellikle Bir Kullanıcı Belirtmelisin.").then(x => x.delete({timeout: 5000}))
        message.react("❌")
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcının Daha Öncedenki İsmi Bulunmuyor.").then(x => x.delete({timeout: 5000}))
        message.react("❌")
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`).then(x => x.delete({timeout: 15000}))
            .setFooter('Rei was Here')
            .setTimestamp()
        message.channel.send(embed)
        message.react("✅")
    }
}

////////////////////////////////Rei Was Here/////////////////////////////////////