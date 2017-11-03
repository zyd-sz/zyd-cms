var pgdb = require('../../../func/pgdb.js');
var sqlite = require('../../../func/sqlite.js');
var querystring = require("querystring");

module.exports.run = function(f,pg,mo,redis,pg2,db){
	var db = sqlite.connect();
	f.data = querystring.parse(f.data);
	//con中的值再解码一下
	var label = {};
	var sql = '';
	var content = '';//返回内容
	//转JSON格式
	arr = f.data['con'].split('\n');
	arr.forEach(function(name,key){
		var arr_b = name.split("=");
		label[arr_b[0]] = arr_b[1];
	})
	
	//替换查询部分
	sql=label.sql语句.replace(/_select_/g,f.data.s_con);
	var limit = sql.split('from')[0];
	
	//数据库的处理
	if(f.data.db == 'pgdb'){
		f.r = pgdb.query(pg, sql).数据;
	}else if(f.dbpath == 'sqlite'){
		//db = sqlite.connect();
		f.r = sqlite.query(db,sql).数据;
		//sqlite.close(db);
	}
	//判断数据
	if((f.r).length > 0) {
		(f.r).forEach(function(name, key) {
			var arr_value = new Array;
			for(var key1 in name) {
				arr_value.push(name[key1]);
			}
			var return_keys = '';
			if((label.主键).indexOf(',') >= 0) {
				var arr_a = new Array;
				arr_a = (label.主键).split(',');
				arr_a.forEach(function(name2, key2) {
					arr_a[key2] = name[name2];
				})
	
				return_keys = arr_a.join(',');
			} else
				return_keys = name[label.主键];
				
			content += '<a rel="' + arr_value.join('^') + '">' + return_keys + '</a>';
		})
	}
	
	f._isRander = content + '<script>jq_keyup();</script>'
	if(limit.split(',').length == 1 ){
		f._isRander = content + '<script>jq_keyup1();</script>'
	}
	sqlite.close(db);
	return f;
}

