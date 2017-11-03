//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
var moment = require('moment');
var sqlite = require('../../../func/sqlite.js');
module.exports.run = function(f,pg,mo,redis,pg2,db) {
    f = control.index(f,db);
    f._json = this.json();

    f.arg.ord = '录入时间';
    f.arg.desc = '2';

    f.accountSumStatistical = accountSumStatistical(f,'7',pg);
	f.accountSumVip = accountSumVip(f,'7',pg);

    f.today = getToday(pg);
    var zongjine = [];
    var shanghuming = [];
    var dingdanshu = [];
    for( var i = 0;i < f.today.length;i++){
        zongjine.push(f.today[i].总金额);
        shanghuming.push(f.today[i].商户名);
        dingdanshu.push(f.today[i].count);
    }
    f.zongjine = zongjine;
    f.shanghuming = shanghuming;
    f.dingdanshu = dingdanshu;

    f.shengdingdan = getShengdingdan(pg);
//  console.log("shengdingdan+++++++++++++++++++++++++++++");
//  console.log(f.shengdingdan);





    var jineFengbu = getJineFengbu(pg);
    f.jineFengbu = [];
    for(var i = 0;i < jineFengbu.length;i++){
        f.jineFengbu.push(jineFengbu[i].count);
    }
    //console.log("金额分布+++++++++++++");
    //console.log(f.jineFengbu);

//今日订单支付情况
    var dingdanshu = getdingdanshu(pg);
    f.zongdingdanshu = dingdanshu[0].count;
    f.yizhifu = Math.round(((dingdanshu[1].count)/ f.zongdingdanshu)*100);
    f.daizhifu = Math.round(((dingdanshu[2].count)/ f.zongdingdanshu)*100);
    f.yituikuan =Math.round(((dingdanshu[3].count)/ f.zongdingdanshu)*100);

    f.sumVip = getSumVip(pg)[0].count;


//问题反馈
    var  viewList = getViewList(pg);
    f.questionLeibie = [];
    f.questionMiaoshu = [];
    f.state = [];
    f.headPortrait = [];
    for(i in viewList ){
        f.questionLeibie.push( viewList[i].反馈类别);
        f.questionMiaoshu.push(viewList[i].问题描述);
        f.state.push(viewList[i].状态);
        f.headPortrait.push(viewList[i].头像);
    }
    //console.log("============= 反馈类别=============")
    //console.log( f.questionMiaoshu);
//  console.log(f);
    sqlite.close(db);
    return f;
}

// 最近n天销售总金额
function accountSumStatistical(f,num,pg){
	var accoutArr = [];
    var dd = f.startTime;
    for(var i = num ;i > 0; i--){
        var d = {};
        var day = dd - i*24*3600*1000;
        day = new Date(day);
        day = moment(day) .format('YYYY-MM-DD HH:mm:ss');
        day = day.split(' ')[0];
        d.天数 = day;
        day = getAccount(day,pg);
        d.总金额 = day;
        accoutArr.push(d);
    }


    f.accoutArr = accoutArr;
    var myarr = [];
    var myday = [];
    for(var i = 0; i < accoutArr.length;i++){
        myarr.push((parseInt(accoutArr[i].总金额)));
        myday.push((accoutArr[i].天数).substring(5,10));
    }
    f.myday = myday;
    f.myarr = myarr;
    return f;
}

function accountSumVip(f,num,pg){
	var accoutArr = [];
    var dd = f.startTime;
    for(var i = num ;i > 0; i--){
        var d = {};
        var day = dd - i*24*3600*1000;
        day = new Date(day);
        day = moment(day) .format('YYYY-MM-DD HH:mm:ss');
        day = day.split(' ')[0];
        d.天数 = day;
        day = getVip(day,pg);
        d.人数 = day;
        accoutArr.push(d);
    }
    
    
	f.accoutArr = accoutArr;
    var myarr = [];
    var myday = [];
    for(var i = 0; i < accoutArr.length;i++){
        myarr.push((parseInt(accoutArr[i].人数)));
        myday.push((accoutArr[i].天数).substring(5,10));
    }
    f.myBday = myday;
    f.mybrr = myarr;
//  return f;
}


function getAccount(date,pg) {
    var sql = "select SUM(总金额) as 总金额   from 平_支付订单表 where 录入时间 >= '"+date+" 00:00:00' and 录入时间 <= '"+date+" 23:59:59' and 状态 = '已支付' ";
   // console.log(sql)
    var rr = pgdb.query(pg, sql).数据[0].总金额;
  //  console.log(rr);
    var rr  = rr || '0';
    return rr;
}

function getVip(date,pg) {
    var sql = "select count(*) as 人数 from 平_会员表 where 录入时间 >= '"+date+" 00:00:00' and 录入时间 <= '"+date+" 23:59:59'";
//    console.log(sql)
    var rr = pgdb.query(pg, sql).数据[0].人数;
  //  console.log(rr);
    var rr  = rr || '0';
    return rr;
}



//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}


//今日订单
function getToday(pg){
    var today = getNowFormatDate();
    var sql = "select SUM(round(总金额,2)) as 总金额,商户名,count(1) from 平_支付订单表 where 录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 状态 = '已支付'and 商户名 in (select distinct 商户名 from 平_支付订单表 ) GROUP BY 商户名";
    var shuju = pgdb.query(pg,sql).数据;
    //console.log("=======shuju======");
    //console.log(shuju);

    return shuju;
}

//今日订单金额分布
function getJineFengbu(pg){
    var today = getNowFormatDate();
    var sql = "select COUNT(1) from 平_支付订单表 where 录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 总金额 between 0 and 100 UNION ALL select COUNT(1) from 平_支付订单表 where  录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 总金额 between 101 and 500 UNION ALL select COUNT(1) from 平_支付订单表 where  录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 总金额 between 501 and 1000 UNION ALL select COUNT(1) from 平_支付订单表 where  录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 总金额 between 1001 and 2000 UNION ALL select COUNT(1) from 平_支付订单表 where  录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 总金额 between 2001 and 5000 UNION ALL select COUNT(1) from 平_支付订单表 where  录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 总金额 > 5001";
    var shuju = pgdb.query(pg,sql).数据;
    //console.log("=======jinefengbu======");
    //console.log(shuju);

    return shuju;
}

//今日订单数详情
function getdingdanshu(pg){
    var today = getNowFormatDate();
    var sql = "select count(1) from 平_支付订单表  where 录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' UNION ALL select count(1) from 平_支付订单表  where 录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 状态 = '已支付' UNION ALL select count(1) from 平_支付订单表  where 录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 状态 = '待支付' UNION ALL select count(1) from 平_支付订单表  where 录入时间 >= '"+today+" 00:00:00'  and 录入时间 <= '"+today+" 23:59:59' and 状态 = '已退款'"
    var shuju = pgdb.query(pg,sql).数据;
    //console.log("=======订单数======");
    //console.log(shuju);

    return shuju;
}
//会员总数
function getSumVip(pg){
    var sql = "select count(*) from 平_会员表";
    var shuju = pgdb.query(pg,sql).数据;
    //console.log("=======会员总数======");
    //console.log(shuju);
    return shuju;
}

//各省份订单数
function getShengdingdan(pg){
   // var sql = "select count(1) from 商_送货地址表 where 省 like ('北京','天津','上海','重庆','河北','河南','云南','辽宁','黑龙江','湖南','安徽','山东','新疆','江苏','浙江','江西','湖北','广西','甘肃','山西','内蒙古','陕西','吉林','福建','贵州','广东','青海','西藏','四川','宁夏','海南','台湾','香港','澳门')";
    var sql = "SELECT replace(replace(省,'省',''),'市','') as name,count(1) as value from 商_送货地址表 GROUP BY replace(replace(省,'省',''),'市','')";
    var shuju = pgdb.query(pg,sql).数据;
//  console.log("=======各省订单数======");
//  console.log(shuju);


    return shuju;
}





//意见反馈取最近的二十条
function getViewList(pg){
    var sql = "select a.反馈类别,a.问题描述,a.状态,b.头像 from 平_意见反馈表 a left join 平_会员资料表 b on a.账号 = b.账号 order by a.录入时间 desc limit 20";
    var shuju = pgdb.query(pg,sql).数据;
    //console.log("=======意见反馈======");
    //console.log(shuju);
    return shuju;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "测试",
		"模块": "admin",
		"func": "demo",
		"页数": "10",
		"表名": "管_权限表",
		"编辑": "hf",
		"运行模式": "同步",
		"页面模式": "普通"
	};
	return json;
}