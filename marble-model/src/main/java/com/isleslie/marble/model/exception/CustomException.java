package com.isleslie.marble.model.exception;

import com.isleslie.marble.model.response.Result;

public class CustomException extends RuntimeException {

	private Result result;

	public CustomException(Result result){
		this.result = result;
	}
	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}
}
