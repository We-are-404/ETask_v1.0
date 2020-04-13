package com.isleslie.marble.config;

import com.isleslie.marble.interceptor.JwtInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		//加入Jwt拦截器，并且指定拦截路径
		registry.addInterceptor(new JwtInterceptor()).addPathPatterns("/**");
	}

}
