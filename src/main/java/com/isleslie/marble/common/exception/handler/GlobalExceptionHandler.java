package com.isleslie.marble.common.exception.handler;

import com.isleslie.marble.common.exception.CustomException;
import com.isleslie.marble.common.response.Result;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	//处理客户异常
	@ExceptionHandler(CustomException.class)
	public Result handleCustomException(CustomException e) {
		return e.getResult();
	}

	//处理请求方式异常
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public Result handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e){
		return new Result(1,"接口请求方式有误，请联系前端开发工程师！");
	}

	//处理其他异常
	@ExceptionHandler(Exception.class)
	public Result handleException(Exception e){
		return new Result(1,"服务器内部错误，请联系后端开发工程师！");
	}
}
