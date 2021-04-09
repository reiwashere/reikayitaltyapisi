const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'kayıtsız',
    aliases: ['kayıtsız', 'unreg', 'unregister'],

    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Rei was here');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            message.react("❌")
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor.")).then(x => x.delete({timeout: 5000}))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embed.setDescription("Lütfen Bir Kullanıcı Etiketle")).then(x => x.delete({timeout: 5000}))
        message.react("❌")
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            message.react("❌")
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 5000}))
        }
        if (member.premiumSinceTimestamp > 0 || member.roles.cache.has(client.config.vipRoles)) return message.channel.send(embed.setDescription("Booster ve vipleri kayıtsıza atamazsın!")).then(x => x.delete({timeout: 5000}))
        member.roles.set(client.config.unregisteres)
        message.react("✅")
        message.channel.send(embed.setDescription("Kullanıcı Kayıtsız Kısmına Atıldı.")).then(x => x.delete({timeout: 8000}))
        db.delete(`kayıt_${member.id}`)
    }
}

////////////////////////////////Rei Was Here/////////////////////////////////////