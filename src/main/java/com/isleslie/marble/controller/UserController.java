package com.isleslie.marble.controller;

import com.isleslie.marble.annotation.JwtIgnore;
import com.isleslie.marble.common.response.Result;
import com.isleslie.marble.model.Jwt;
import com.isleslie.marble.model.User;
import com.isleslie.marble.service.IUserService;
import com.isleslie.marble.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/v1/user")
public class UserController {

	@Autowired
	private IUserService userService;
	@Autowired
	private Jwt jwt;

	public Result refreshJwt(HttpServletRequest request, HttpServletResponse response, Result res){
		String refreshToken = (String) request.getAttribute("refreshJwt");
		if(refreshToken != null){
			response.setStatus(201);		//201代表：已创建。成功请求并创建了新的资源。在本程序中代表jwt需要更新
			res.getData().put("token",refreshToken);
		}
		return res;
	}

	@JwtIgnore
	@PostMapping("/login")		//手机号登录
	public Result login(@RequestBody User user){
		boolean flag = userService.loginByPhoneNumber(user);
		Result res;
		if(flag){
			res = new Result(0,"登录成功！");
			res.getData().put("token", JwtUtil.createJwt(user.getUsername(),user.getPhoneNumber(), jwt));
		}else {
			res = new Result(1,"登录失败，请检查手机号码或密码是否正确！");
		}
		return res;
	}

	@JwtIgnore
	@PostMapping("/register")	//注册
	public Result register(@RequestBody User user){
		boolean flag = userService.register(user);
		Result res;
		if(flag){
			res = new Result(0,"注册成功！");
			res.getData().put("token",JwtUtil.createJwt(user.getUsername(), user.getPhoneNumber(), jwt));
		}else {
			res = new Result(1,"注册失败，手机号码或用户名已存在！");
		}
		return res;
	}

	@GetMapping("/testJwt")
	public Result testJwt(){
		Result res = new Result(0,"通过Jwt认证，可以进行登录后的一系列操作！");
		res.getData().put("user","我是模拟操作返回后的数据");
		return res;
	}

}