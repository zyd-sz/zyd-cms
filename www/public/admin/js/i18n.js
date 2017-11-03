function translate (lng){
				$.i18n.init({
				    lng : lng || 'zh-CN',  
	//			    resGetPath : 'locales/__ns__-__lng__.json',
					resGetPath : '../locales/__lng__.json',
				    debug: true,
	//			    ns: 'resource'
				},function(err, t){
				    $('[data-i18n]').i18n(); // 通过选择器集体翻译
				    //var temp = $.t("a.value"); //通过t函数获得某个翻译的值
				})
			}
var lng = navigator.language || navigator.userLanguage;
var n = lng.substring(0,2);
//lng = "ko_KR";
//api cookie
translate(n);