# Cookie的构成部分有哪些

* Name：cookie的名称。
* Value：cookie的值，对于认证cookie，value值包括web服务器所提供的访问令牌。
* Expires：过期时间，如果不设置，cookie会在浏览器关闭后删除。
* Path：可以访问此cookie的页面路径。
* Secure：指定是否使用HTTPS安全协议发送Cookie。
* HttpOnly：设置了HttpOnly属性的Cookie，将不能通过JavaScript脚本访问，有助于防止XSS攻击。