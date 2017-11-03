/* 仿黄经理表单验证
 * 内容：提交路由操作接口，对数据进行自动提取并更改或添加表单数据
 */
var control = require('../../admin_control.js');
var sql_search = require('../adminfunc/sql_search.js');
var pgdb = require('../../../func/pgdb.js');
var sqlite = require('../../../func/sqlite.js');
//表单提交
module.exports.run = function(f,pg,mo,redis,pg2,db){
f._json = sql_search.json();
var sql = '';
var sql = f.data.sql;
//sql = sql.replace(/\'/g, '“');
sql = sql.replace(/\"/g, "'");
sql = sql.replace(/\”/g, "'");
sql = sql.replace(/\“/g, "'");
if(sql.indexOf('select') != 0){
	f._isRander = '<script>alert("数据不为查询语句！");window.close();</script>';
	return f;	
}
var bb =pgdb.query(pg, sql);
console.log(bb)
if(bb.状态!='成功'){
	f._isRander = '<script>alert("查询语句错误！");window.close();</script>';
	return f;
}
f.r =pgdb.query(pg, sql).数据;
f.类别='搜索';
f.明细 = '';
var 备注 = JSON.stringify(f.data);
f.备注 = 备注.replace(/\'/g, '"')
var sql = "insert into 管_后台日志表( 名称, func,编号, 明细, 类别, 状态, 录入人, 录入时间, 备注 )values('"+f._json.名称+" - "+f.类别+"', '"+f.data._n+"', '"+f.data.id+"', '"+f.明细+"', '"+f.类别+"', '正常', '"+f.session.user_name+"','"+f.date+"','"+f.备注+"')";
		var insert = sqlite.query(db,sql);
return f;		
	}

