var control = require('../../admin_control.js');
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	f = control.index(f,db);
	var 主从share = require('../../Tpl/' + f.arg._m + '/' + f.arg._n + '.js');
	主从json = 主从share.json();
	主从json = 主从json.主从编辑;
	f.r = 主从json;
	//res.send('调用异常').end();
	return f;
}
