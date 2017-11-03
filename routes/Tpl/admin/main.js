var config = require('../../../func/config.js');
	//config.readfile();
var control = require('../../admin_control.js');
var sqlite = require('../../../func/sqlite.js');
//已经是同步的，用异步写也会同步执行
module.exports.run = function(f,pg,mo,redis,pg2,db){
	//console.log(11111);
	//console.log(f.arg);
	f = control.index(f,db);
	var menu = config.get('menu');
	var listMenu = [];
	var listNav = [];
	var listMenuShow = [];
	var listPower = [];
	
	
	for(var key in f._权限) {
		if(f._权限[key]['查看'] == '1') {
			listPower[f._权限[key]['字段']] = '1';
		}
	}

	menu.forEach(function(item) {
		if(item.菜单) {
			(item.菜单).forEach(function(name) {
				listNav[name.名称] = new Array;
				listMenu.push(name);
			});
		}
		if(item.导航) {
			(item.导航).forEach(function(name) {
				if(listNav[name.菜单] && listPower[name.func]){	
					if(f.arg.nav == null || decodeURIComponent(f.arg.nav) == name.类别 || name.类别 == null || name.类别 == '管'){
						listNav[name.菜单].push(name);
					}
				}
			});
	
		}
	});

	listMenu.forEach(function(name) {
		if(listNav[name.名称].length > 0)
			listMenuShow.push(name);
	});
	
	f.listMenu = listMenuShow;
	f.listNav = listNav;
	//console.log(f);
	sqlite.close(f.db);
	return f;
}
