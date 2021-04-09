const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'vip',
    aliases: ['special', 'vip'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Rei was here');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ffdd06').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Rei was here');

        if (!client.config.yönetim.some(id => message.member.roles.cache.has(id))) {
            message.react("❌")
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!")).then(x => x.delete({timeout: 5000}))
        }


        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!")).then(x => x.delete({timeout: 5000}))
        message.react("❌")
        await message.guild.members.cache.get(member.id).roles.add(client.config.vipRoles)
        message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`${member} adlı kullanıcıya <@VİPROLÜ> rolü verildi`).setColor('#ffdd06').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Kullanıcı .e/.k komutları ile kayıt edilebilir!'))
        message.react("✅")
        
    }
}

////////////////////////////////Rei Was Here/////////////////////////////////////