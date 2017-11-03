/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
var share = require('../admin/share.js');
//单条显示
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	//重定向
	//f = deleteOne(f,pg,mo,redis,pg2,db);
	//	if(f.isPower == true){
	//		eval("f = "+f.arg._name+"(f,pg,mo,redis,pg2,db);");	
	//	}else{
	//		f._isRander = '无此权限';
	//	}
	f = control.index(f,db);
	pgdb.query(pg,"BEGIN;");
	eval("f = " + f.arg._name + "(f,pg,mo,redis,pg2,db);");
	pgdb.query(pg,"COMMIT;");
	return f;
}
//eval("f = "+f.arg._name+"(f,pg,mo,redis,pg2,db);");	

/*
 * 重置密码
 */
function updatepwd(f,pg,mo,redis,pg2,db) {
	//重定向

	var sql = "update 平_会员表  set 登录密码 = 'e10adc3949ba59abbe56e057f20f883e' where id ='" + f.arg.id + "'";
	f.r = pgdb.query(pg, sql);
	var p = {};
	p.类别 = '重置会员表密码';
	p.明细 = '';
	var shop_yijifenlei = require('./vip_info.js');
	f._json = shop_yijifenlei.json();
	share.logs(p, f, db);	
	f._isRander = '提交成功';
	return f;
}

function updateAccount(f,pg,mo,redis,pg2,db) {
	//重定向
	var sql = "update 平_会员表  set 出账 = '否' , 状态='停用' where id ='" + f.arg.id + "'";
	f.r = pgdb.query(pg, sql);
	var p = {};
	p.类别 = '设置状态停用';
	p.明细 = '';
	var shop_yijifenlei = require('./vip_info.js');
	f._json = shop_yijifenlei.json();
	share.logs(p, f, db);	
	f._isRander = '提交成功';
	return f;
}

function updateNormal(f,pg,mo,redis,pg2,db) {
	//重定向
	var sql = "update 平_会员表  set 出账 = '是' , 状态='正常' where id ='" + f.arg.id + "'";
	f.r = pgdb.query(pg, sql);
	var p = {};
	p.类别 = '设置状态正常';
	p.明细 = '';
	var shop_yijifenlei = require('./vip_info.js');
	f._json = shop_yijifenlei.json();
	share.logs(p, f, db);
	f._isRander = '提交成功';
	return f;
}
function failMoney(f,pg,mo,redis,pg2,db) {
	//重定向
	var sql = "update 平_会员表  set 出账 = '否' , 状态='正常' where id ='" + f.arg.id + "'";
	f.r = pgdb.query(pg, sql);
	var p = {};
	p.类别 = '设置出账否状态正常';
	p.明细 = '';
	var shop_yijifenlei = require('./vip_info.js');
	f._json = shop_yijifenlei.json();
	share.logs(p, f, db);
	f._isRander = '提交成功';
	return f;
}