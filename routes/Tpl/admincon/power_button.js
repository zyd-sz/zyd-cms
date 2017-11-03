/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var sqlite = require('../../../func/sqlite.js');
//单条显示
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	//重定向
	f = control.index(f,db);
	//f = deleteOne(f,pg,mo,redis,pg2,db);
	eval("f = "+f.arg._name+"(f,pg,mo,redis,pg2,db);");	
	sqlite.close(f.db);
	return f;
}

function deletePower(f,pg,mo,redis,pg2,db){
	//f._isRander = '提交成功';
	var isDelete =true;
	
	if(f.arg.id == f.session.user_pid){
	  	f._isRander = '不可删除当前管理员权限';
	  	return f;
	}
	
	if(f.arg.id == 1){
		f._isRander = '不可删除id为1的权限';
  		return f;
	}
	
	//db = sqlite.connect();
	sql = "select 权限id from 管_管理员表 ";
	s = sqlite.query(f.db,sql);
	s.数据.forEach(function(item){
		if(item.权限id == f.arg.id){
			isDelete = false;
		}
	});
	
	if(!isDelete){
  		f._isRander = '不可删除已有管理员权限';
  		return f;
  	}
	
	sql = "delete from 管_权限表 where id in ("+f.arg.id+")";
	sqlite.query(f.db,sql);
	//sqlite.close(db);
	var p = {};
	p.类别 = '删除管理员权限';
	p.明细 = '';
	var account_classes = require('./power.js');
	f._json = account_classes.json();
	share.logs(p, f, db)

	f._isRander = '提交成功';
	return f;
}

function deletePowerAll(f,pg,mo,redis,pg2,db) {
	//转数组
	var idArr = f.arg['id'].split(',');
	//console.log(idArr);
	var isCurrentDelete = true;
	var isServerDelete = true;
	var isPowerDelete = true;
	idArr.forEach(function(item) {
		if(item == 1) {
			isServerDelete = false;
		}
		if(item == f.session.user_pid) {
			isCurrentDelete = false;
		}
	})
	//查找id为1的权限和当前管理员权限
	if(!isServerDelete) {
		f._isRander = '不可删除id为1的权限';
		return f;
	}

	if(!isCurrentDelete) {
		f._isRander = '不可删除当前管理员权限';
		return f;
	}

	//db = sqlite.connect();
	sql = "select distinct 权限id from 管_管理员表 ";
	s = sqlite.query(f.db, sql).数据;
	for(var i = 0; i < s.length; i++) {
		for(var j = 0; j < idArr.length; j++) {
			//console.log(s[i].权限id + "," + idArr[j] + "," + idArr[j].indexOf(s[i].权限id));
			if(idArr[j].indexOf(s[i].权限id) >= 0) {
				isPowerDelete = false;
				break;
			}
		}
	}
	//console.log(isPowerDelete);
	if(!isPowerDelete) {
		f._isRander = '不可删除已有管理员权限';
		return f;
	}

	sql = "delete from 管_权限表 where id in (" + f.arg.id + ") ";
	sqlite.query(f.db, sql);

	//sqlite.close(db);
	var p = {};
	p.类别 = '批量删除管理员权限';
	p.明细 = '';
	var account_classes = require('./power.js');
	f._json = account_classes.json();
	share.logs(p, f, db)

	f._isRander = '提交成功';

	return f;
}