'use strict';
var config = require('../../configuration/environment/development.js'),
	watson = require( 'watson-developer-cloud' ),
	vcapServices = require( 'vcap_services' ),
	conversationCredentials = vcapServices.getCredentials('conversation'),
	conversation = watson.conversation( {
		url: 'https://gateway.watsonplatform.net/conversation/api',
		username: conversationCredentials.username || config.CONVERSATION_USERNAME,
		password: conversationCredentials.password || config.CONVERSATION_PASSWORD,
		version_date: '2016-07-11',
		version: 'v1'
	}),
	bankingInfo = require('../../../banking.json'),
	chatBotService = require('./chat_bot.service.js');


function updateMessage(input, response) {
	
	console.log('response where', response);
	var responseText = null;

	if (!response.output) {
		
		response.output = {};
	
	} else {
		if(response.context.funct) {
			console.log('what', response.context.funct)
			
			chatBotService[response.context.funct](response, response.input.text);	
		}
		// if (response.context.get_accounts) {
		// 	console.log('chat_bot', chatBotService);
		// 	chatBotService.getList(response);

		
		// } else if (response.context.get_balance) {
			
		// 	var balance = bankingInfo.balances[response.input.text].balance;
		// 	console.log('BALANCE', balance);
		// 	response.output.text[0] = response.output.text[0] + '\n' + balance;
		
		// }
		
		return response;
	
	}

	response.output.text = responseText;
	return response;

}


exports.postMessage = function(req, res) {
	
	console.log('How about here', req.body);
	var workspace = config.WORKSPACE_ID || '4e197f9a-df15-4715-b4ad-760863e2b666';
	if ( !workspace || workspace === '<workspace-id>' ) {

		return res.json({
			'output': {
				'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
						'<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
						'Once a workspace has been defined the intents may be imported from ' +
						'<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
			}
		});
	
	}
	var payload = {
		workspace_id: workspace,
		context: {},
		input: {}
	};

	if (req.body) {

		if (req.body.input) {
			
			payload.input = req.body.input;
		
		}
		if (req.body.context) {
		
		// The client must maintain context/state
			payload.context = req.body.context;
		
		}
	
	}
	console.log('PAYLOAD', payload);
	// Send the input to the conversation service
	conversation.message( payload, function(err, data) {

		console.log('WHAT IS THE DATA', data);
		if ( err ) {

			return res.status( err.code || 500 ).json( err );
		
		}
		
		return res.json( updateMessage( payload, data ) );
	
	});

};
