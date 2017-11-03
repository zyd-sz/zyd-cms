get_num();
var isThumbsUp = true;
function thumbs() {
	var num = $('.thumbs_num').html()
	if(isThumbsUp) { //点击是实心 点赞
		$('.thumbs_up').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up');
		$('.thumbs_num').html(Number(num) + 1);
		isThumbsUp = false;
	} else { //点击了是空白 取消点赞
		$('.thumbs_up').removeClass('fa-thumbs-up').addClass('fa-thumbs-o-up');
		$('.thumbs_num').html(Number(num) - 1);
		isThumbsUp = true;
	}

	support_num();
}

/*
 * 这里是传值给服务器 
 */
function support_num() {
	var id = html_name('id');
	$.ajax({
		url: '/?_m=adminfunc&_n=mass&_f=support_num&content_id=' + id + '&isThumbsUp=' + isThumbsUp,
		type: 'get',
		success: function(data) {
			console.log(data)
		}
	});
}

/*
 * 这里是从服务器接收值
 */
function get_num() {
	var id = html_name('id');
	$.ajax({
		url: '/?_m=adminfunc&_n=mass&_f=get_num&content_id=' + id,
		type: 'get',
		success: function(data) {
			var info = {};
			info = JSON.parse(data);
			//console.log(JSON.parse(data));
			$('.thumbs_num').html(info.点赞数);
		}
	});
}

/*[网址元素*/
function html_name(name) {
	html = window.location.search;
	arr_html = html.split("?");
	if(arr_html.length > 1) {
		arr_html = arr_html[1].split("&");

		for(i = 0; i < arr_html.length; i++) {
			arr_b = arr_html[i].split("=");
			if(arr_b[0] == name) {
				return arr_b['1'];
				break;
			}
		}
		return '';
	} else
		return '';
}