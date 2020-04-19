package com.isleslie.marble.annotation;

import java.lang.annotation.*;

@Target({ElementType.METHOD})		// 注解作用位置：方法上
@Retention(RetentionPolicy.RUNTIME)	// 注解生命周期：表示注解可以一直保留到运行时，因此可以通过反射获取注解信息
@Documented							// 注解表明这个注解应该被 javadoc工具记录. 默认情况下,javadoc是不包括注解的.
									// 但如果声明注解时指定了 @Documented,则它会被 javadoc 之类的工具处理,
									// 所以注解类型信息也会被包括在生成的文档中，是一个标记注解，没有成员。
public @interface JwtIgnore {
}
