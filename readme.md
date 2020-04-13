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

2. 认证与状态维持：采用Json Web Token，登录后返回token，前端开发人员根据实际存起来，然后以后在每次请求在请求头Authorization设置值为`Bearer <Token> `，例如`Bearer xxxxxxxxxxxx`，去掉<>

3. HTTP响应状态码：

   - 200：HTTP请求成功，不代表业务请求成功
   - 201：token即将过期，后端重新签发token并依赖键data返回，请前端获取并替换之前的token
   - 401：未登录或者登录超时
   - 404：请求路径错误

4. 业务状态码：见各接口详情。一般成功为0，非0为失败，具体各失败情况以各非0整数区分。一般只需要判断是否是0还是非0，然后获取message提示即可。

5. 统一响应格式：

   - code：业务状态码，整型
   - message：请求结果，字符串
   - data：响应的数据，对象

   ```
   {
       "code":0,
       "message":"提示",
       "data":{
           "k1":"v1",
           "k2":"v2"
       }
   }
   ```

#### 1.1 测试登录权限

请求接口：`https://app.isleslie.com/v1/user/testJwt`

请求方式：`GET`

请求内容：

```json
无，但是请在请求头Authorization设置值为`Bearer <Token>`，例如`Bearer xxxxxxxxxxxx`，去掉<>
```

响应结果：

1. 通过登录权限认证

```json
{
    "code": 0,
    "message": "通过Jwt认证，可以进行登录后的一系列操作！",
    "data": {
        "user": "我是模拟操作返回后的数据"
    }
}
```

2. 没有通过登录权限认证

```json
{
    "code":1,
    "message":"token无效，请登录后操作！",
    "data":{}
}
```



#### 1.2 登录注册

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
    "message": "登录成功！",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhYWEiLCJpYXQiOjE1ODY0NTA5OTYsImV4cCI6MTU4NjQ1Mjc5Nn0.VkR2ImE0pw29_K3hTE6-vgO6e_lCcVcDYIW-Qlc3YQ0"
    }
}
```

2. 登录失败

```json
{
    "code":1,
    "message":"登录失败，请检查手机号码或密码是否正确！",
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
    "message":"注册成功!",
    "data":{
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJhYWEiLCJpYXQiOjE1ODY0NTA5OTYsImV4cCI6MTU4NjQ1Mjc5Nn0.VkR2ImE0pw29_K3hTE6-vgO6e_lCcVcDYIW-Qlc3YQ0"
    }
}
```

2. 注册失败

```json
{
    "code":1,
    "message":"注册失败，手机号码或用户名已存在！",
    "data":{}
}
```