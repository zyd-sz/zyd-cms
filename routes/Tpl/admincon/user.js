//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var sqlite = require('../../../func/sqlite.js');
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	f = control.index(f,db);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";

	if(f.data != null) {
		if(f.data.姓名 != null && f.data.姓名 != '') {
			where += " and 姓名 like '%" + f.data.姓名 + "%'";
		}
		if(f.data.登录名 != null && f.data.登录名 != '') {
			where += " and 登录名 = '" + f.data.登录名 + "'";
		}
		if(f.data.权限组 != null && f.data.权限组 != '') {
			where += " and 权限组 = '" + f.data.权限组 + "'";
		}
	}
	p.sql = "select id,姓名,权限id,登录名,性别,联系方式,email,权限组,状态,录入人,录入时间 from 管_管理员表 where"+where;
	//做一个判断引用哪个数据库，放到f里面
	f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p,f,pg,db);
	sqlite.close(f.db);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "用户",
		"模块": "admincon",
		"func": "user",
		"页数": "10",
		"表名": "管_管理员表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}