package com.isleslie.marble;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.isleslie.marble.mapper")
public class MarbleApplication {

    public static void main(String[] args) {
        SpringApplication.run(MarbleApplication.class, args);
    }

}
