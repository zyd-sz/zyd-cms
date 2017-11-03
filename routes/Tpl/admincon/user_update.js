/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var user = require('./user.js');
var sqlite = require('../../../func/sqlite.js');
//单条显示
function RandomWord(chars){
    if(!(this instanceof RandomWord)){
        return new RandomWord(chars);
    }
    this._chars = "";
    if(chars){
        add(chars);
    }
}

function add(chars){
	this._chars += chars;
    return this;
}

function random(size){
	var len = this._chars.length;
    if(len === 0){
        throw new Error('no chars,please use add(chars)');
    }
    var word = "";
    for(var i=0;i<size;i++){
        var cpo = parseInt(Math.random()*len);
        word += this._chars.charAt(cpo);
    }
    return word;
}


module.exports.run = function(f,pg,mo,redis,pg2,db) {
	var p = {};
	var sql = '';
	f = control.index(f,db);
	var db = f.db;
	f._json = user.json();
	p.表名 = '管_管理员表';
	//db = sqlite.connect();
	sql = "select 登录名 from 管_管理员表 where 权限id in (select id from 管_权限表 where 录入人 = '" + f.session.user_name + "')";
	f.登录名 = sqlite.query(db,sql).数据;
	if(f.登录名.length == 0){
		ids = ''
	}else{
		f.登录名.forEach(function(item, key) {
			if(key == 0) ids = "'" + item.登录名 + "'";
			else ids += ",'" + item.登录名 + "'";
		});
	}
	
	if(ids == '') {
		sql = "select id,名称 from 管_权限表 where 录入人 in ('" + f.session.user_name + "')";
	} else {
		sql = "select id,名称 from 管_权限表 where 录入人 in ('" + f.session.user_name + "'," + ids + ")";
	}
	
	f.权限列表 = sqlite.query(db,sql).数据;
	//console.log(f.权限列表);
	//sqlite.close(db);
	
	f.dbpath = 'sqlite'
	f = share.update(p, f, pg ,db);
	sqlite.close(f.db);
	return f;
}

//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */
var RW = require('../../../func/randomWord.js');
var cipher = require('../../../func/cipher.js');
var pgdb = require('../../../func/pgdb.js');

module.exports.form = function(f,pg,mo,redis,pg2,db) {
	//db = sqlite.connect();
	var db = f.db;
	var sql_con = '';
	f._json = user.json();
	var sql = '';
    if(f.data.id != '')//更改
		sql_con = " and id <> " + f.data.id;
	sql="select id from 管_管理员表 where 登录名 = '"+f.data.登录名+"'"+sql_con;
	f.用户信息 = sqlite.query(db,sql).数据;
	//console.log(f.用户信息);
	if(f.用户信息[0]){
		f._状态 = '登录名已存在';
		return f;
	}
	
	var rw = RandomWord('123456789');
	f.data.随机码 = random(4);
	f.data.密码 = cipher.md5(f.data.新密码); 
	f.data.密码 = cipher.md5(f.data.随机码 + f.data.密码); 
	
	//更改
	if(f.data.id != '')
		sql = "update 管_管理员表 set 姓名 = '"+ f.data.姓名 +"', 登录名 = '"+ f.data.登录名 +"', 密码 = '"+ f.data.密码 +"', 性别 = '"
		+ f.data.性别 +"', 联系方式 = '"+ f.data.联系方式 +"', email = '"+ f.data.email +"', 权限组 = '"+ f.data.权限组 +"', 权限id = '"
		+ f.data.权限id +"', 随机码 = '"+ f.data.随机码 +"', 状态 = '"+ f.data.状态 +"', 录入人 = '"+ f.session.user_name +"', 录入时间 = '"
		+ f.date +"', 备注 = '"+ f.data.备注 +"' where id = "+ f.data.id;
	else if(f.data.id == '')
		sql = "insert into 管_管理员表 (姓名,登录名,密码,性别,联系方式,email,权限组,权限id,随机码,状态,录入人,录入时间,备注) values ('"
		+ f.data.姓名 +"', '"+ f.data.登录名 +"', '"+ f.data.密码 +"', '"+ f.data.性别 +"', '"+ f.data.联系方式 +"', '"+ f.data.email 
		+"', '"+ f.data.权限组 +"', '"+ f.data.权限id +"', '"+ f.data.随机码 +"', '"+ f.data.状态 +"', '"+ f.session.user_name +"', '"
		+ f.date +"', '"+ f.data.备注 +"')";
		
	f.更新信息 = sqlite.query(db,sql);
	return f;
}