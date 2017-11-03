var pgdb = require('../../../func/pgdb.js');
var sqlite = require('../../../func/sqlite.js');

module.exports.run = function(f,pg,mo,redis,pg2,db){
	var db = f.db;
	if(f.data.id == null||f.data.id == undefined||f.data.id ==''){
		f.类别='添加';
	}else{
		f.类别='编辑';
	}
	if(f.明细 == null||f.明细 == undefined||f.明细 == '') f.明细 = f.ip;
	var sql = "insert into 管_后台日志表( 名称, func,编号, 明细, 类别, 状态, 录入人, 录入时间, 备注 )values('"+f._json.名称+" - "+f.类别+"', '"+f.data._n+"', '"+f.data.id+"', '"+f.明细+"', '"+f.类别+"', '正常', '"+f.session.user_name+"','"+f.date+"','"+JSON.stringify(f.data)+"')";
	var insert = sqlite.query(db,sql);
	return f;
}