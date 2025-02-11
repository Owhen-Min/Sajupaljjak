package com.saju.sajubackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableJpaAuditing
@EnableMongoAuditing
@SpringBootApplication
public class SajuBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SajuBackendApplication.class, args);
    }

}
