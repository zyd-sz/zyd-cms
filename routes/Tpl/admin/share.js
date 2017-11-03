var pgdb = require('../../../func/pgdb.js');
var sqlite = require('../../../func/sqlite.js');

module.exports.update = function(p, f, pg,db){
	pgdb.query(pg,"BEGIN;");
	f.r = [];
	//var sql= '';
	if(f.arg.id != null && f.arg.id != '' && f.arg.id != 'undefined'){
	    if(p.sql == null || p.sql == '')
		  sql="select * from "+p.表名+"	where id = '"+f.arg.id+"'";
		else 
		  sql=p.sql;

		if(f.dbpath == 'pgdb'){
			//f.r = pgdb.query(pg, sql).数据[0];
			f.r = pgdb.query(pg, sql)[0];
		}else if(f.dbpath == 'sqlite'){
			//db = sqlite.connect();
			f.r = sqlite.query(f.db,sql).数据[0];
			//sqlite.close(db);
		}
  	}
	pgdb.query(pg,"COMMIT;");
	return f;
}

module.exports.logs= function(p,f,db) {
	db = f.db;
	if(p.类别 == null || p.类别 == '') p.类别 = '';
	if(p.明细 == null || p.明细 == '') p.明细 = f.ip;
	//db = sqlite.connect();
	if(db){
		sql = "insert into 管_后台日志表( 名称, func,编号, 明细, 类别, 状态, 录入人, 录入时间, 备注 )values('"
		+f._json.名称+"', '"+f._json.func+"', '"+f.arg.id+"', '"+p.明细+"', '"+p.类别+"', '正常', '"+f.session.user_name+"', '"
		+f.date+"', '"+JSON.stringify(f.data)+"')";
		sqlite.query(db,sql);
	}
	//sqlite.close(db);
};

module.exports.lists = function(p, f, pg,db) {
	//加入数据库事务
	pgdb.query(pg,"BEGIN;");
	
	db = f.db;
	f.r = [];
	f.arrow = [];
	//var db = '';
	var asc = ['', 'desc', 'asc'];
	var arr_tb = ['', '↑', '↓'];
	var desc = '1';
	if(p.sql == null || p.sql == '') {
		f._状态 = '有没得sql语句哦亲';
		f._isRander = '<script>alert("' + f._状态 + '！"); parent.change(); </script>';
		return f;
	}

	//排序字段、倒/升序、一页显示总数、页数初始化
	if(f.arg.ord == null || f.arg.ord == '') f.arg.ord = '录入时间';
	if(f.arg.desc == '1') desc = '2';
	f.arrow[f.arg.ord] = arr_tb[desc];
	p.arr_tb = ' ' + asc[desc];
	f._ENV.ord_pagear = new_html(f, 'ord&desc') + "&desc=" + desc + "&";
	if(f.arg.sumnum != null && f.arg.sumnum != '') p.num = f.arg.sumnum;
	else if(f._json.页数 != null && f._json.页数 != '')
		p.num = f._json.页数;
	else p.num = f._variable.设置.默认分页;
	if(f.arg.page == null || f.arg.page == '') f.arg.page = '1';

	//p.num = 2;

	//表中总条数
	if(p.条数 != null && p.条数 != '') {} else if(p.sql_count != null && p.sql_count != '') {
		var arr_a = (p.sql_count).split('from');
		arr_a = (arr_a[1]).split(' order ');
		p.sql_count = "select count(*) count from " + arr_a[0];
	} else if(p.sql != null && p.sql != '') {
		var arr_a = (p.sql).split('from');
		arr_a = (arr_a[1]).split(' order ');
		p.sql_count = "select count('1') count from " + arr_a[0];
	} else {
		p.sql_count = "select count('1') count from " + p.表名;
	}
	if(p.sql_count != null && p.sql_count != '') {
		if(f.dbpath == 'pgdb'){
			console.log('-----------pgdb------------');
			var s = pgdb.query(pg, p.sql_count)
			p.条数 = s[0].count;
			/*if(s.状态 == '成功'){
				if(s.数据.length >= 0){
					p.条数 = s.数据[0].count;
				}
			}else{
				f._状态 = '数据库错误：' + s.状态;
				f._isRander = '<script>alert("' + f._状态 + '！"); parent.change(); </script>';
				return f;
			}*/
		}
		else if(f.dbpath == 'sqlite'){
			//db = sqlite.connect();
			p.条数 = sqlite.query(db,p.sql_count).数据[0].count;
		}
		
	}

	//生成分页
	if(p.条数 == null || p.条数 == '')
		p.条数 = '0';

	p.began = Number(p.num) * (Number(f.arg.page) - 1); //之前的页数数据总和
	if(Number(p.条数) % Number(p.num) == 0) //整除不翻页
		p.last = parseInt(Number(p.条数) / Number(p.num));
	else
		p.last = parseInt(Number(p.条数) / Number(p.num)) + 1; //不整除翻页

	if(Number(p.last) > 500)
		p.last = '500'; //最多显示500页	

	p.prev = Number(f.arg.page) - 1;
	p.next = Number(f.arg.page) + 1;
	//p.numcon = '<div class="pager" id="page"><div id="exl_look"><a onclick="export_exl()">导出exl</a></div><div id="page_con">';
	p.numcon = '<div class="pager" id="page"><div id="exl_look"></div><div id="page_con">';
	p.numcon += '每页&nbsp;<input type="text" value="' + p.num + '" id="numpage" title="每页页数" />&nbsp;共' + p.条数 + '条&nbsp;&nbsp;' + f.arg.page + '/' + p.last + '页&nbsp;&nbsp;'; //每页5条 共10条 1/2页
	if(Number(p.num) < Number(p.条数)) { //总数比分页条数多意味着要分页了
         
		if(Number(f.arg.page) == 1)
			p.numcon += '<a><img src="../../public/admin/images/dm2.jpg" /></a><a><img src="../../public/admin/images/dm3.jpg" /></a>'; //啥都没得
		else
			p.numcon += '<a  onclick="locationa(1)"><img src="../../public/admin/images/dm2.jpg" /></a><a  onclick="locationa(' + p.prev + ')"><img src="../../public/admin/images/dm3.jpg" /></a>'; //第一条 前一条
		if(Number(p.last) <= 10) { //10页以下
			for(var i = 1; i <= p.last; i++) {
				p.numcon += '<a onclick="locationa(' + i + ')" id="page' + i + '">' + i + '</a>';
			}
		} else { //10页以上
			if(Number(f.arg.page) < 6) {
				for(var i = 1; i <= 10; i++) {
					p.numcon += '<a onclick="locationa(' + i + ')" id="page' + i + '">' + i + '</a>';
				}
			} else if(Number(f.arg.page) > (Number(p.last) - 5)) { //当前页数+5页的比总的页数多
				for(var i = Number(p.last) - 9; i <= p.last; i++) {
					p.numcon += '<a onclick="locationa(' + i + ')" id="page' + i + '">' + i + '</a>';
				}
			} else { //中间的5条数据
				for(var i = Number(f.arg.page) - 5; i <= Number(f.arg.page) + 4; i++) {
					p.numcon += '<a onclick="locationa(' + i + ')" id="page' + i + '">' + i + '</a>';
				}
			}
		}
		if(Number(f.arg.page) == Number(p.last))
			p.numcon += '<a><img src="../../public/admin/images/dm4.jpg" /></a><a><img src="../../public/admin/images/dm5.jpg" /></a>';
		else
			p.numcon += '<a onclick="locationa(' + p.next + ')"><img src="../../public/admin/images/dm4.jpg" /></a><a onclick="locationa(' + p.last + ')"><img src="../../public/admin/images/dm5.jpg" /></a>';
		if(Number(p.last) > 10) p.numcon += '<input name="" type="text" id="loca" onblur="locationa()" title="1-' + p.last + '"/><script></script>';
		p.numcon += '<script>$("#page' + f.arg.page + '").css({"color":"red"});function locationa(numpage){num=$("#numpage").val();if(!numpage){html=$("#loca").val();if(html<=' + p.last + '){location.href="' + new_html(f, 'sumnum&page') + '&sumnum="+num+"&page="+html;}}else{location.href="' + new_html(f, 'sumnum&page') + '&sumnum="+num+"&page="+numpage; }}</script>';
	}

	p.numcon += '</div></div><script>new_html="' + new_html(f, '') + '";</script>';
	f.page = p.numcon;
	f.exc = p.sql + " order by " + f.arg.ord + p.arr_tb;
	//数据库分页查询
	
	sql = p.sql + " order by " + f.arg.ord + p.arr_tb + " limit " + p.num + " offset " + p.began;
	if(f.arg.ord != 'id' && f.双排序){
		sql = p.sql + " order by " + f.arg.ord + p.arr_tb + ",id " + p.arr_tb +" limit " + p.num + " offset " + p.began;
	}
	//f._exc =aes.aesEncodeCipher(p.sql+" order by "+f.arg.ord+p.arr_tb,stringFormat.md5(f._GET['_n']));
	if(f.dbpath == 'pgdb'){
		var s = pgdb.query(pg, sql);
		/*if(s.状态 == '成功'){
			f.r = pgdb.query(pg, sql).数据;
		}else{
			//console.log(s)
			f._状态 = '数据库错误：' + s.状态;
			f._isRander = '<script>alert("' + f._状态 + '！"); parent.change(); </script>';
			return f;
		}*/
		f.r = s;
	}
	else if(f.dbpath == 'sqlite'){
		f.r = sqlite.query(db,sql).数据;
		//sqlite.close(db);
	}
	f._json.条数=p.条数;
	pgdb.query(pg,"COMMIT;");
	return f;
}

function new_html(f, con) {
	var get = f.arg;
	var arr_con = con.split('&');
	var arr = new Array;
	for(var p in (get)) {
		if(arr_con.indexOf(p) < 0)
			arr.push(p + '=' + encodeURIComponent(get[p]));
	}
	return '?' + arr.join("&");
}