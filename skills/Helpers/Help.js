/**
* @module skills/Helpers/Status.js
*/

let fs = require("fs");
let path = require('path');
const sqlite3 = require('sqlite3').verbose();

const HELP_MESSAGE = "Hi I am Natasha. Thanks to Invictus, I am here to make your lives @IIT Kanpur simpler by assisting you in your journey to becoming a IIT Kanpur Table Tennis Champion \nUnlike the people here, I need some rest so my consulting hours are 10 a.m. to 8 p.m.\nPS: You can call me Nat.\n\nHere is what all I can do for u\ngetSchedule  ([from time] ([to time]))              next 2 hours TT table booking schedule (can use from time or from to time) \nbook                Book table from this to this for us\nmy bookings            show my bookings for today\nunbook  time/all         unbook booking at a time or all \ni am bored        snappy comebacks / memes\nhelp                     To get this menu back"

module.exports = async function(bot, message) {
    bot.reply(message, HELP_MESSAGE);
}
