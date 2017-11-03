function seach_html(_seach_url,html){
	  var arr_a = html.split('?');
	  arr_b = arr_a[1].split('&');
	  html_con = '';
	  html_a = '';
	  arr_b.forEach(function(name,key){
		  if(name == null || name == '')
		  {}
		  else if(name.indexOf('_seach=') >= 0){
		  }
		  else{
			 html_con += html_a+name 
			 if(html_a == '') html_a = '&';
		  }

	  })
	  html = arr_a[0]+"?"+html_con+'&_seach='+encodeURIComponent(_seach_url);
	  return html;
}


 function relo(_type){
  	  if(_open_type==2 && _type){
		  _seach_url = window.opener._seach;
		  html = window.opener.document.URL;
		  //更改了一下
		  if(html.indexOf('?') > 0 && html.indexOf('&_seach=') < 0 )
			html = html + '&_seach='+encodeURIComponent(_seach_url);
		  window.opener.location.replace(html);
		  if(_type==2){
			  location.href=document.URL;
		  }
		  
		  else{
		  window.close();
		  }
	  }
	  else{
	  	html = document.URL;
	  	if(html.indexOf('?') > 0 && html.indexOf('&_seach=') < 0 )
			html = html + '&_seach='+encodeURIComponent(_seach);
	  	//html = seach_html(_seach,html);
	  	location.href = html;
	  	window.opener.location.replace(html);
	  }
 }

 function dele(id){
 	$("#add").css({"display":"block"});
 	document.getElementById("iframe").src='?_m=admin&_f=deletes&id='+id+"&_mm="+module_name+"&_nn="+action_name;
 } 
 
function dein(){
if($("#howinput").attr("checked")==true)
$("#main input").attr("checked",'true');
else 
$("#main input").attr("checked",'');
howid();
} 


function status(type,id){

 document.getElementById("iframe").src='?_m=admin&_f=status&id='+id+"&_mm="+module_name+"&_nn="+action_name+"&type="+type;

}

function oksta(name,id,type){
document.getElementById(name+id).src=public+"/admin/images/status-"+type+".gif";
}

idinput_num = '';
function update_id(how_id,type){
	
   var 连接内容 = '';
   if(type != null && type != '')
   		连接内容 = '&_template=look';
   html=app+"&_f=update"+连接内容;
   if(idinput_num == '')
  	 id = $(".idinput[checked=true]:last").val();
   else
   	 id = idinput_num;
	if(id == null || id == ''){		
		id = how_id;
	}
   if(how_id)
   html+="&id="+id+"&how_id="+how_id;
   //console.log(html);
   jq_href(html,id)
}
function update_con(){
	update_id(howid());	
}

//[多选id合并
function howid(){
	var a=[];
	i=0;
	$(".idinput").each(function(){ 
	if($(this).attr("checked")==true){
	a[i]=$(this).val();i++;}
	});
	id=a.join(",");

	if(id){
		//console.log('======可点击=======')
		$(".handle-btns").attr({"class":"handle-btns"});
		$(".handle-btns .img-1 input").attr({"disabled":""});
		$(".handle-btns .img-2 input").attr({"disabled":"disabled"});
		$(".handle-btns .img-2 p input").css("color","#999999")
		$(".handle-btns .img-2").addClass("img-3");
		$(".handle-btns .img-2 p").addClass("img-4");
	}
	else {
		//console.log('======不可点击=====')
		$(".handle-btns").attr({"class":"handle-btns img-b"});
		$(".handle-btns .img-1 input").attr({"disabled":"disabled"});	
		$(".handle-btns .img-2 input").attr({"disabled":""});	
		$(".handle-btns .img-2").removeClass("img-3")
		$(".handle-btns .img-2 p").removeClass("img-4");
		$(".handle-btns .img-2 p input").css("color","#4b4c47")
	}
	return id;	
}
//[多选id合并

//[选择删除
/*
function dehow(){
	id=howid();
	if(!id)alert('请选择内容！');
	else 
	dele(id);
}*/   //1118改
function dehow(){
	id = howid();
	if(confirm('你确定要删除吗？')){
		if(!id)
		alert('请选择删除内容哦')
		else dele(id);
	}else{
		return false;
	}
}

//[选择删除

function ord(name){
location.href=ord_select+ 'ord=' + encodeURIComponent(encodeURIComponent(name));
 event.stopPropagation();

}
function hidesu(){
$("#add").hide();	
}
	


$(document).ready(function (){
	
$(".idinput").click(function(){
  if($(this).attr("checked")==true)
  {
	  idinput_num = $(this).val();
  }
  else
  	 idinput_num = '';
  howid();
})
	
$("#checkList tr").hover(function (){
	$(this).attr("id","j_hover");
	},function (){
	$(this).attr("id","");
})
	
	
$(".inputimg samp").click(function (){
$(this).parent().hide();
$(this).parent().parent().find(".fileimg").show();	
	})		
	
$(".jqtext samp").hover(function (){
$(this).css({"background":"#787b8a","color":"#fff"});	
	},function (){
$(this).css({"background":"none","color":"#3d3d3d"});			
		})	
	
$(".jqtext samp").click(function (){
$(this).hide();
width=$(this).width();
width+=10;
samp=$(this).html();
$(this).after('<input value="'+samp+'" name="aa" style="width:'+width+'" onblur="onb(this)"/>');
$(this).parent().find('input').focus();	
	})
})	
function onb(inp){		
	input=$(inp).val();
	if(samp!=input){
		formsu();		
		$(inp).parent().find("samp").html(input);
		id=$(inp).parent().find("samp").attr('rel');
		con=$(inp).val();
		control=$(inp).parent().find("samp").attr('class');
		htmlobj=$.ajax({ url:jqtexthtml+"/name/"+thinkname+"/id/"+id+'/con/'+con+'/control/'+control,async:false});
		yeno=htmlobj.responseText;
		if(yeno==1)
			hidesu();
		else if(yeno.indexOf("authority()")>0){
		   authority();
		}			
	}
	$(inp).hide();
	$(inp).parent().find("samp").show();
}		



var formtitle=[];
function formsu(form){
i=0;
no=0;
$(".requireinput").each(function (){
_name=$(this).val();
	if(_name==''){	//为空时
		formtitle[i]=$(this).parent().parent().find("th").html();
		no=1;
		i++;
		return false;//跳出循环
	}
})
	
if(no==0){
$("select").each(function (){

if($(this).attr('v')==' requireinput'){	
	if($(this).val()==''){
		formtitle[i]=$(this).parent().parent().find("th").html();
		no=1;
		i++;
		return false;	
    }	
}
})	
}
	
if(formtitle[0] && no==1){alert('请输入'+formtitle[0]+'！');return false;}
$("#add").css({"display":"block"});
	}
	
function authority(){
$("#add").css({"display":"none"});	
alert("对不起您无此权限");	
	}	
	
	
	
function export_exl(){
	_exc =_exc.replace(/&#39;/g,"'").replace(/&gt;/g,">").replace(/&lt;/g,"<");
	newExc = encodeURI(_exc);
//	console.log(newExc);
	
//	location.href = '/Tpl/admincon/import_excel.xhtml?sql='+_exc;
	location.href = '/Tpl/admincon/import_excel.xhtml?sql='+newExc;
}

function export_exl_sqlite(){
	_exc =_exc.replace(/&#39;/g,"'").replace(/&gt;/g,">").replace(/&lt;/g,"<");
	location.href = '/Tpl/admincon/import_excel.xhtml?&db=sqlite&sql='+_exc;
}

//[标签数据表
function jq_keyup(){	
	$(".jq_keyup_con a").click(function (){
	  html=$(this).html();
	  jq_name=$(this).parent().parent().find("input:eq(0)");	
	  jq_name.val(html);	
	  name=jq_name.attr('name');
	  jq_con=$(this).parent().parent().find(".jq_keyup_con");
	  p_rel=jq_con.attr("rel");
	  type=jq_con.attr("v");
	  arr_p_rel=p_rel.split("^");
		  rel=$(this).attr('rel');
		  arr_a=rel.split("^");
		  if(type=="s"){
			  for(i=0;i<arr_a.length;i++){
				 $("#"+arr_p_rel[i]).val(arr_a[i]); 
			  }
		  }
		  else if(type=="c"){
			   jq_name.after('<samp> <input name="'+name+'[]" type="checkbox" value="'+arr_a[1]+'" checked="checked" /> '+arr_a[0]+"</samp>");  
		  }
	  $(".jq_keyup_con").hide();	
	  $(".jq_keyup samp").click(function (){
		  $(this).remove();
	   })
	   
	})

	 $(document).one("click", function(){
			$(".jq_keyup_con").hide();
	 });

}

//[标签数据表
function jq_keyup1(){	
	$(".jq_keyup_con a").click(function (){
	  html=$(this).html();
	  jq_name=$(this).parent().parent().find("input:eq(0)");	
	  jq_name.val(html);	
	  $(".jq_keyup_con").hide();	
	  $(".jq_keyup samp").click(function (){
		  $(this).remove();
	   })
	   
	})

	 $(document).one("click", function(){
			$(".jq_keyup_con").hide();
	 });

}

/*$(document).keydown(function(event){ 
	if(event.keyCode==120){
	   html = '?_m=admincon&_n=update_program&func='+action_name;
	   if(module_name=="admincon" && action_name=="update_program"){
	   	  模块 = $("input[name='模块']").val();
		  func = $("input[name='func']").val();
		  后台列表 = $("textarea[name='后台列表']").val();
		  update_url = '';
		  if(后台列表 == '')
		  	update_url = '&_f=update&_open_type=2';
		  location.href="?_m="+模块+"&_n="+func+update_url;
	   }
	   else
	  	  parent.location.href=html;
	   
	}
	else if(event.altKey && event.keyCode==83){
		if(_open_type==2)
		$("#_open_type").val(1);
		$("#form_submit").click();
	}
	else if(event.altKey && event.keyCode==68 && _open_type==2){
		if(_open_type==2)
		$("#_open_type").val(2);
		$("#form_submit").click();
	}	
}); 
*/
function jq_keyup_ajax(name,p_id,db){

	s_name=$("#"+name).val();
	con = $("#"+name).attr("rel");

	$.ajax({
		type:"POST",
		url:"/Tpl/admin/label_sql.xhtml?a=1",
		data: "name="+name+"&con="+con+"&s_con="+s_name+"&db="+db,
		success: function(r){
			jq_name=$("#"+name).parent().find(".jq_keyup_con");
			jq_name.html(r);
			jq_name.show();
	   }
	});
}
//]标签数据表

//[按扭
function jq_bottom(type,html,name,pass,mo){
	how_id=howid();
	id_con="";

 if(type==1){
	 
   if(idinput_num == '')
  	 id = $(".idinput[checked=true]:last").val();
   else
   	 id = idinput_num;
	 
   id_con = "id="+id+"&how_id="+how_id;
	html_con =	"&_b_name="+name+"&_b_pa="+pass+"&_b_f="+mo;
  	jq_href(html+html_con+"&"+id_con);
 }
 else if(type==2){
	if(id)
	  id_con="&id="+how_id;
	$.ajax({ url:app+"&_ms_main=no&_f=_button_"+html+id_con,success:function (r){	
		alert(r);
	    if(r=='提交成功'){
			relo('')
		}
	}}) 
 }
 else if(type==3){
	if(id)
	  id_con="&id="+how_id;
	  $.ajax({ url:html+ '&_name='+ name + id_con + "&_b_pa="+ pass,success:function (r){	
			if(r=='提交成功1'){
				alert('提交成功');
				self.opener.parent.location.reload();
				window.close();
			}else{
				alert(r);
				if(r=='提交成功'){
					relo('');
				}
			}
		}
	})
}else if(type==4){
	var info = '';
	if(mo){
		info = '确定' + mo + '吗？';
	}else{
		info = '确定要删除吗!';
	}
	
 	if(confirm(info)){
		if(id) id_con="&id="+how_id;
		  $.ajax({ url:html+ '&_name='+ name + id_con + "&_b_pa="+ pass,success:function (r){	
					alert(r);
					if(r=='提交成功'){
						relo('');
					}
			}})
 	}
 }

}
//[按扭





//[原模块跳转
function rel(){
 location.href = document.URL;	
}
function jump_html(){

  location.href=app;
}
//[原模块跳转



//[上下级列表
function pclick(id,name){	
	$(".p_show_"+id).toggle();
	if($(".p_show_"+id).css("display")=="none"){ 
		$(name).find("div").css("background","url("+public+"/admin/images/menu_plus.gif) no-repeat");
	}else{
	    $(name).find("div").css("background","url("+public+"/admin/images/menu_minus.gif) no-repeat");	
	}	
}
//[上下级列表



//[列表图片显示

function jq_show_img(name){
	$(".jqclass").hover(function (){
	id=$(this).attr("rel");
	img_name=$(this).attr("v");
	jqname=$(this);
	$(".jqclass img").hide();
	if(!$(this).find("img").attr("src")){
	$.ajax({ url:app+"/adminsys/jqimg/name/"+name+"/id/"+id+"/img_name/"+img_name,success:function (con){
	jqname.append("<img src='"+con+"'>");	
		}})
	}
	else 
	$(this).find("img").show();	
		},function (){
	$(this).find("img").hide();		
		})	
}
//[列表图片显示

//多图上传
function how_img_t(type,name){
   if(type==2 && $("#h_i_"+name+"2").html()==""){
      href_con=$(".h_i_t_"+name).attr("v");
		$.ajax({ url:app+"/adminsys/how_img/href_con/"+href_con,success:function (r){
			   $("#h_i_"+name+"2").html(r);	
			   how_img_de();
		}})

   }	
   $("#h_i_"+name+"1").hide();	
   $("#h_i_"+name+"2").hide();
   $("#h_i_"+name+type).show();
   $(".h_i_t_"+name+" input").attr({"class":"reset_btn"});
   $(".h_i_t_"+name+" #botton"+type).attr({"class":"submit_btn"});

   
}

function how_img_de(){
   $(".how_img_u #a input").click(function (){
	   if($(this).attr("checked")==true){
		  
		   $(this).parent().parent().find(".d input").attr({"checked":true});   
	   }
	   else
	   {
		  $(this).parent().parent().find(".d input").attr({"checked":false});    
	   }  
  })
   $(".how_img_u #a a").click(function (){  
       if(confirm('确定要删除吗！')){
		   o="";
		   id="";
		   $(this).parent().parent().find(".d input[checked=true]").each(function (){
			   id+=o+$(this).val();
			   o=",";  
			   $(this).parent().remove();
		   })
		   if(id){
			   name= $(this).attr("v");
			   conditions=$(".h_i_t_"+name).attr("v");
			   
		      $.ajax({ url:app+"/adminsys/how_img_de/conditions/"+conditions+"/id/"+id,success:function (r){
				   alert("删除成功");  
			  }})
		   }
		   else  alert("请选择图片");
 		   
	   }
   })
  	
}

//多图上传

function hf(type){
	if(type==1){
		document.getElementsByTagName('BODY')[0].scrollTop=0;	
	}
	else if(type==2){
		document.getElementsByTagName('BODY')[0].scrollTop=document.getElementsByTagName('BODY')[0].scrollHeight;	
	}
}

//主从表点击


function jq_file_div(){
	$(".jq_file_div samp").click(function(){
		var img_src = $(this).find("img").attr("src");
		if(img_src == null)
		 	img_src =$(this).html();
		window.open(img_src);	
	})
}
	$(document).ready(function (){
	   if(_ms_main=="no"){
	$("#checkList tbody tr").click(function (){
				var arr_a = new Array;
				var arr = new Array;
				$(this).find("td").each(function (key){
					if(key==0){
						arr_a[key]=$(this).find("input").val();
					}
					else{
						con = $(this).html();
						con = con.replace(/<[^>]+>/g,"");
						con = con.replace(/[\r\n]/g,"");
						con = con.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
						arr_a[key]=con;
					}
				})
				$("#checkList thead th").each(function(key){
					if(key==0){
						arr['id'] = arr_a[key];
					}
					else{
						con = $(this).html();
						con = con.replace(/[\r\n]/g,"");
						con = con.replace(/<[^>]+>/g,"");
						con = con.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
						var reg=new RegExp('↑',"g");   
						con=con.replace(reg,'');
						reg=new RegExp('↓',"g");   
						con=con.replace(reg,'');
						arr[con] = arr_a[key];
					}
				})
				parent.document.getElementById('ms_middleFrame').contentWindow.getid(arr);
			})
	   }
	   
	   jq_file_div();
	
//在表格中点击查看出现对应的内容
			$('.lookup').click(function(){
				$('.lookTable').hide();
				$(this).parent().find('.lookTable').show();
			});
			$(".bzlook").click(function (event) {
	   		  if(event.target.className!='lookup'){
//	   			$(this).find('.lookTable').hide();
           $('.lookTable').hide();
           
	   		  }
             event.stopPropagation(); //阻止事件冒泡    
      });
	
	
	   
	   $(".up_de").click(function (event) {
	   		if(event.target.className!='up_select'){
	   			$(".select_button").remove();
	   		}
        event.stopPropagation(); //阻止事件冒泡    
      });
	   
	   //[下拉按扭
	   
		$(".up_select").click(function (){
			//console.log(333);
			
			$(".select_button").remove();
			content = $("#select_button").html();
			$(this).parent().append('<div class="select_button">'+content+'</div>');
			select_button();
var xiaheight=$(this).parent().css("height");
      var xiaH=parseInt(xiaheight)+17+"px";
      var xiawidth=$(this).parent().css("width");
      var selHeight=$(".select_button").css("height");
      var selWidth=$(".select_button").css("width");
      var cawidth=parseInt(xiawidth)-parseInt(selWidth)+"px";
      $(".select_button").css("top",xiaH);
      $(".select_button").css("left",cawidth);if($("#select_button").text().trim() == "" || $("#select_button").text().trim() == null || $("#select_button").text().trim() == undefined) {
			$(".select_button").css("border", "none");
		}
		})
	   //]下拉按扭
	})
	
	
//[下拉按扭
function select_button(){
	$(".select_button a").click(function (){
		v = $(this).attr("v");
		v = JSON.parse(v);
		id = $(this).parent().parent().attr('v');
		 if(v[0]==1){
			id_con = "id="+id+"&how_id=";
			html_con =	"&_b_name="+v[2]+"&_b_pa="+v[3]+"&_b_f="+v[4];
			jq_href(v[1]+html_con+"&"+id_con);
		 }
		 else if(v[0]==2){
			  id_con="&id="+id;
			$.ajax({ url:app+"?_ms_main=no&_f=_button_"+v[1]+id_con + "&_b_pa="+v[3],success:function (r){	
				alert(r);
				if(r=='提交成功'){
					relo('')
				}
			}}) 
		 }
		 else if(v[0]==3){
			  id_con="&id="+id;
			$.ajax({ url:v[1]+ '&_name='+ v[2] + id_con + "&_b_pa="+v[3],success:function (r){	
				alert(r);
				if(r=='提交成功'){
					relo('')
				}
			}}) 
		 }
		 else if(v[0]==4){
		 	//删除提示
		 	var info = '';
			if(v[4]){
				info = '确定' + v[4] +'吗？';
			}else{
				info = '确定要删除吗!';
			}
		 	if(confirm(info)){
			 		id_con="&id="+id;
				$.ajax({ url:v[1]+ '&_name='+ v[2] + id_con + "&_b_pa="+v[3],success:function (r){	
					alert(r);
					if(r=='提交成功'){
						relo('')
					}
				}}) 
		 	}
		 }
		 
		 $(".select_button").remove();
		
	})
}
//]下拉按扭



 function base64_encode(str){

                var c1, c2, c3;
                var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";                
                var i = 0, len= str.length, string = '';

                while (i < len){
                        c1 = str.charCodeAt(i++) & 0xff;
                        if (i == len){
                                string += base64EncodeChars.charAt(c1 >> 2);
                                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                                string += "==";
                                break;
                        }
                        c2 = str.charCodeAt(i++);
                        if (i == len){
                                string += base64EncodeChars.charAt(c1 >> 2);
                                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                                string += "=";
                                break;
                        }
                        c3 = str.charCodeAt(i++);
                        string += base64EncodeChars.charAt(c1 >> 2);
                        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                        string += base64EncodeChars.charAt(c3 & 0x3F)
                }
					 
                        return string
        }


   //[列表搜索条件
//function _search_form(){
//	_search_con="";
//	_search_a="";
//	$("#search input,#search select").each(function(){
//	  _search_name=$(this).attr("name");
//
//	  if(_search_name!=""){
//		 _search_content=$(this).val();
//		 _search_con+=_search_a+_search_name+"="+_search_content;
//		 _search_a = "\n";
//	  }
//	})
//	_search_con=base64_encode(_search_con);
//	_search_con=encodeURI(encodeURI(_search_con));
//
//	location.href=app+'/'+module_name+'/'+action_name+'/_search_con/'+_search_con;
//	return false;
//}
   //]列表搜索条件
   
var region = localStorage.getItem("region");
var accessKeyId = localStorage.getItem("accessKeyId");
var accessKeySecret = localStorage.getItem("accessKeySecret");
var bucket = localStorage.getItem("bucket");
var a_img_url = localStorage.getItem("a_img_url");


	if(accessKeyId == null || accessKeyId == null || bucket == null || region == null){

		$.ajax({ url:"?_m=admin&_f=file_parameter",success:function (r){
			window.localStorage.region = r.region;
			window.localStorage.accessKeyId = r.accessKeyId;
			window.localStorage.accessKeySecret = r.accessKeySecret;
			window.localStorage.bucket = r.bucket;
			window.localStorage.a_img_url = r.a_img_url;
			region = r.region;
			accessKeyId = r.accessKeyId;
			accessKeySecret = r.accessKeySecret;
			bucket = r.bucket;
			a_img_url = r.a_img_url;
		}})
	 }



function aliyun_img(img_id) {

	document.getElementById('_file_' + img_id).addEventListener('change', function(e) {
		$('#_file_' + img_id).after("<samp><img src='../../public/admin/images/ajaxloading1.gif' />正在上传中……</samp>");
		var client = new OSS.Wrapper({
			region: region,
			accessKeyId: accessKeyId,
			accessKeySecret: accessKeySecret,
			bucket: bucket
		});
		var file = e.target.files[0];
		var timestamp = new Date().getTime();
		var 阿里路径 = $('#_file_' + img_id).attr("v");
		if(阿里路径 != null && 阿里路径 != '')
			a_img_url = 阿里路径;
		var storeAs = a_img_url + _funcm + '_' + timestamp;
		//storeAs是保存的文件的上传名字，可更改，不改会替换原文件
		console.log(file.name + ' => ' + storeAs);
		client.multipartUpload(storeAs, file).then(function(result) {

			//[地址判断
			if(!result.url) {
				result.url = "http://" + bucket + "." + region + ".aliyuncs.com/" + storeAs;
			}
			//]地址判断

			$('#_file_' + img_id).parent().find("samp").remove();
			$("#_img_" + img_id).html('<img src="' + result.url + '"/>');
			$("#" + img_id).val(result.url);

		}).catch(function(err) {

			console.log(err);
		});
	});
}
//单图上传
function jq_file_funcs(name, path) {
	//path = JSON.stringify(path);
	$.ajax({
		url: '/Tpl/admin/img.xhtml',
		type: 'post',
		data: path  ,
		success: function(data) {
			//alert(data)
			if(data.状态 == '成功') {
				$("#jq_fi_id_" + name + " samp").html("<img src='" + data.url + "' />");
				$("#" + name).val(data.url);
				$("#jq_fi_id_" + name + " samp").css({
					"color": "green"
				});
			} else {
				alert(data.状态);
				$("#jq_fi_id_" + name + " samp").html(old_name);
			}
			$("#add").css({
				"display": "none"
			});
		}
	})
}
//单图上传

//新窗口打开
function href(a){
	window.open(a);
}

		function open_dialog(){
			document.getElementById('jq_fi_内容').click();
		}
		
				function open_dialogs(){
			document.getElementById('jq_fi_缩略图').click();
		}
function dele_pic(){
		$(".delete_pic").click(function() {
		    $(this).parent().remove();
		});	
}

//多图文件上传
function jq_file_funcd(name, path) {
	//path = JSON.stringify(path);
	$.ajax({
		url: '/Tpl/admin/img.xhtml',
		type: 'post',
		data: path,
		success: function(data) {
			//alert(data)
			if(data.状态 == '成功') {
				$('#jq_fi_id_' + name + ' .img_insert').before(
					'<div class="img_file" name="box" style="display: inline-block;position: relative;top: 12px;margin:2px 2px">' +
					'<img class="img_uploading" onclick="href(\''+data.url+'\')" src="' + data.url + '" style="display: inline-block;width:115px;height: 80px;"/>' +
					'<img class="delete_pic" src="../../public/admin/images/img_shanchu.png" style="position: absolute;display:none;width:20px;top: -6px;left: -4px;"  />' +
					'<input value="' + data.url + '" name="' + name + '" type="hidden" />' +
					'</div>'
				);
				console.log('-----------data------------')
				console.log(data.url);
				console.log('-----------data------------')
				
				$(".img_file").hover(function() {
					$(this).find(".delete_pic").css("display", "block");
				}, function() {
					$(this).find(".delete_pic").css("display", "none");
				});
				dele_pic();
			} else {
				alert(data.状态);
				$("#jq_fi_id_" + name + " samp").html(old_name);
			}
			$(".download_logo").css("display", "none");

		}
	})
}

//多图文件上传加入内容
function jq_file_content(name, path) {
	//path = JSON.stringify(path);
	$.ajax({
		url: '/Tpl/admin/img.xhtml',
		type: 'post',
		data: path,
		success: function(data) {
			//alert(data)
			if(data.状态 == '成功') {
				$('#jq_fi_id_' + name + ' .img_insert').before(
					'<div class="img_file" name="box" style="display: inline-block;position: relative;top: 12px;margin:2px 2px">' +
					'<img class="img_uploading" onclick="href(\''+data.url+'\')" src="' + data.url + '" style="display: inline-block;width: 115px;height: 80px;"/>' +
					'<img class="delete_pic" src="../../public/admin/images/img_shanchu.png" style="position: absolute;display:none;width:20px;top: -6px;left: -4px;"  />' +
					'<p><input value="" placeholder="描述:" name="描述" type="text" style="width:113px;height: 13px;"></p>' +
					'<input value="' + data.url + '" name="' + name + '" type="hidden" />' +
					'</div>'
				);
//				$(".delete_pic").click(function() {
//					$(this).parent().remove();
//                                    
//				});
				$(".img_file").hover(function() {
					$(this).find(".delete_pic").css("display", "block");
				}, function() {
					$(this).find(".delete_pic").css("display", "none");
				});
				dele_pic();
			} else {
				alert(data.状态);
				$("#jq_fi_id_" + name + " samp").html(old_name);
			}
			$(".download_logo").css("display", "none");

		}
	})
}

//[文件图片上传
function jq_file_func(name, type) {
	document.getElementById("jq_fi_" + name).addEventListener('change', function(e) {
		var old_name = $("#jq_fi_id_" + name + " samp").html();
		$("#jq_fi_id_" + name + " samp").html('<img src="../../public/admin/images/ajaxloading1.gif">正在上传中……');
		$("#jq_fi_id_" + name + " samp").css({
			"color": "red"
		});
		path = $("#jq_fi_" + name).attr("v");
		var url = "/public/baidu_ueditor/ueditor/ue?action=uploadimage&type=" + type + "&path=" + path;
		url = "/temp";
		$.ajaxFileUpload({
			url: url, //需要链接到服务器地址  
			secureuri: true,
			fileElementId: "jq_fi_id_" + name, //文件选择框的id属性
			dataType: 'json',
			type: 'post',
			success: function(data, status) {
				//console.log(data);
				if(data.状态 == '成功') {
					//jq_file_func(data);
					//新的ajax？
					if(type == 'img' || type == 'ali') {
						jq_file_funcs(name, data);
						//$("#jq_fi_id_"+name+" samp").html("<img src='http://zyk-temp.oss-cn-shenzhen.aliyuncs.com/cc97aca780e1b5ee87f5a50c5d37aa2a_1492312288509' />");
					} else if(type == 'images') {
						$("#_t_"+name+ " .download_logo").css("display", "block");
						jq_file_funcd(name, data);
					} else if(type == 'content') {
						$("#_t_"+name+ " .download_logo").css("display", "block");
						jq_file_content(name, data);
					}else if(type == 'thumbnail') {
						$("#_t_" + name + " .download_logo").css("display", "block");
						jq_file_multiple(name, data);
					}else {
						$("#jq_fi_id_" + name + " samp").html(data.newpath);
					}
					$("#" + name).val(data.newpath);
					$("#jq_fi_id_" + name + " samp").css({
						"color": "green"
					});
				} else {
					alert(data.状态);
					$("#jq_fi_id_" + name + " samp").html(old_name);
				}
				$("#add").css({
					"display": "none"
				});
			},
			error: function(data, status, e) {
				showDialogWithMsg('ideaMsg', '提示', '文件错误！');
				$("#add").css({
					"display": "none"
				});
			}
		});
		jq_file_div();
	})
}

//上传图片的多图上传
function jq_file_multiple(name, path) {
	$.ajax({
		url: '/Tpl/admin/img.xhtml',
		type: 'post',
		data: path,
		success: function(data) {
                          console.log(data);
			if(data.状态 == '成功') {
				$('#jq_fi_id_' + name + ' .img_insert').before(
					'<div class="itm_pic" id="pic" style="display: inline-block;position: relative;">' +
					'<img class="itm_pic itm_pica" src="' + data.url + '" style="display: inline-block;"/>' +
					'<div class="delete_pic" id="del" style="width: 120px;height: 30px; opacity: 0.4; background: #000000;position: absolute;margin-top: -35px;display: none;">' +
					'<p style="text-align: center;font-size: 16px;color: #FFFFFF;line-height: 25px;">删除</p>' +
					'</div>'+
					'</div>'
				);
//				$(".delete_pic").click(function() {
//					 $(this).parent().remove();
//				});
				$(".itm_pic").hover(function() {
					$(this).find(".delete_pic").css("display", "block");
				}, function() {
					$(this).find(".delete_pic").css("display", "none");
				});
				dele_pic();
			} 
		}
	})
}
//]文件图片上传
//[操作删除
function up_delete(id){
	if(confirm('确定要删除吗！'))dele(id);
}
//]操作删除
/*限制只有中文和字母*/
function shuru1(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, '')
}

/*限制只有数字*/
function shuru2(a) {
	a.value = a.value.replace(/\D/g, '')
}

/*限制只有数字字母*/
function shuru3(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9]/g, '')
}

/*限制只有中文、英文、数字、空格*/
function shuru4(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g, '')
}

/*限制只有中文*/
function shuru5(a) {
	a.value = a.value.replace(/[^\u4E00-\u9FA5]/g, '')
}
/*限制只有数字和小数点*/
function shuru6(a) {
	a.value = a.value.replace(/[^\0-9\.]/g,'');
}
//限制只有中文、英文、数字
function shuru7(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
}

function _reset() {
	history.go(0)
}

$(function(){
//	页面缩放
	myfunction();
  function myfunction(){
		var heights = $('.handle-btns').css('height');
		$('.search-box').css('margin-top',heights);
  }
	$(window).resize(myfunction);
	
	var td_width = $("#checkList").children("thead").children().children().length;
	$("[colspan=15]").attr("colspan", td_width);
})

