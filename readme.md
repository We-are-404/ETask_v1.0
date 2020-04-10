## ETask1.0 开发文档
**此项目设为非盈利性内用！仅为404 we found内部成员练手项目，不得拿来私用、盈利。如经发现，立刻踢除404 we found 工作室**



### 前端结构:

```

|- src
	-- user.html (登录注册页面)
	-- main.html (用户主页)
	-- task.html (任务中心)

|- script
	-- user
		--- index.js
		--- events
			---- login.js
			---- sign.js
	-- main
		--- index.js (用户主页引入脚本文件)
		--- search	(搜索模块)
			---- index.js
			---- events
				----- friendSearch.js
				----- taskSearch.js
		--- switch	(左侧列表切换模块)
			---- index.js
			---- events
		--- lazyload (下滑加载模块)
			---- index.js
			---- events
				----- friendLoad.js
				----- taskLoad.js
		--- ...
	-- task
		...
	
|- static (静态资源管理)
	-- img
	-- ...
	
|- style
	...
```



### 后端接口:

#### 1.1 登录注册

##### 1.1.1 登录

请求接口：`https://app.isleslie.com/v1/user/login`

请求方式：`POST`

请求内容：

```json
{
    "username":"xxxx",
    "password":"xxxx"
}
```

响应结果：

1. 登录成功

```json
{
    "code": 0,
    "message": "登录成功",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhYWEiLCJpYXQiOjE1ODY0NTA5OTYsImV4cCI6MTU4NjQ1Mjc5Nn0.VkR2ImE0pw29_K3hTE6-vgO6e_lCcVcDYIW-Qlc3YQ0"
    }
}
```

2. 登录失败

```json
{
    "code":1,
    "message":"登录失败",
    "data":{}
}
```



##### 1.1.2 注册

请求接口：`https://app.isleslie.com/v1/user/register`

请求方式：`POST`

请求内容：

```json
{
    "username":"xxxxx",
    "password":"xxxxx",
    "phone_number":"18666666666",
    "team":"404wefound"
}
```

响应结果：

1. 注册成功

   注册成功和登录一样直接返回token，可以不需要重新输入账号密码登录

```json
{
    "code":0,
    "message":"注册成功",
    "data":{
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhYWEiLCJpYXQiOjE1ODY0NTA5OTYsImV4cCI6MTU4NjQ1Mjc5Nn0.VkR2ImE0pw29_K3hTE6-vgO6e_lCcVcDYIW-Qlc3YQ0"
    }
}
```

2. 注册失败

```json
{
    "code":1,
    "message":"注册失败",
    "data":{}
}
```