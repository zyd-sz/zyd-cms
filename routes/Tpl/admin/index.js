var control = require('../../admin_control.js');
var sqlite = require('../../../func/sqlite.js');
//已经是同步的，用异步写也会同步执行
module.exports.run = function(f,pg,mo,redis,pg2,db){
	f = control.index(f,db);
	sqlite.close(f.db);
	return f;
}