/**
* @module skills/Helpers/Status.js
*/

let path = require('path');
const sqlite3 = require('sqlite3').verbose();

const BUSY_NOW = `The table seems to be busy at the moment.`;
const PEOPLE_PRESENT = `The schedule seems clear, but there are people present at the table.`;
const TABLE_FREE = `The table seems to be free at the moment!`;
const TABLE_FUTURE_SUGGESTIONS = `The table seems to be free during the following slot(s).`;
const BUSY_FOR_LONG = `Unfortunately, the table doesn't seem to be free in the foreseeable future. :confused:`;

const urls = [
"https://i.imgur.com/6ovEqpJ.jpg",
"https://www.dailydot.com/wp-content/uploads/fc3/4f/b3b78093d00ff90b.jpg",
"https://thechive.files.wordpress.com/2018/06/best-memes-of-the-week-43-photos-253.jpg?quality=85&strip=info&w=600",
"https://images.indianexpress.com/2017/10/kbc-memes_twitter_759.jpg",
"https://thechive.files.wordpress.com/2018/01/best-memes-of-the-week-34-photos-2526.jpg?quality=85&strip=info&w=600",
"https://runt-of-the-web.com/wordpress/wp-content/uploads/2017/04/funny-memes-about-donald-trump.jpg"
]
module.exports = async function(bot, message) {
  let isFreeSrcDB = true;
  let isFreeSrcFeed = true;
  // var rn = require('random-number');
  var options = {
    min: 0,
    max: urls.length-1,
    integer: true
  }
  bot.reply(message, {
  "attachments": [
      {
          "fallback": "Error 404: Meme not found!! Try Kicking your PC",
          "image_url": urls[Math.floor(Math.random() * (urls.length))]
      }
    ]
  } 
  );
    
}


