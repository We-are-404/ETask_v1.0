package com.isleslie.marble.common.response;

import com.alibaba.fastjson.JSONObject;

public class Result {
    private int code;
    private String message;
    private JSONObject data;

    public Result() {
        data = new JSONObject();
    }

    public Result(int code, String message) {
        this.code = code;
        this.message = message;
        data = new JSONObject();
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public JSONObject getData() {
        return data;
    }

    public void setData(JSONObject data) {
        this.data = data;
    }
}
