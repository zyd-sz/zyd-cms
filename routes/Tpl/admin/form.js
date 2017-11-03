/* 仿黄经理表单验证
 * 内容：提交路由操作接口，对数据进行自动提取并更改或添加表单数据
 */
var control = require('../../admin_control.js');
var querystring = require("querystring");
var sqlite = require('../../../func/sqlite.js');
var pgdb = require('../../../func/pgdb.js');
//表单提交
module.exports.run = function(f,pg,mo,redis,pg2,db){
	pgdb.query(pg,"BEGIN;");
	f.db = sqlite.connect();
	var db = f.db; //这样主要是防止全局 f.db可能冲突
	f.data = querystring.parse(f.data);
	var datas=f.data;
	//console.log(datas);
	var arr = Object.keys(datas);
	var len = arr.length;
	var biaoz = 0;
	for(var i in datas){
		biaoz +=1;
		if(typeof datas =='string'){
			datas[i] = datas[i].replace(/\'/g,'"');
		}
		
	}
	if(biaoz == len){
		f.data = datas;
		//提取出公共的部分
		f._状态 = '成功';
		if(f.data._m == null || f.data._m == '') f._状态 = '模块异常';
		else if(f.data._n == null || f.data._n == '') f._状态 = 'func异常';
		if(f._状态 != '成功')
			f._isRander = '<script>alert("'+f._状态+'");parent.hidesu()</script>';
		//开发权限判断...
		//这里做基础判断
		var func = require('../'+f.data._m+'/'+f.data._n+'.js');
		f = func.form(f,pg,mo,redis,pg2,db);
		if(f._状态 != '成功')
			f._isRander = '<script>alert("'+ f._状态 +'");parent.hidesu()</script>';
		else
			f._isRander = '<script>alert("'+ f._状态 +'");parent.relo(1);</script>';
	    f.json=f._json;

		var funca = require('./adminlog.js');
		funca.run(f,pg,mo,redis,pg2,db);


		sqlite.close(db);
		pgdb.query(pg,"COMMIT;");
		return f;		
	}

}