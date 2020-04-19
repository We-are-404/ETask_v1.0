package com.isleslie.marble.util;

import com.isleslie.marble.model.response.Result;
import com.isleslie.marble.model.properties.JwtProperties;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	@Autowired
	private JwtProperties jwtProperties;		//依赖注入不支持给static的变量注入
	private static JwtProperties staticJwtProperties;

	/**
	 * 通过@PostConstruct注解，在构造函数被调用后给静态变量赋值
	 * 	Bean初始化中的执行顺序：Constructor(构造方法) -> @Autowired(依赖注入) -> @PostConstruct(注释的方法)
	 */
	@PostConstruct
	public void init(){
		staticJwtProperties = this.jwtProperties;
	}

	/**
	 * 通过username和role和私钥生成jwt
	 * @return
	 */
	public static String createJwt(String username, String phoneNumber){
		//定义签名算法
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

		//通过[私钥]和[签名算法]生成签名[密钥]，[密钥]拿来加密jwt第三部分
		byte[] keyBytes = DatatypeConverter.parseBase64Binary(staticJwtProperties.getPrivateSecret()); 	 //私钥转成字节数组
		Key key = new SecretKeySpec(keyBytes,signatureAlgorithm.getJcaName());

		//生成过期时间
		long currentMillis = System.currentTimeMillis();
		long expiresMillis = currentMillis + staticJwtProperties.getExpiresSecond() * 1000;

		//构造jwt
		JwtBuilder builder = Jwts.builder().setHeaderParam("typ","JWT")			//part1 header 头部
				.claim("phone_number", phoneNumber)	//手机号码						//part2 payload 负载
				.setSubject(username)					//签发对象
				.setIssuedAt(new Date(currentMillis))	//签发时间	签发jwt的时候精度变成了秒 在拦截器的时候
				.setExpiration(new Date(expiresMillis))	//过期时间  getTime会存在毫秒级别的误差 暂时忽略
				.signWith(signatureAlgorithm,key); 		//签证信息						//part3 signature 签证信息

		//返回jwt
		return builder.compact();
	}

	/**
	 * 解析jwt
	 * @param jsonWebToken
	 * @param privateSecret
	 * @return
	 */
	public static Claims parseJwt(String jsonWebToken, String privateSecret){
		return Jwts.parser()
				.setSigningKey(DatatypeConverter.parseBase64Binary(privateSecret))
				.parseClaimsJws(jsonWebToken).getBody();
	}

	/**
	 * 给jwt续期
	 * @param claims
	 * @return
	 */
	public static String refreshJwt(Claims claims){
		return createJwt(claims.getSubject(), (String) claims.get("phone_number"));
	}

	public static Result returnRefreshJwt(HttpServletRequest request, HttpServletResponse response,Result res){
		String refreshToken = (String) request.getAttribute("refreshJwt");
		if(refreshToken != null){
			response.setStatus(201);		//201代表：已创建。成功请求并创建了新的资源。在本程序中代表jwt需要更新
			res.getData().put("token",refreshToken);
		}
		return res;
	}
}
