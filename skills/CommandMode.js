/**
* @module skills/CommandMode.js
*/

let path = require('path');

let book = require(path.join(__dirname, 'Helpers/Book.js'));
let myBookings = require(path.join(__dirname, 'Helpers/MyBookings.js'));
let unbook = require(path.join(__dirname, 'Helpers/Unbook.js'));
let status = require(path.join(__dirname, 'Helpers/Status.js'));
let schedule = require(path.join(__dirname, 'Helpers/Schedule.js'));
let meme = require(path.join(__dirname, 'Helpers/Meme.js'));
let help = require(path.join(__dirname, 'Helpers/Help.js'));
let reset = require(path.join(__dirname, 'Helpers/ResetAll.js'));
let search= require(path.join(__dirname, 'Helpers/Search.js'));

const TIME = `(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]`;
const SCHEDULE_COMMANDS = ['\\s*getSchedule\\s*$', `\\s*getSchedule from ${TIME}\\s*$`, `\\s*getSchedule from ${TIME} to ${TIME}\\s*$`]
const UNBOOK_COMMANDS = ['\\s*unbook all\\s*$', `\\s*unbook ${TIME}\\s*$`]
const SEARCH_COMMANDS = ['search' , '^search - '] // give a regex

module.exports = function(controller) {
  controller.hears(['howdy'], 'direct_message', function(bot, message) {
      bot.reply(message, ':taco:');
  });

  controller.hears(['identify yourself'], 'direct_message', function(bot, message) {
      bot.reply(message, 'I am a robot, I cannot lie.');
  });

  controller.hears('\\s*status$', 'direct_message', function(bot, message) {
    status(bot, message);
  });

  controller.hears('\\s*i am bored$', 'direct_message', function(bot, message) {
    meme(bot, message);
  });

  controller.hears('\\s*help$', 'direct_message', function(bot, message) {
    help(bot, message);
  });

  controller.hears(SCHEDULE_COMMANDS, 'direct_message', function(bot, message) {
    schedule(bot, message);
  });

  controller.hears('my bookings', 'direct_message', function(bot, message) {
    myBookings(bot, message);
  });

  controller.hears('^book$', 'direct_message', function(bot, message) {
    book(bot, message);
  });

  controller.hears(UNBOOK_COMMANDS, 'direct_message', function(bot, message) {
    unbook(bot, message);
  });

  controller.hears(SEARCH_COMMANDS, 'direct_message', function(bot, message) {
    bot.reply(message , 'Hey!')
    search(bot, message);
  });


  controller.hears('^reset_all$', 'direct_message', function(bot, message) {
    reset(bot, message);
  });





  controller.hears(['tasks','todo'], 'direct_message', function(bot, message) {

        // load user from storage...
        controller.storage.users.get(message.user, function(err, user) {

            // user object can contain arbitary keys. we will store tasks in .tasks
            if (!user || !user.tasks || user.tasks.length == 0) {
                bot.reply(message, 'There are no tasks on your list. Say `add _task_` to add something.');
            } else {

                var text = 'Here are your current tasks: \n' +
                    generateTaskList(user) +
                    'Reply with `done _number_` to mark a task completed.';

                bot.reply(message, text);

            }

        });

    });

    // listen for a user saying "add <something>", and then add it to the user's list
    // store the new list in the storage system
    controller.hears(['add (.*)'],'direct_message,direct_mention,mention', function(bot, message) {

        var newtask = message.match[1];
        controller.storage.users.get(message.user, function(err, user) {

            if (!user) {
                user = {};
                user.id = message.user;
                user.tasks = [];
            }

            user.tasks.push(newtask);

            controller.storage.users.save(user, function(err,saved) {

                if (err) {
                    bot.reply(message, 'I experienced an error adding your task: ' + err);
                } else {
                    bot.api.reactions.add({
                        name: 'thumbsup',
                        channel: message.channel,
                        timestamp: message.ts
                    });
                }

            });
        });

    });

    // listen for a user saying "done <number>" and mark that item as done.
    controller.hears(['done (.*)'],'direct_message', function(bot, message) {

        var number = message.match[1];

        if (isNaN(number)) {
            bot.reply(message, 'Please specify a number.');
        } else {

            // adjust for 0-based array index
            number = parseInt(number) - 1;

            controller.storage.users.get(message.user, function(err, user) {

                if (!user) {
                    user = {};
                    user.id = message.user;
                    user.tasks = [];
                }

                if (number < 0 || number >= user.tasks.length) {
                    bot.reply(message, 'Sorry, your input is out of range. Right now there are ' + user.tasks.length + ' items on your list.');
                } else {

                    var item = user.tasks.splice(number,1);

                    // reply with a strikethrough message...
                    bot.reply(message, '~' + item + '~');

                    if (user.tasks.length > 0) {
                        bot.reply(message, 'Here are our remaining tasks:\n' + generateTaskList(user));
                    } else {
                        bot.reply(message, 'Your list is now empty!');
                    }
                }
            });
        }

    });

    // simple function to generate the text of the task list so that
    // it can be used in various places
    function generateTaskList(user) {

        var text = '';

        for (var t = 0; t < user.tasks.length; t++) {
            text = text + '> `' +  (t + 1) + '`) ' +  user.tasks[t] + '\n';
        }

        return text;

    }




};
