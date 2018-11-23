
var request = require('request');
var fs = require('fs');

var url = 'https://search.pclub.in/api/students';


let print_data = function(bot, message ,  ret , index )
{
	var out = '';
	var i ; 
	for (i = index ; i < index + 10 && i < ret.length; i++)
	{
		var temp = 
			'-----------------------------------------------------------------------\n' +
			'Name                    :  '  + ret[i]["n"] + '\n' + 
			'Username             :  ' + ret[i]["u"] + '\n' +
			'Gender                  :  ' + ret[i]["g"] + '\n' +
			'Roll Number         :  ' + ret[i]["i"] + '\n' +
			'Department          :  ' + ret[i]["d"] + '\n' +
			'Programme           :  ' + ret[i]["p"] + '\n' +
			'Room Number      :  ' + ret[i]["r"] + '\n' +
			'Hall                        :  ' + ret[i]["h"] + '\n' +
			'Blood Group         :  ' + ret[i]["b"] + '\n' +
			'Address                 :  ' + ret[i]["a"] + '\n' + 
			'------------------------------------------------------------------------\n\n';
			
			out = out + temp; 
	}

	bot.reply(message  , out + '\n');
	

	var str =  'Printed ' + index + '-' + i + ' of ' +  ret.length +  ' entries. Print more? (y/n)' ; 


	bot.createConversation(message, function(err, convo) {

	    // create a path for when a user says YES
	    convo.addMessage({
	            // text: 'Above are more results..',
	    },'yes_thread');

	    // create a path for when a user says NO
	    convo.addMessage({
	        text: 'Ending serch...',
	    },'no_thread');

	    // create a path where neither option was matched
	    // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
	    convo.addMessage({
	        text: 'Sorry I did not understand.',
	        action: 'default',
	    },'bad_response');

	    // Create a yes/no question in the default thread...
	    convo.addQuestion(str, [
	        {
	            pattern: 'y',
	            callback: function(response, convo) {
					print_data(bot,message,ret , index+ 10);	
	                convo.gotoThread('yes_thread');
	            },
	        },
	        {
	            pattern: 'n',
	            callback: function(response, convo) {
	                convo.gotoThread('no_thread');
	            },
	        },
	        {
	            default: true,
	            callback: function(response, convo) {
	                convo.gotoThread('bad_response');
	            },
	        }
	    ],{},'default');

	    if (i<ret.length)
		    convo.activate();
	});





	// bot.createPrivateConversation(message , function(err , convo) 
	// {
	// 	convo.ask(str , function(response , convo)
	// 	{
	// 		if (response.text == 'y')
	// 		{	
	// 			counter = counter + 1 ;
	// 			print_data(bot,message,ret , index+ counter*10);
	// 		}
	// 		else
	// 		{
	// 			counter = 0 ;
	// 			i = ret.length;
	// 			//convo.say('Ending search. ');
	// 			// convo.next();
	// 			convo.stop();
	// 		}
	// 	});

	// 	if (i < ret.length) {
	// 		convo.activate();
	// 	}
	// });

	
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
			bot.reply(message , 'Incomplete format. ');
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