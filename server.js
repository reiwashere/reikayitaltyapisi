

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



//////////////////////////////////BOTUN DURUMU/////////////////////////////////////////

client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'Rei was here' }, status: 'dnd' })
    client.channels.cache.get('').join()
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })

///////////////////////////YERLEŞTİRİLECEK ROLLER////////////////////////

client.config = {
    vipRoles: [''], //vip
    unregisteres: [''], // kayıtsız
    maleRoles: ['', ''], // erkek
    girlRoles: ['', ''], // bayan
    mods: [""], // yetkili
    channelID: '', // kayıt kanalı
    yönetim: [''] // üst yönetim
}

client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})

////////////////////////////SUNUCU/////////////////////////////////////

client.on("userUpdate", async function(oldUser, newUser) {
    const guildID = ""//sunucu
    const roleID = ""//taglırolü
    const tag = ""//tag
    const chat = ''// chat
    const log2 = '' // log kanalı
  
 //////////////////////////////////////////////////TAGI ÇIKARTMA MESAJI/////////////////////////////////////////////////////

    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('Rei was here');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`✭\` çıakrtarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`✭\` alarak ailemize katıldı`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "0000" && newUser.discriminator !== "0000") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketinden \`0000\` çıakrtarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== "0000" && newUser.discriminator == "0000") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketine \`0000\` alarak ailemize katıldı`))
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#0000)`)
        }
    }
  
  })

////////////////////////////////////////HOŞGELDİN MESAJI////////////////////////////////////////////


client.on('guildMemberAdd', (member) => {

    const mapping = {
        " ": "",
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
    };
    var toplamüye = member.guild.memberCount
    var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let createAt = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]")
    let createAt2 = moment.duration(memberDay).format("DD [Gün], HH [saat], mm [dakika]")
    if (memberDay > 604800000) {
        client.channels.cache.get(client.config.channelID).send(`:tada::tada: Sunucumuza hoşgeldin! ${member} - \`${member.id}\`
Seninle birlikte **${emotoplamüye}** üyeye ulaştık.
Hesabın **${createAt} ${createAt2}** önce açılmış.

__Teyit odalarına girip, ses teyit vererek kayıt olabilirsin.__ :tada::tada:



 Hesabın **${createAt}** önce açılmış`)
    } else {
        client.channels.cache.get(client.config.channelID).send(
            new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Şüpheli!`)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setFooter(`Rei was here`))
    }
})


client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`TAGINIZ`);
    } else if (msg.content === 'tag') {
        msg.channel.send(`TAGINIZ`);
    } else if (msg.content === '.tag') {
        msg.channel.send(`TAGINIZ`);
    } else if (msg.content === ".rol-ver") {
        msg.guild.members.cache.forEach(x => {
            x.roles.add("TAGLI ROLÜNÜ GİR")
        })
    }
});


client.login('TOKENİ GİRİN')


////////////////////////////////Rei Was Here/////////////////////////////////////