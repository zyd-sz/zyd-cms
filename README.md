# zyd-cms
content manage system
 
封装 增删改查
功能 数据可视化及用户操作
 
结构说明 业务级别代码放adminfunc 其余为封装及平台必须
后端 
routes 
 Tpl
   admin
   admincon
   adminfunc
   ....
前端 
www  
 Tpl
  admin
  admincon
  adminfunc

 
    食用说明
   1 2.0.1版本需要后端每个路由自行添加sqlite3开启与关闭,否则内部权限可能报无法找到sqlite连接对象错误,栗子详情参见adminfunc下实例
   2 修复之前版本对于没有编码造成排序sql出错导致的数据库错误（前端两次编码，后端一次解码）
