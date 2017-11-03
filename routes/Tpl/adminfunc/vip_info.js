//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var sqlite = require('../../../func/sqlite.js');
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";
	//查询条件还没有
	if(f.data != null) {
		if(f.data.账号 != null && f.data.账号 != '') {
			where += "and a.账号 = '" + f.data.账号 + "'";
		}
		if(f.data.昵称 != null && f.data.昵称 != '') {
			where += "and a.昵称 = '" + f.data.昵称 + "'";
		}		
		if(f.data.唯一id != null && f.data.唯一id != '') {
			where += "and a.唯一id = '" + f.data.唯一id + "'";
		}
		if(f.data.手机号 != null && f.data.手机号 != '') {
			where += "and a.手机号 = '" + f.data.手机号 + "'";
		}
		if(f.data.状态 != null && f.data.状态 != '') {
			where += "and a.状态 = '" + f.data.状态 + "'";
		}
		if(f.data.类别 != null && f.data.类别 != '') {
			where += "and a.类别 = '" + f.data.类别 + "'";
		}
		if(f.data.开始日期 != null && f.data.开始日期 != '') {
			where += "and a.录入时间 >= '" + f.data.开始日期 + "'";
		}
		if(f.data.结束日期 != null && f.data.结束日期 != '') {
			where += "and a.录入时间 <= '" + f.data.结束日期 + "'";
		}
	}
	//默认查询所有的数据
	p.sql = "select a.id,a.唯一id,a.账号,a.手机号,a.状态,a.超级商家,a.类别,a.随机码,a.昵称,b.头像,b.性别,b.职业,b.年龄,b.生日,b.个性签名,b.位置,a.录入时间,a.角色权限,a.商城权限 ,a.手机id from 平_会员表  a left join 平_会员资料表  b  on a.账号 = b.账号     where " + where;
	//做一个判断引用哪个数据库，放到f里面
	//f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	if(f.arg.ord == null || f.arg.ord == '') f.arg.ord = 'a.录入时间';
	f = share.lists(p, f, pg);

	sqlite.close(f.db);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "用户资料列表",
		"模块": "adminfunc",
		"func": "vip_info",
		"页数": "10",
		"表名": "平",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}