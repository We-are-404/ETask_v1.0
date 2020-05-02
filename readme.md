## Marble1.0 开发文档

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

#### 写在前面

1. 数据交换格式：JSON

2. 认证与状态维持：采用Json Web Token，登录后返回token，前端开发人员根据实际存起来，然后以后在每次请求在请求头Authorization设置值为`Bearer <Token> `，例如`Bearer xxxxxxxxxxxx`，去掉<>。服务器响应token在响应头Authorization。

3. HTTP响应状态码：

 - 200：HTTP请求成功，不代表业务请求成功
 - 201：token即将过期，后端重新签发token并通过响应头Authorization返回，请前端获取并替换之前的token
 - 401：未登录或者登录超时
 - 404：请求路径错误

4. 业务状态码：见各接口详情。一般成功为0，非0为失败，具体各失败情况以各非0整数区分。一般只需要判断是否是0还是非0，然后获取message提示即可。
5. GET请求请求参数请放在URL中，不要放在请求体；POST请求请求参数请放在请求体中。
6. 统一响应格式：

 - code：业务状态码，整型
 - message：请求结果，字符串
 - data：响应的数据，普通对象或者数组对象**（无响应数据时不显示）**

 ```
 ## 1.普通对象
{
	"code": 0,
	"message": "提示",
	"data": {
		"k1": "v1",
		"k2": "v2"
	}
}
 
 ## 2.数组对象
{
	"code": 0,
	"message": "提示",
	"data": [
	 	{
			"k1": "v1",
			"k2": "v2"
		},
		{
			"k1": "v1",
			"k2": "v2"
		}
	]
}
 ```

#### 1.1 登录注册模块

##### 1.1.1 登录

请求接口：`https://app.isleslie.com/v1/user/login`

请求方式：`POST`

请求内容：

```json
{
    "phone_number":"xxxx",
    "password":"xxxx"
}
```

响应结果：

1. 登录成功

```json
{
    "code": 0,
    "message": "登录成功！"
}
```

2. 登录失败

```json
{
    "code":1,
    "message":"登录失败，请检查手机号码或密码是否正确！"
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
    "message":"注册成功!"
}
```

2. 注册失败

```json
{
    "code":1,
    "message":"注册失败，手机号码或用户名已存在！",
}
```

#### 1.2 好友模块

##### 1.2.1 好友列表

请求接口：`https://app.isleslie.com/v1/user/findMyFriends`

请求方式：`GET`

请求内容：

```json
page=1&rows=10
```

响应结果：

```json
{
    "code": 0,
    "message": "查询我的好友列表成功！",
    "data": [
        {
            "user_id": 12,
            "username": "aaa",
            "phone_number": "18666666666",
            "create_time": 1587211390,
            "avatar_url": "https://cdn.v2ex.com/gravatar/df0b99fd5c8f5ff36a3613ff5db160b5?s=128&r=G&d=identicon",
            "team": "404wefound"
        },
        {
            "user_id": 13,
            "username": "bbb",
            "phone_number": "18666666667",
            "create_time": 1587211390,
            "avatar_url": "https://cdn.v2ex.com/gravatar/df0b99fd5c8f5ff36a3613ff5db160b5?s=128&r=G&d=identicon",
            "team": "404wefound"
        }
    ]
}
```

##### 1.2.2 搜索好友

请求接口：`https://app.isleslie.com/v1/user/findUser`

请求方式：`GET`

请求内容：

```json
phone_number=18666666666
```

响应结果：

1. 搜索成功

```json
{
    "code": 0,
    "message": "查询用户成功！",
    "data": {
        "user_id": 12,
        "username": "aaa",
        "phone_number": "18666666666",
        "create_time": 1587211390,
        "avatar_url": "https://cdn.v2ex.com/gravatar/df0b99fd5c8f5ff36a3613ff5db160b5?s=128&r=G&d=identicon",
        "team": "404wefound"
    }
}
```

2. 搜索失败

```json
{
    "code": 1,
    "message": "查询用户失败，手机号码不存在！"
}
```

