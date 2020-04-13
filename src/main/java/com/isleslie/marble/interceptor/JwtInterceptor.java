package com.isleslie.marble.interceptor;

import com.isleslie.marble.annotation.JwtIgnore;
import com.isleslie.marble.common.exception.CustomException;
import com.isleslie.marble.common.response.Result;
import com.isleslie.marble.model.Jwt;
import com.isleslie.marble.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.http.HttpMethod;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtInterceptor extends HandlerInterceptorAdapter {

	private Jwt jwt;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//----------认证开始---------
		//不是调用控制器方法直接跳过
		if (!(handler instanceof HandlerMethod)) {
			return true;
		}

		// 忽视有注解的方法，不需要进行Jwt认证
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		JwtIgnore jwtIgnore = handlerMethod.getMethodAnnotation(JwtIgnore.class);
		if (jwtIgnore != null) {
			return true;		//有注解 = 放行
		}

		//判断是否登录--未登录抛出异常
		String authorization = request.getHeader("Authorization");
		if(authorization == null || !authorization.split(" ")[0].equals("Bearer")){
			response.setStatus(401);
			throw new CustomException(new Result(1,"请登录后操作！"));
		}

		//注入jwt
		if(jwt == null){
			BeanFactory factory = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
			jwt = (Jwt) factory.getBean("jwt");
		}

		//判断token是否有效--无效抛出异常
		String token = authorization.split(" ")[1];
		Claims body;
		try{
			body = JwtUtil.parseJwt(token, this.jwt.getPrivateSecret());
		}catch (ExpiredJwtException eje){		//过期异常
			response.setStatus(401);
			throw new CustomException(new Result(1,"token过期，登录已超时，请重新登录！"));
		}catch (Exception e){					//其他异常通通归为解析异常，即该jwt不可靠，被串改
			response.setStatus(401);
			throw new CustomException(new Result(1,"token无效，请登录后操作！"));
		}
		//----------认证结束---------

		//----------续期开始---------
		//判断过期时间与现在时间的差额，如果在允许范围内，则重新签发jwt，达到给Jwt续期的效果。
		long expireMillis = body.getExpiration().getTime();
		long currentMillis = System.currentTimeMillis();
		long differentMillis = expireMillis - currentMillis;
		if(differentMillis < this.jwt.getRefreshSecond() * 1000 && differentMillis >= 0){
			String refreshJwt = JwtUtil.refreshJwt(body, this.jwt);
			request.setAttribute("refreshJwt",refreshJwt);
		}
		//----------续期结束---------

		//把body往后传并放行
		request.setAttribute("body",body);
		return true;
	}
}
