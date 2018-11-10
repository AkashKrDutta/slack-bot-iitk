
var request = require('request');
var fs = require('fs');
var urltemp = 'http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20WHERE%20sy'+
  			  'mbol%3D%27WRC%27&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback';

var url = 'https://search.pclub.in/api/students';



let print_data = function(bot, message ,  ret , index )
{
	var out = '';
	var i ; 
	for (i = index ; i < index + 10 && i < ret.length; i++)
	{
		var temp = 
			'-----------------------------------------------------------------------\n' +
			'Name                : '  + ret[i]["n"] + '\n' + 
			'Username       : ' + ret[i]["u"] + '\n' +
			'Gender           : ' + ret[i]["g"] + '\n' +
			'Roll Number : ' + ret[i]["i"] + '\n' +
			'Department  : ' + ret[i]["d"] + '\n' +
			'Programme    : ' + ret[i]["p"] + '\n' +
			'Room Number : ' + ret[i]["r"] + '\n' +
			'Hall                   : ' + ret[i]["h"] + '\n' +
			'Blood Group : ' + ret[i]["b"] + '\n' +
			'Address          : ' + ret[i]["a"] + '\n' + 
			'------------------------------------------------------------------------\n\n';
			
			out = out + temp; 
	}

	bot.reply(message  , out + '\n');
	

	var str =  'Printed ' + index + '-' + i + ' of ' +  ret.length +  ' entries. Print more?(y)' ; 


	bot.createPrivateConversation(message , function(err , convo) 
	{
		//convo.say('I am here');
		if (i == ret.length)
			convo.stop();

		convo.ask(str , function(response , convo)
		{
			if (response.text == 'y')
			{
				print_data(bot,message,ret , i);
			}
			else
			{
				convo.stop();
				convo.stop();
			}
		});
		convo.activate();
	});
}		





module.exports = function(bot , message)
{

	// FAILED
	// request(url , function(err , response , body)
	// {
	// 	bot.reply(message , 'This is the response I got!' );
	// 	console.log(body);

	// });

	fs.readFile('Data' , 'utf8' , function(err , content)
	{
		// data is in content
		var arr = JSON.parse(content);
		let command = message.text.split(' - ');
		if (command.length == 1)
		{
			bot.reply(message , 'One word Command');
		}
		else if (command.length == 2)
		{
			var filters = command[1].split(',')
			var ret = [] ;
			//bot.reply(message , 'Two Word Command');
			for (var i = 0 ; i < arr.length ; i++)
			{
				var obj = arr[i];
				var flag = 1 ;
				for (var j = 0; j < filters.length ; j++ )
				{
					if (! (obj["a"] == filters[j] || obj["b"] == filters[j] || obj["d"] == filters[j] || 
						   obj["g"] == filters[j] || obj["h"] == filters[j] || obj["i"] == filters[j] || 
						   obj["n"] == filters[j] || obj["p"] == filters[j] || obj["r"] == filters[j] ||
						   obj["u"] == filters[j]))
					{
						flag = 0;
					}
				}
				if (flag == 1)
				{
					ret.push(obj);
				}
			}
			bot.reply(message , 'Found ' + ret.length + ' item(s)');
			
			print_data(bot, message , ret , 0 );
		
		}	 
		else
		{
			bot.reply(message , 'Invalid Format');
		}

	});
}