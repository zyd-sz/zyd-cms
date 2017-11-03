/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var userUpdate = require('./user_update.js');
//单条显示
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	f._xhtml = 'Tpl/admincon/user_update';
	f = userUpdate.run(f,pg,mo,redis,pg2,db);
	return f;
}

//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
module.exports.form = function(f,pg,mo,redis,pg2,db) {
	f = userUpdate.form(f,pg,mo,redis,pg2,db);
	return f;
}