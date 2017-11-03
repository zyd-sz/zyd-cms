var request = require('../../../func/request.js');
var control = require('../../admin_control.js');
var config = require('../../../func/config.js');
module.exports.run = function(f,pg,mo,redis,pg2,db){
//	f = control.index(f,db);
//	console.log(f);
//	var message = JSON.parse(f.message);
var message = f.message;
var variable = config.get('variable');
	message.func = 'systemMessage';
	console.log(message);
	var s = request.post(variable.设置.聊天服务器,message);
//	f._isRander = ali_result;
	return s;
}