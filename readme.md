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
		--- lasyload (下滑加载模块)
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

