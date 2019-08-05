//If the code keeps exiting on its own, use PM2
//  npm install pm2 --g
//  pm2 start bot.js

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var request = new XMLHttpRequest();
var xml = require('xml-parse');

var helpMessage = '\
**!help:** Returns a list of commands.\n\
**!ping:** Returns "Pong!" in the current channel.\n\
';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !help
            case 'help':
                bot.sendMessage({
                    to: userID,
                    message: helpMessage
                });
            break;
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'printId':
                console.log(`channelID: ${channelID}`);
                bot.deleteMessage(message);
            break;
            case 'goodnight':
                bot.sendMessage({
                    to: channelID,
                    message: 'Sweet Dreams!'
                });
            break;
            case 'your_turn':
                let rand = (Math.floor(Math.random() * 2));
                let msg = 'The hunt begins.';
                
                if (rand) {
                    msg = 'Understood.'
                }

                bot.sendMessage({
                    to: channelID,
                    message: msg
                });
            break;  
            case 'goodnight':
            bot.sendMessage({
                to: channelID,
                message: 'Sweet Dreams!'
            });
            break;
         }
     }
});

process.on('SIGINT', function(){
    process.exit(1);
});