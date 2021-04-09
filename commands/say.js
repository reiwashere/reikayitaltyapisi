const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'say',
    aliases: ['say'],
    run: async(client, message, args) => {
        var tag = 'Lév'
        var etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "0212").size;
        var toplamüye = message.guild.memberCount
        var toplamAile = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0212").size;
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag)).size

        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))    
            .setDescription(`\`>\` Sesli kanallarda toplam **${Sesli}** kullanıcı var!
            \`>\` Lév tagını toplam **${tag}** kişi alıp ailemize katıldı!
            \`>\` #0212 etiketini toplam **${etiket}** kişi alıp ailemize katıldı!
            \`>\` Sunucumuzda toplam **${toplamüye}** üye var!
            \`>\` Sunucumuzda toplam **${online}** çevrimiçi üye var!`)
            .setTimestamp()
            .setThumbnail(guild.avatarURL())
            .setFooter('Rei was here')
        message.channel.send(embed)
        message.react("✅")
    }
}

////////////////////////////////Rei Was Here/////////////////////////////////////