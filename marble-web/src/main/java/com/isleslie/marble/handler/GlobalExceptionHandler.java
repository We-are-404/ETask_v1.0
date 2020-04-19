package com.isleslie.marble.handler;

import com.isleslie.marble.model.exception.CustomException;
import com.isleslie.marble.model.response.Result;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	//处理客户异常
	@ExceptionHandler(CustomException.class)
	public Result handleCustomException(CustomException e) {
		e.printStackTrace();
		return e.getResult();
	}

	//处理请求方式异常
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public Result handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e){
		e.printStackTrace();
		return new Result(1,"接口请求方式有误，请联系前端开发工程师！");
	}

	//处理其他异常
	@ExceptionHandler(Exception.class)
	public Result handleException(Exception e){
		System.out.println(e.getMessage());
		e.printStackTrace();
		return new Result(1,"服务器内部错误，请联系后端开发工程师！");
	}
}
