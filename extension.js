// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const request = require('request');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// request to baidu fanyi
	var cur_word = "";
	var connect = function (word) {
		var data = {
			'kw': word
		};
		request({
			url: 'https://fanyi.baidu.com/sug',
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			formData: data
		}, function (error, response, body) {
			if (error) {
				console.error(error);
			}
			else {
				if (word == cur_word) {
					var result = JSON.parse(body);
					vscode.window.showInformationMessage(result.data[0].v)
				}
			}
		});
	};

	context.subscriptions.push(vscode.commands.registerCommand('online-dictionary.lookUpWord', function () {
		vscode.window.showInputBox({
			prompt: 'Look up a word in the dictionary.',
			placeHolder: 'word'
		}).then((value) => {
			cur_word = value;
			connect(cur_word);
		});
	}));
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
