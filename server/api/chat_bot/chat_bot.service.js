'use strict';

var bankingInfo = require('../../../banking.json'),
	jsonfile = require('jsonfile')
 
 
exports.getBalance = function(response, account) {
	
	if(bankingInfo.balances[account]){
		
		var balance = bankingInfo.balances[account].balance;
		console.log('BALANCE', balance);
		response.output.text[0] = response.output.text[0] + '\n' + balance;
		return response;
	
	}
	else {
		
		return response;
	
	}

};

exports.getListandBalance = function(response, text) {
	
	response.output.text[0] = response.output.text[0] + '\n' + bankingInfo.accounts.length.toString() + ' accounts:';
	
	for (var i = 0; i < bankingInfo.accounts.length; i++) {
		
		response.output.text[0] = response.output.text[0] + '\n' + (i + 1) + '. ' + bankingInfo.accounts[i];
	
	}

	response.output.text[0] = response.output.text[0] + '\n' + 'Please choose which account you would like to see the balance for.';

	return response;

};

exports.getList = function(response, text) {
	
	response.output.text[0] = response.output.text[0] + '\n' + bankingInfo.accounts.length.toString() + ' accounts:';
	
	for (var i = 0; i < bankingInfo.accounts.length; i++) {
		
		response.output.text[0] = response.output.text[0] + '\n' + (i + 1) + '. ' + bankingInfo.accounts[i];
	
	}

	return response;

};

exports.getAllTransactions = function(response, text) {
	for(var i = 0; i < bankingInfo.allTransactions.length; i++){
		response.output.text[0] = response.output.text[0] + bankingInfo.allTransactions[i] + ' ';
	}
};

exports.getSpecificTransaction = function(response, month) {

	for(var i = 0; i< bankingInfo.transactions[month].length; i++) {
		response.output.text[0] = response.output.text[0] + ' ' + bankingInfo.transactions[month][i].text;
	}
};

exports.moveMoney = function(response, text) {
	console.log('MOVEING MONEYERG', bankingInfo.balances[response.context.takeAccount].balance, text);
	bankingInfo.balances[response.context.takeAccount].balance = '$' + (Number(bankingInfo.balances[response.context.takeAccount].balance.replace(/[^0-9\.-]+/g,"")) - parseInt(response.context.amount)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	bankingInfo.balances[response.context.giveAccount].balance = '$' + (Number(bankingInfo.balances[response.context.giveAccount].balance.replace(/[^0-9\.-]+/g,"")) + parseInt(response.context.amount)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	console.log('info', bankingInfo);
	jsonfile.writeFile('../../../banking.json', bankingInfo, function (err) {
	  console.error(err)
	})
}