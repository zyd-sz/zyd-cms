/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var power = require('./power.js');
var sqlite = require('../../../func/sqlite.js');
//单条显示
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	var p = {};
	f = control.index(f,db);
	f._json = power.json();
	var config  = require('../../../func/config.js');
 	var menu = config.get("menu");
 	var p = {};
 	p.表名 = '管_权限表';
  	var treeMenu = new Array;
   	var treeNav = new Array;
  	menu.forEach(function(item){
		if(item.菜单){
		    (item.菜单).forEach(function(name){
		    	if(f.arg.id == 1 && name.名称 !='系统'){}else{
			   		treeMenu.push(name);
			   		treeNav[name.名称] = new Array;
		    	}
		   	});
		}
		if(item.导航){
			(item.导航).forEach(function(name){
		   		if(treeNav[name.菜单]){
		   			//开发之外的能看的东西
					if(f.arg.id != 1 && name.菜单 == '系统' ){
						if(name.名称 !='我的密码' && name.名称 !='首页'){}else{
							name.按钮内容_arr = new Array;
							if(name.按钮内容 != null && name.按钮内容 != '')
								name.按钮内容_arr = name.按钮内容;
			   				treeNav[name.菜单].push(name);
						}
					}else{
						name.按钮内容_arr = new Array;
						if(name.按钮内容 != null && name.按钮内容 != '')
							name.按钮内容_arr = name.按钮内容;
				   		treeNav[name.菜单].push(name);
					}
		   		}
		   	});
		}
   	});
	
	//console.log(treeNav);
	
	f.treeMenu = treeMenu;
	f.treeNav = treeNav;
	f.dbpath = 'sqlite'
	f = share.update(p, f, pg ,db);
	//console.log(f);
	sqlite.close(f.db);
	return f;
}

//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var cipher = require('../../../func/cipher.js');

module.exports.form = function(f,pg,mo,redis,pg2,db) {
	var db = f.db;
	f._json = power.json();
	f.data.录入人 = f.session.user_name;
	//db = sqlite.connect();
	var sql_con = '';
	var sql = '';
	sql = "select id from 管_权限表 where 名称 ='" + f.data.名称 + "'";
	f.权限名称 = sqlite.query(db,sql).数据;
	//console.log(f);
	if(f.权限名称.length != 0 && !f.data.id){
		f._状态="角色身份重复";
		return f
	}
	
	var a = {};
	f.data.node_字段.forEach(function(item, key) {
		a[key] = {};
		a[key]['字段'] = item;
		a[key]['查看'] = yn_null(f, '查看', item);
		a[key]['按钮'] = return_null(f, '按钮', item);
		//console.log(typeof (a[key]['按钮']));
		if(typeof(a[key]['按钮']) != 'object' && a[key]['按钮'] != '') {
			a[key]['按钮'][0] = a[key]['按钮'];
		}
	});
	
	f.data.权限 = JSON.stringify(a);
	
	if (!f.data.id) {//新增
		sql = "insert into 管_权限表 (名称,权限,状态,录入人,录入时间) values ('"+ f.data.名称 +"','"+ f.data.权限 +"','正常','"+ f.session.user_name +"','"
		+ f.data.录入时间 +"')";
	} else {
		sql = "update 管_权限表 set 名称 = '"+ f.data.名称 +"', 权限 = '"+ f.data.权限 +"', 录入人 = '"+ f.session.user_name +"', 录入时间 = '"
		+ f.data.录入时间 +"' where id = "+ f.data.id;
	}
	
	//console.log(sql);
	sqlite.query(db,sql);
	return f
}

function yn_null(f,type,name){
	var r = '0';
	if(eval('f.data.node_'+type+'_'+name) == null) r = '0';
	else r = '1';	
 	return r;
}

function return_null(f,type,name){
	var r = '';
	if(eval('f.data.node_'+type+'_'+name) == null) r = '';
	else r = eval('f.data.node_'+type+'_'+name);	
 	return r;
}