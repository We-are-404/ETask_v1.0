package com.isleslie.marble.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt")    //将配置文件中的属性一一映射到当前bean
public class Jwt {
    private String privateSecret;
    private int expiresSecond;
    private int refreshSecond;

    public String getPrivateSecret() {
        return privateSecret;
    }

    public void setPrivateSecret(String privateSecret) {
        this.privateSecret = privateSecret;
    }

    public int getExpiresSecond() {
        return expiresSecond;
    }

    public void setExpiresSecond(int expiresSecond) {
        this.expiresSecond = expiresSecond;
    }

    public int getRefreshSecond() {
        return refreshSecond;
    }

    public void setRefreshSecond(int refreshSecond) {
        this.refreshSecond = refreshSecond;
    }
}
