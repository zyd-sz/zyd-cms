/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
var sqlite = require('../../../func/sqlite.js');
var fs = require('fs');
var excel_deal = require('../../../func/excel_in.js');
//var xlsx = require("node-xlsx"); 
//var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f,pg,mo,redis,pg2,db) {
//var obj = xlsx.parse('a.xlsx');
//f = control.index(f,db);
//console.log(f);
//console.log(f.data);
//var excelData = JSON.parse(f.data);
var excelData =f.data.数据;
var tableName = f.data.name;
//console.log(excelData);
//console.log(typeof excelData)
excelData = JSON.parse(excelData);
//console.log(f.data.name);
f._isRander = "成功";
for(var i=0;i<excelData.length;i++){
	var sql = excel_deal.import(excelData[i],tableName);
//	var sql = insertTable(excelData[i],tableName); 
	//console.log(i)
	//console.log(sql);
		s = pgdb.query(pg, sql);
		//console.log(s);
	if(s.状态 != '成功') {
//		console.log(s.状态);
//		f._状态 = '提交失败';
		f._isRander ='数据出错';
		//console.log(s.信息);
		return f;
	}	
}
return f;
}

//function insertTable(b,tableName){
//var arrays=[];
//var arrayb =[];
//var hea ="(";
//var end = ")"
//var tinto ="";
//var binto = "";
//for(var i in b){
//	if(i=="id"){
//		delete b.i;
//	}else{
//		arrays.push(i);
//		if(b[i] ==""){
//			console.log(JSON.stringify(b[i]));
//		}
//		arrayb.push(JSON.stringify(b[i]));
//	}
//
//}
//var keyEx = arrays.join(',');
//var valEx = arrayb.join(',');
//valEx = valEx.replace(/\"/g,"'");
//var sql ="insert into "+tableName+hea+keyEx+end+"values "+hea+valEx+end;
//
//
//
//
//return sql;
//}
