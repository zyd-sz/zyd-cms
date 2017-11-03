
var mongo = require('../../../func/mongo.js');
var pgdb = require('../../../func/pgdb.js');
var moment = require("moment");
var cipher = require('../../../func/cipher.js');
var sqlite = require('../../../func/sqlite.js');
var querystring = require("querystring");
//var stringFormat = require('../../../func/stringFormat.js');

//已经是同步的，用异步写也会同步执行	
module.exports.run = function(f,pg,mo,redis,pg2,db) {
	var db = sqlite.connect();
	f.data = querystring.parse(f.data);
	var path = '';
	//var limit_num = 10;
	//var num = 0;
	var folder_exists = '';
	f._状态 = '成功';
	
	
	if(f.data.admin_name == '' || f.data.admin_name == null) {
		f._状态 = '请填写登录名';
	} else if(f.data.pass == '' || f.data.pass == null) {
		f._状态 = '请填写密码';
	}
	
	/*path = './_logs/login/' + stringFormat.date('YYYY') + '/' + stringFormat.date('MM-DD') + '/' + f.data.admin_name.toString() + '.txt';
	folder_exists = stringFormat.file_whether(path);
	if(folder_exists == 'y') {
		num = stringFormat.new_file(path);
		if(num >= Number(limit_num)) {
			f._状态 = '登录错误超过' + limit_num + '次,今天已无法登录';
			f._isRander = '<script>alert("' + f._状态 + '！"); parent.change(); </script>';
			return f;
		}
	}*/
	sql = "select id,密码,权限组,权限id,随机码,状态 from 管_管理员表 where 登录名 = '" + f.data.admin_name + "' ";
	var s = sqlite.query(db, sql);
	if(s.数据.length == 0){
		f._状态 = '账号不存在';
	}else if(s.数据[0].状态 != '正常'){
		f._状态 = '账号已停用';
	}else if(s.数据[0].密码 != cipher.md5( s.数据[0].随机码 + f.data.pass)){
		//num++;
		//stringFormat.files_all(path, num.toString());
		//var 剩下次数 = Number(limit_num) - Number(num);
		f._状态 = '密码错误';
	}/*else if(f.data.code != f.session.vnum){
		f._状态 = '验证码错误';
	}*/else if(s.数据[0].权限id == '0') {
		f._状态 = '无设置权限';
	}
	if(f._状态 != '成功') {	
		f._isRander = '<script>alert("' + f._状态 + '！"); parent.change(); </script>';
		return f;
	}
	
	sql = "select id from 管_权限表 where id = '" + s.数据[0].权限id + "' ";
	var a = sqlite.query(db, sql);
	if(a.数据.length == 0){
		f._状态 = '权限异常';
	}
		
	sqlite.close(db);
	
	if(f._状态 != '成功') {	
		f._isRander = '<script>alert("' + f._状态 + '！"); parent.change(); </script>';
		return f;
	}else{
		f.session.user_name = f.data.admin_name;
		f.session.user_id = s.数据[0].id;
		f.session.user_pid = a.数据[0].id;
		//console.log(f.session);
		f._isRander =  '<script>parent.location.href="/Tpl/admin/main.xhtml";</script>';
		return f;
	}
}