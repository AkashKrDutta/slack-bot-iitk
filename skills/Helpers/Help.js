let fs = require("fs");
let path = require('path');
const sqlite3 = require('sqlite3').verbose();

const HELP_MESSAGE = "Hi I am IIT Kanpur Official slack bot. Thanks to CS727A, I am here to make your lives @IIT Kanpur simpler by "+
					 " assisting you in your journey to becoming an efficient time manager \n"+
					 " Unlike the people here, I need some rest so my consulting hours are 10 a.m. to 8 p.m.\n\n\n"+ "TT TABLE\n"+
					// " PS: You can call me Nat.\n\nHere is what all I can do for u.\n" +
					 " getSchedule  ([from time] ([to time]))              next 2 hours TT table booking schedule (can use from time or from to time) \n"+
					 " book                                                                    Book table from this to this for us\n"+
					 " my bookings                                                       show my bookings for today\n"+
					 " unbook  time/all                                                unbook booking at a time or all \n\n\n"+"MISCELLANEOUS\n"+
					 " i am bored                                                          snappy comebacks / memes\n\n\n"+ "STUDENT SEARCH\n"+
					 " search - ([category])([,category])*                     search students with provided categories\n\n\n"+"TODO LIST\n"+
					 " tasks/todo                                                          view your pending tasks\n"+
					 " add ([task]) 												  	   add task to your todo list\n"+
					 " done ([i])                                                             delete ith task from your task list\n\n\n"+"NEED HELP?\n"+
					 " help                                                                     To get this menu back";

module.exports = async function(bot, message) {
    bot.reply(message, HELP_MESSAGE);
}
