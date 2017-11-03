/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var vip_info = require('./vip_info.js');
//单条显示
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	var p = {};
	f = control.index(f,db);
	f._json = vip_info.json();
	p.表名 = '平_会员表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var pgdb = require('../../../func/pgdb.js');
module.exports.form = function(f,pg,mo,redis,pg2,db) {
	//更改
	f._json = vip_info.json();
	sql = "update 平_会员表 set 类别='" + f.data.类别 + "', 角色权限='" + f.data.角色权限 + "', 状态='" + f.data.状态 + "', 红利账户='" + f.data.红利账户 + "', 出账='" + f.data.出账 + "' where id = " + f.data.id;
	sql1 = "update 平_会员资料表 set  类别='" + f.data.类别 + "' where id = " + f.data.id;
	s1 = pgdb.query(pg, sql1);
	s = pgdb.query(pg, sql);
	/*if(s.状态 != '成功'||s1.状态 != '成功' ) {
		f._状态 = '提交失败'
		return f;
	}*/
	//sqlite.close(db);

	return f;
}