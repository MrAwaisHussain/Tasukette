const Discord = require('Discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const ddiff = require('return-deep-diff')

client.on('ready', () => {
  console.log('I\'m online\n');
  //Because I know you're lazy I'm going to add a nice lil reminder
  console.log('Make sure you have started the bot with nodemon for any changes to be updated with ease');

});

let Embed = new Discord.RichEmbed()
Embed.setTitle('Generic Title')
Embed.setDescription('Generic Description');

//Bot Joins
client.on('guildDelete', guild => {
  console.log(`The following server has removed me: ${guild.name}`);
});
//Bot Leaves
client.on('guildCreate', guild => {
  guild.defaultChannel.send(`My Mighty Creator Has Summoned Me To: ${guild.name}`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.send(`Please welcome ${member.user.username} to the server`) //removing .username will mention the user on joining
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  guild.defaultChannel.send(`Please say goodbye to ${member.user.username}`) //removing .username will mention the user on remove. (.shrug why you'd want to mention)
});
//logs user changes. (Audit log has made this pretty redundant i guess.)
client.on('guildMemberUpdate', (oMember, nMember) => {
  console.log(ddiff(oMember, nMember));
});
//logs server (name) changes (.shrug)
client.on('guildUpdate', (oGuild, nGuild) => {
  console.log(ddiff(oGuild, nGuild));
});
//Bans
client.on('guildBanAdd', (guild, user) => {
  guild.defaultChannel.send(`${user.username} was just banned`);
});
//Unbans
client.on('guildBanRemove', (guild, user) => {
  guild.defaultChannel.send(`${user.username} was just unbanned`);
});
//Kicks ~~DIES HERE~~
client.on('guildMemberRemove', (guild, user) => {
  guild.defaultChannel.send(`${user.username} was just kicked`)
});
//Client Events
client.on('channelCreate', channel => {
  console.log(`A ${channel.type} by the name of ${channel.name} and was ${channel.createdAt} with the ID of ${channel.id}`);
  if (channel.type === 'text') return channel.send('You were successful in creating this channel.');
});
//Responds to message
client.on('message', message => {
  if (message.content === 'whats up guys') {
    message.channel.send('Im fine');
  }
});
//Responds with an embed
client.on('message', message => {
  //
  if (message.content === 'Hi') {
    //
    message.channel.send('',{embed: Embed.setTitle("Hi Recieved")}, {embed: Embed.setDescription("Say Hi Back")});
  }
});

var prefix = "~"
//introduce command prefix by (prefix + "w/e")
client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  // console.log('A fate worse than death. Double Death?!') //Is a joke
  let args = message.content.split(' ').splice(1);
  
  var argresult = args.join(' ')

  if (message.author.bot) return; //If a selfbot, replace with message.author !== client.user

  if (message.content.startsWith(prefix + 'Ping')) {
      message.channel.send(`Pong \`${Date.now() - message.createdTimestamp} ms\`` );
  } 

  });

client.login(settings.token);
