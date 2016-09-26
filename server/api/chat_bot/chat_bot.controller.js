'use strict';
var request = require('request'),
	config = require('../../configuration/environment/development.js'),
	watson = require( 'watson-developer-cloud' ),
	conversation = watson.conversation( {
		url: 'https://gateway.watsonplatform.net/conversation/api',
		username: process.env.CONVERSATION_USERNAME || 'ce02d7ae-7e70-454c-b570-5775fbc8862c',
		password: process.env.CONVERSATION_PASSWORD || 'BkVXKipO5TgF',
		version_date: '2016-07-11',
		version: 'v1'
	}),
	bankingInfo = require('../../../banking.json');


function updateMessage(input, response) {
	
	console.log('response where', response);
	var responseText = null,
		id = null;
	if (!response.output) {
		
		response.output = {};
	
	} else {
		
		if (response.context.get_accounts) {
			
			response.output.text[0] = response.output.text[0] + '\n' + bankingInfo.accounts.length.toString() + " accounts:";
			
			for(var i = 0; i < bankingInfo.accounts.length; i++) {
				
				response.output.text[0] = response.output.text[0] + '\n' + (i + 1) +'. ' + bankingInfo.accounts[i];
			}
		
		response.output.text[0] = response.output.text[0] + '\n' + "Please choose which account you would like to check.";
		
		console.log('WHAT IS THIS', response.output.text[0]);
		
		}
		else if (response.context.get_balance) {
			
			var balance = bankingInfo.balances[response.input.text].balance;
			console.log('BALANCE', balance);
			response.output.text[0] = response.output.text[0] + '\n' + balance 
		
		}
		
		return response;
	}

	response.output.text = responseText;
	return response;
}


exports.postMessage = function(req, res) {
	console.log('How about here', req.body);
	var workspace = process.env.WORKSPACE_ID || '4e197f9a-df15-4715-b4ad-760863e2b666';
	if ( !workspace || workspace === '<workspace-id>' ) {
	  return res.json({
	    'output': {
	      'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
	      '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
	      'Once a workspace has been defined the intents may be imported from ' +
	      '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
	    }
	  });
	};
	var payload = {
	  workspace_id: workspace,
	  context: {},
	  input: {}
	};
	if ( req.body ) {
	  if ( req.body.input ) {
	    payload.input = req.body.input;
	  }
	  if ( req.body.context ) {
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
	} );

};
