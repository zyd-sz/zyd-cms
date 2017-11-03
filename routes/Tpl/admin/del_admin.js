module.exports.run = function(f,pg,mo) {
	delete f.session.user_id;
	delete f.session.user_pid;
	var con = '<script>parent.location.href="/Tpl/admin/login.xhtml";</script>';
	f._isRander = con;
	return f;
}