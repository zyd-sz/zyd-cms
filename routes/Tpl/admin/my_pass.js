//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var cipher = require('../../../func/cipher.js');
var sqlite = require('../../../func/sqlite.js');

module.exports.run = function(f,pg,mo,redis,pg2,db) {
	f = control.index(f,db);
	f._json = this.json();
	var p = {};
	var id = "";
	if(f.session.user_id == "" || f.session.user_id == null){
		f._状态 = '请先登录!';
		return f;
	}else{
		id = f.session.user_id;
		f.arg.id = id;
	}
	
	p.sql = "select id,姓名,登录名,密码,状态,随机码 from 管_管理员表 where id = '"+id+"'";
	//做一个判断引用哪个数据库，放到f里面
	f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.update(p, f, pg ,db);
	sqlite.close(f.db);
	return f;
}



//点击提交后修改密码
module.exports.form = function(f,pg,mo,redis,pg2,db) {
	db = f.db;
	f._json = this.json1();
	var p = {};
	f.arg.id = f.session.user_id;
	
	if(f.data != null) {
		if(f.data.原密码  == "" || f.data.原密码 == null){
			f._状态 = '请输入原密码';
			return f;
		}else if(f.data.新密码 == "" || f.data.新密码 == null){
			f._状态 = '请输入新密码';
			return f;
		}else if(f.data.确认密码 =="" || f.data.确认密码 == null){
			f._状态 = '请输入正确密码';
			return f;
		}else if(f.data.确认密码 != f.data.新密码){
			f._状态 = '两次密码不一致';
			return f;
		}else{
			//执行查询，查询该用户
			sql = "select id,姓名,登录名,密码,状态,随机码 from 管_管理员表 where id = '"+f.session.user_id+"'";
			f.r = sqlite.query(db,sql).数据[0];
			//判断账号状态
			
			
			if(f.r.id == null || f.r.id == ""){ 
				f._状态 = '无此管理员'; 
				return f; 
			}else if(f.r.状态  == "停用"){ 
				f._状态 = '此管理员已停用'; 
				return f; 
			} 
			
			//判断原密码是否正确 
			var 原密码 = cipher.md5(f.data.原密码);  
			原密码 = cipher.md5(f.r.随机码+原密码); 
			if(原密码 != f.r.密码){ 
				f._状态 = '原密码不正确'; 
				return f; 
			}
			
			//加密新密码
			f.data.密码 = cipher.md5(f.data.新密码);
			f.data.密码 = cipher.md5(f.r.随机码+f.data.密码);
			f.data.id = f.session.user_id;
			
			user_update_password(p,f,pg,db);

			return f;
			
		}
	}		
}


//查询当前用户相关信息
function user_find(p,f,pg){
	
}

//修改操作
function user_update_password(p,f,pg,db){
	console.log("f.data.密码---------"+f.data.密码);
	var sql = "update 管_管理员表  set 密码 = '"+f.data.密码+"' where id='"+f.data.id+"'";
	f.dbpath = 'sqlite';
	f.更新信息 = sqlite.query(f.db,sql);
	//sqlite.close(db);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "显示用户改密",
		"模块": "admincon",
		"func": "my_pass",
		"页数": "10",
		"表名": "管_管理员表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}

module.exports.json1 = function() {
	var json = {
		"名称": "用户改密",
		"模块": "admincon",
		"func": "my_pass_update",
		"页数": "10",
		"表名": "管_管理员表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}


